import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectorRef} from '@angular/core';
import {ChangeDetection} from '@angular/cli/lib/config/schema';

@Component({
    selector: 'app-test-input',
    templateUrl: './test-input.component.html',
    styleUrls: ['./test-input.component.less']
})
export class TestInputComponent implements OnInit, OnChanges {

    value = '';

    @Output() changeValue = new EventEmitter();

    @Input() v: string;

    constructor(
        public changeDetectorRef: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
    }


    changeValueEvent() {
        this.changeValue.emit(this.value)
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log('提娜佳加:>> ', changes);
    }
}
