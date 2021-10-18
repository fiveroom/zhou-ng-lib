import {Component, ComponentFactoryResolver, EmbeddedViewRef, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {ITable} from '../../projects/right-menu/src/components/table-cfg/table/table.conponent.interface';
import {QuestionComponent} from '../../projects/right-menu/src/components/dymic-form/question/question.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'zhou-ng-lib';
    listOfData = Array.from({length: 10}).map(() => ({
        AcceptTaskName: '是打发士大夫阿斯蒂芬撒旦法士大夫阿斯蒂芬阿斯蒂芬阿萨德发的发的发的富士达发的发的否',
        dddd: '是打发士大夫阿斯蒂芬夫阿斯蒂芬阿斯蒂芬阿萨德发的发的发的富士达发的发的否',
        ddde: '是打发士大夫阿斯蒂芬夫阿斯蒂芬阿斯蒂芬阿萨德发的发的发的富士达发的发的否',
        dddf: '是打发士大夫阿斯蒂芬夫阿斯蒂芬阿斯蒂芬阿萨德发的发的发的富士达发的发的否',
        dddg: '是打发士大夫阿斯蒂芬夫阿斯蒂芬阿斯蒂芬阿萨德发的发的发的富士达发的发的否',
    }));
    tableCfg: ITable[] = [
        {
            cProp: '序号',
            nzWidth: '70px',
            serialNum: true,
            rowspan: 3
        }, {
            cProp: '任务名称',
            prop: 'AcceptTaskName',
            styleB: {
                nzAlign: 'left'
            },
            show: true,
            disableShow: true,
            rowspan: 3,
            colspan: 0
        }, {
            cProp: '项目类别',
            prop: '',
            // rowspan: 3,
            colspan: 3,
            children: [
                {
                    prop: '',
                    cProp: '尺寸',
                    colspan: 2,
                    // rowspan: 2,
                    children: [
                        {
                            prop: 'dddd',
                            cProp: '尺寸尺寸1',
                        }, {
                            prop: 'ddde',
                            cProp: '尺寸尺寸2',
                        }
                    ]
                }, {
                    // colspan: 2,
                    prop: '',
                    cProp: '尺寸',
                    rowspan: 2,
                    show: false
                }
            ]
        },
        {
            cProp: '任务类型',
            prop: '',
            rowspan: 3,
            show: false
        }, {
            cProp: '分配人',
            prop: 'TaskAssigner',
            styleB: {
                nzAlign: 'left'
            },
            rowspan: 3,
            show: true
        },
        // {
        //     cProp: '分配时间',
        //     prop: 'AcceptTaskTime',
        //     nzWidth: '160px',
        //     rowspan: 3,
        //     show: true,
        //     children: [
        //         {
        //             cProp: '分配时间1',
        //             children: [
        //                 {
        //                     cProp: '分配时间11'
        //                 },
        //                 {
        //                     cProp: '分配时间22'
        //                 }
        //             ]
        //         },
        //         {
        //             cProp: '分配时间2',
        //             children: [
        //                 {
        //                     cProp: '分配时间3',
        //                     show: false
        //                 },   {
        //                     cProp: '分配时间3'
        //                 }, {
        //                     cProp: '分配时间3',
        //                     children: [
        //                         {
        //                             cProp: '分配时间31'
        //                         },
        //                         {
        //                             cProp: '分配时间32'
        //                         }
        //                     ]
        //                 },
        //             ]
        //         },
        //     ]
        // },
        {
            cProp: '描述',
            prop: 'dddd',
            styleB: {
                nzAlign: 'left'
            },
            rowspan: 3,
            show: true,
            children: [
                {
                    prop: 'dddf',
                    cProp: '描述1'
                },
                {
                    prop: 'dddg',
                    cProp: '描述2'
                }
            ]
        }, {
            cProp: '备注',
            prop: 'Memo',
            isRight: true,
            styleB: {
                nzAlign: 'left'
            },
            rowspan: 3,
            show: false
        }
    ];

    @ViewChild('container') container: ViewContainerRef;
    @ViewChild('dataF') dataF: TemplateRef<any>;

    // read: ViewContainerRef 告诉是一个容器
    @ViewChild('testContainer', {read: ViewContainerRef}) testContainer: ViewContainerRef;

    constructor(
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {
    }

    // 组件型视图
    setInput(){
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(QuestionComponent);
        this.testContainer.createComponent(componentFactory)
    }

    // 模板视图
    setTemplate() {
        // let embeddedViewRef = this.testContainer.createEmbeddedView(this.dataF, {$implicit: '123'});
        let dataF = this.dataF.createEmbeddedView({$implicit: '123'})
        console.log(' :>> ', dataF);
        this.testContainer.insert(dataF)
    }
}
