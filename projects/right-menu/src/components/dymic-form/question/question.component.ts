import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'zc-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.less']
})
export class QuestionComponent implements OnInit {
    val: FormControl = new FormControl('hello', [Validators.required]);

    constructor() {
    }

    ngOnInit(): void {
    }

    changeValue() {
        console.log(' :>> ', this.val);
    }
}
