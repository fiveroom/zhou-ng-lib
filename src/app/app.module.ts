import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RightMenuModule} from '../../projects/right-menu/src/lib/right-menu.module';
import {TableCfgModule} from '../../projects/right-menu/src/components/table-cfg/table-cfg.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
      RightMenuModule,
      TableCfgModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
