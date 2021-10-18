import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableComponent} from './table/table.component';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import {FormsModule} from '@angular/forms';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
    declarations: [
        TableComponent
    ],
    imports: [
        CommonModule,
        NzTableModule,
        NzCheckboxModule,
        NzPaginationModule,
        FormsModule,
        NzDropDownModule,
        BrowserAnimationsModule
    ],
    exports: [
        TableComponent
    ]
})
export class TableCfgModule {
}
