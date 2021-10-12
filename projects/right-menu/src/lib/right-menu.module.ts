import {NgModule} from '@angular/core';
import {RightMenuComponent} from './right-menu.component';
import {NzButtonModule} from 'ng-zorro-antd/button';


@NgModule({
    declarations: [RightMenuComponent],
    imports: [
        NzButtonModule
    ],
    exports: [RightMenuComponent]
})
export class RightMenuModule {
}
