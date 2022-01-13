import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as env from '../environments/environment';
import { LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { GestureConfig, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService} from '@syncfusion/ej2-angular-schedule';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';
// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

import { AppRoutingModule } from './app.routing';
import { HideableHeaderModule } from 'ngx-hideable-header';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { from } from 'rxjs';
import { TokenInterceptor } from './interceptor';
// import { FeedbacksComponent } from './feedbacks/feedbacks.component';





export function tokenGetter() {
  return sessionStorage.getItem('Token');
}


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    CarouselModule.forRoot(),
    FormsModule,
    HideableHeaderModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    ModalModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    NgxMaterialTimepickerModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.rectangleBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
      backdropBorderRadius: '4px',
      primaryColour: '#71FF33', 
      secondaryColour: '#71FF33', 
      tertiaryColour: '#71FF33'
  })
  ],
  declarations: [
    AppComponent,
    APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
  
   
   
    
    
   
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
  DatePipe,
  AuthGuard,
  NgxNavigationWithDataComponent,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },
  {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig},
  DayService, 
  WeekService, 
  WorkWeekService, 
  MonthService,
  AgendaService,
  MonthAgendaService
],
  bootstrap: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
})
export class AppModule { }
