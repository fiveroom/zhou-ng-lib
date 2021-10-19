import {Directive, ElementRef} from '@angular/core';

@Directive({
    selector: '[appTest]',
    exportAs: 'appTest'
})
export class TestDirective {

    constructor(
        public element: ElementRef
    ) {
        console.log(' :>> ', this.element);
    }

}
