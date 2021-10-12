import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'zc-right-menu',
    template: `
    <p>
      right-menu works!
      <button nz-button nzType="primary">按钮qwer</button>
    </p>
  `,
    styles: []
})
export class RightMenuComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
