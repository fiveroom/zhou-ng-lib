import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RightMenuModule} from '../../projects/right-menu/src/lib/right-menu.module';
import {TableCfgModule} from '../../projects/right-menu/src/components/table-cfg/table-cfg.module';
import {DynamicFormModule} from '../../projects/right-menu/src/components/dymic-form/dynamic-form.module';
import {NzButtonModule} from 'ng-zorro-antd/button';
import { TestDirective } from './test.directive';
import { UseTestDirective } from './use-test.directive';
import {PortalModule} from '@angular/cdk/portal';
import {OverlayModule} from '@angular/cdk/overlay';
import { InputDirective } from './drictive/input.directive';
import { TestInputComponent } from './test-input/test-input.component';
import {FormsModule} from '@angular/forms';
import {NzInputModule} from 'ng-zorro-antd/input';
@NgModule({
  declarations: [
    AppComponent,
    TestDirective,
    UseTestDirective,
    InputDirective,
    TestInputComponent
  ],
    imports: [
        BrowserModule,
        RightMenuModule,
        TableCfgModule,
        DynamicFormModule,
        NzButtonModule,
        NzInputModule,
        OverlayModule,
        PortalModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
