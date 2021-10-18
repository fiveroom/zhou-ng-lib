import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuestionComponent} from './question/question.component';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        QuestionComponent
    ],
    imports: [
        CommonModule,
        NzInputModule,
        NzDatePickerModule,
        NzSelectModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        QuestionComponent
    ]
})
export class DynamicFormModule {
}
