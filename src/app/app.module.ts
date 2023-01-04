import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PoModule, PoDynamicModule, PoButtonModule, PoStepperModule, PoListViewModule, PoContainerModule, PoLoadingModule, PoWidgetModule } from '@po-ui/ng-components';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PoGaugeModule } from '@po-ui/ng-components';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PoModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    PoDynamicModule,
    PoButtonModule,
    HttpClientModule,
    PoStepperModule,
    PoListViewModule,
    PoContainerModule,
    PoLoadingModule ,
    PoWidgetModule ,
    PoGaugeModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
