import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RightMenuModule} from '../../projects/right-menu/src/lib/right-menu.module';
import {TableCfgModule} from '../../projects/right-menu/src/components/table-cfg/table-cfg.module';
import {DynamicFormModule} from '../../projects/right-menu/src/components/dymic-form/dynamic-form.module';
import {NzButtonModule} from 'ng-zorro-antd/button';
import { TestDirective } from './test.directive';
import { UseTestDirective } from './use-test.directive';

@NgModule({
  declarations: [
    AppComponent,
    TestDirective,
    UseTestDirective
  ],
  imports: [
    BrowserModule,
      RightMenuModule,
      TableCfgModule,
      DynamicFormModule,
      NzButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
