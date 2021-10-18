import {NzTableSortFn, NzTableSortOrder} from 'ng-zorro-antd/table';

export interface ITable {
    nzLeft?: boolean;
    nzRight?: boolean;
    cProp?: string;
    prop?: string;
    serialNum?: boolean;
    nzWidth?: string;
    edit?: boolean;
    isRight?: boolean;
    styleH?: {
        nzAlign?: 'left' | 'right' | 'center' | null;
    };
    styleB?: {
        nzAlign?: 'left' | 'right' | 'center' | null,
        nzEllipsis?: boolean,
    };
    colspan?: number;
    rowspan?: number;
    children?: ITable[];
    disabledCheck?: boolean;
    fromData?: (data: any) => any;
    nzSortFn?: NzTableSortFn | boolean;
    nzSortDirections?: NzTableSortOrder;
    nzSortOrder?: NzTableSortOrder;
    nzSortOrderChange?: (sortProp: { sortOrder: NzTableSortOrder; prop: string }) => any;
    nzSortPriority?: boolean;
    show?: boolean;
    disableShow?: boolean;
    showTitle?: boolean;
    openCheck?: boolean;
    [prop: string]: any;
}
