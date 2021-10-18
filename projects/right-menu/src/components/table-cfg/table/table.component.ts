import {
    Component,
    ElementRef,
    Input,
    OnInit,
    Output,
    Renderer2,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    EventEmitter,
    OnDestroy,
    OnChanges,
    AfterViewInit,
    ChangeDetectorRef
} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {NzTableLayout, NzTableSize} from 'ng-zorro-antd/table';
import {ITable} from './table.conponent.interface';
import {TreeData} from './table.component.tool';
import {NzTablePaginationType} from 'ng-zorro-antd/table/src/table.types';
import {PaginationItemRenderContext} from 'ng-zorro-antd/pagination';



@Component({
    selector: 'zc-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.less'],
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    @Input() useNzWidth: boolean = true;

    @Input() nzTableLayout: NzTableLayout = 'auto';
    @Input() nzWidthConfig: string[] = []; // 表头分组时使用
    @Input() nzLoading = false;
    @Input() nzSize: NzTableSize = 'middle';
    @Input() nzSizePagination: NzTableSize = 'middle';
    @Input() nzFrontPagination = false;
    @Input() nzPageSizeOptions: number[] = [10, 20, 30, 40];
    @Input() nzPaginationType: NzTablePaginationType = 'default';
    @Input() nzShowSizeChanger = true;
    @Input() nzShowPagination = true;
    @Input() nzItemRender: TemplateRef<PaginationItemRenderContext> | null;
    @Input() nzBordered = false;
    @Input() nzOuterBordered = false;


    @Input() tdContents: {[p: string]: TemplateRef<any>} = {};
    @Input() thContents: {[p: string]: TemplateRef<any>} = {};
    @Input() isTreeData = false;
    @Input() openRowCheck = false;
    @Input() currId: any;

    @Input() collProp: string = '';
    @Input() indentSize: number = 10;
    @Input() checkBox = false;
    @Input() emptyRow = false;
    @Input() setOfCheckedItem = new Map();

    @Input() checkBoxWidth = '60px';
    @Input() dataTotal: number = 0;
    @Input() showBottomDis: boolean = true;

    @Input()
    set propCfg(val: {childrenProp?: string; dataId?: string}){
        this.reWriteProp = Object.assign({childrenProp: 'children', dataId: 'Guid'}, val || {});
    }
    @Input() pageSize: number = 10;
    @Input() pageStart: number = 1;
    @Input() mergeFunc: (row: number, col: number) => { colspan: number; rowspan: number } = null;

    @Output() pageSizeChange = new EventEmitter<number>();
    @Output() pageStartChange = new EventEmitter<number>();
    @Output() pageChang = new EventEmitter<[number, number]>();
    @Output() currIdChange = new EventEmitter<any>();
    @Output() changeData = new EventEmitter<any>();
    @Output() rowClickEvent = new EventEmitter<any>();
    @Output() setOfCheckedItemChange = new EventEmitter<Map<any, any>>();

    @Input() disabledCheck: string[];

    checked = false;
    indeterminate = false;
    mapOfExpandedData: { [key: string]: any } = {};
    reWriteProp: {childrenProp?: string; dataId?: string} = {childrenProp: 'children', dataId: 'Guid'};
    inpTCfg: ITable[] = [];  // prop 属性层
    manyCfg: ITable[][] = [];

    //数据
    listOfData = [];
    bftData = [];

    widthCfg: string[] = [];

    upDateConfig$ = new Subject();

    tHeadSubject$ = new Subject();
    tDataSubject$ = new Subject();
    destroy$ = new Subject();

    constructor(
        private ele: ElementRef,
        private render: Renderer2,
        private changeDetectorRef: ChangeDetectorRef
    ) {
        this.tHeadSubject$.pipe(takeUntil(this.destroy$), debounceTime(500)).subscribe(() => {
            this.dealTCfg();

        })

        this.tDataSubject$.pipe(takeUntil(this.destroy$), debounceTime(500))
            .subscribe(() => {
                this.setTableData(this.tableData);
            })

        this.upDateConfig$.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.dealTCfg();
        });
    }

    refreshWidthCfg(){
        if(!this.useNzWidth) return
        this.widthCfg = [];
        if(this.checkBox){
            this.widthCfg.push(this.checkBoxWidth);
        }
        this.inpTCfg?.forEach(i => {
            i.show && this.widthCfg.push(i.nzWidth || '');
        })
    }

    ngOnInit(): void {
        this.tHeadSubject$.next();
        this.tDataSubject$.next();
    }

    ngAfterViewInit() {

    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    ngOnChanges(changes: SimpleChanges) {
        let { tableCfg, tableData} = changes;
        if(tableCfg && !tableCfg?.firstChange){
            this.tHeadSubject$.next();
        }
        if(tableData && !tableData?.firstChange){
            this.tDataSubject$.next();
        }
    }

    @Input() tableData: any[];

    @Input() tableCfg: ITable[];

    dealTCfg(){
        let [m, i, deep] = TreeData.setColSpan(this.tableCfg);
        TreeData.setRowSpan(this.tableCfg, deep);
        this.manyCfg = m;
        this.inpTCfg = i;
        TreeData.judgeTheadRight(this.tableCfg);
        this.refreshWidthCfg();
        this.setCollProp();
    }

    setCollProp(){
        this.collProp = this.tableCfg && !this.collProp && this.isTreeData && this.tableCfg.find(i => !!i.prop)?.prop;
    }

    setTableData(data: any[]) {
        if (!Array.isArray(data)) {
            return;
        }
        this.bftData = data;
        if (this.isTreeData) {
            this.mapOfExpandedData = TreeData.toTreeMap(this.bftData, this.reWriteProp.dataId, this.reWriteProp.childrenProp);
        }
        this.listOfData = TreeData.getChildren(this.bftData, this.reWriteProp.childrenProp);
        this.setOfCheckedItem.clear();
        this.refreshCheckedStatus();
    }

    // tree
    collapseChange(array: any[], data: any, $event: boolean): void {
        this.collapse(array, data, $event);
    }

    collapse(array: any[], data: any, $event: boolean): void {
        if (!$event && data[this.reWriteProp.childrenProp]?.length) {
            data[this.reWriteProp.childrenProp].forEach(d => {
                const target = array.find(a => a[this.reWriteProp.dataId] === d[this.reWriteProp.dataId])!;
                target.__expand__ = false;
                this.collapse(array, target, false);
            });
        }
        return;
    }

    rowClick(data: any, index?: number) {
        if (!this.openRowCheck) {
            return;
        }
        this.currId = this.getItemID(data);
        this.rowClickEvent.emit(data);
        this.currIdChange.emit(this.reWriteProp.dataId ? data[this.reWriteProp.dataId] : index);
    }

    // 获取id
    getItemID(item: any): any {
        let id;
        if(this.reWriteProp.dataId){
            id = item[this.reWriteProp.dataId]
        }
        return id || item.__y__;
    }

    // 选择

    updateCheckedSet(data: any, checked: boolean): void {
        let id = this.getItemID(data);
        if (checked) {
            this.setOfCheckedItem.set(id, data);
        } else {
            this.setOfCheckedItem.delete(id);
        }
    }

    onItemChecked(data: any, checked: boolean): void {
        this.updateCheckedSet(data, checked);
        this.refreshCheckedStatus();
        this.setOfCheckedItemChange.emit(this.setOfCheckedItem);
    }

    onAllChecked(value: boolean): void {
        this.listOfData.forEach(item => this.updateCheckedSet(item, value));
        this.refreshCheckedStatus();
        this.setOfCheckedItemChange.emit(this.setOfCheckedItem);
    }

    refreshCheckedStatus(): void {
        this.checked = !!this.listOfData.length && this.listOfData.every(item => this.setOfCheckedItem.has(this.getItemID(item)));
        this.indeterminate = this.listOfData.some(item => this.setOfCheckedItem.has(this.getItemID(item))) && !this.checked;
    }

    nzPageSizeChange($event: number) {
        this.pageSizeChange.emit($event);
        this.pageChang.emit([this.pageStart, $event]);
    }

    nzPageIndexChange($event: number) {
        this.pageStartChange.emit($event);
        this.pageChang.emit([$event, this.pageSize]);
    }

}
