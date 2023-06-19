import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PatientCheckinRoutingModule } from './patient-checkin-routing.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MatStepperModule, MatIconModule, MatTableModule, MatPaginatorModule,
MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatChipsModule,
MatCheckboxModule, MatRadioModule, MatTabsModule, MatCardModule, MatSortModule, MatDatepickerModule, MatNativeDateModule,MatExpansionModule, MatButtonModule, MatSliderModule,
MatBadgeModule,
MatHeaderRowDef,
MatRowDef
} from '@angular/material';

import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

import { FusionChartsModule } from 'angular-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import * as Widgets from 'fusioncharts/fusioncharts.widgets';
import { NgxPrintModule } from 'ngx-print';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxLoadingModule } from 'ngx-loading';
import { CKEditorModule } from 'ckeditor4-angular';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService} from '@syncfusion/ej2-angular-schedule';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';





import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




// import { MaternityQrcodeComponent } from '../maternity-qrcode/maternity-qrcode.component';

// import { FeedbackGraphsComponent } from '../feedback-graphs/feedback-graphs.component';
// import { CallPatientsComponent } from '../call-patients/call-patients.component';
import { FilterPipe } from '../../filter.pipe';
// import { BookAppointmentComponent } from '../add/book-appointment/book-appointment.component';
// import { BookMaternityComponent } from '../add/book-maternity/book-maternity.component';
// import { BookVaccinationComponent } from '../add/book-vaccination/book-vaccination.component';
// import { BookCovidtestingComponent } from '../add/book-covidtesting/book-covidtesting.component';
// import { MaternityfeedbackComponent } from '../maternityfeedback/maternityfeedback.component';
import { DashboardReportComponent } from '../dashboard-report/dashboard-report.component';
import { AdminSetupsComponent } from '../admin-setups/admin-setups.component';

import { RatingModule } from 'ng-starrating';
// import { MaternityupgradeModalComponent } from '../maternityupgrade-modal/maternityupgrade-modal.component';
import { RoomSetupComponent } from '../room-setup/room-setup.component';
import { FreeroomsComponent } from '../freerooms/freerooms.component';
// import { AllbookingsComponent } from '../../allbookings/allbookings.component';
import { ReportsComponent } from '../reports/reports.component';
import { ClientBoookroomComponent } from '../client-boookroom/client-boookroom.component';
import { DrugsissueComponent } from '../drugsissue/drugsissue.component';
import { SetupdrugsComponent } from '../setupdrugs/setupdrugs.component';
import { StockavailableComponent } from '../stockavailable/stockavailable.component';
import { CompletedordersComponent } from '../completedorders/completedorders.component';
// import { SignUpComponent } from '../sign-up/sign-up.component';

FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme, Widgets);
@NgModule({
  declarations: [
    
   
    // MaternityQrcodeComponent,
    // FeedbackGraphsComponent,
    FilterPipe,
    // CallPatientsComponent,
    // MaternityfeedbackComponent,
    DashboardReportComponent,
    AdminSetupsComponent,
    AdminSetupsComponent,
    // BookAppointmentComponent,
    // BookMaternityComponent,
    // BookVaccinationComponent,
    // BookCovidtestingComponent,
    // MaternityupgradeModalComponent,
    RoomSetupComponent,
  FreeroomsComponent,ReportsComponent,ClientBoookroomComponent,DrugsissueComponent,SetupdrugsComponent
,StockavailableComponent,CompletedordersComponent

  ],
  imports: [
    CommonModule,
    PatientCheckinRoutingModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    TabsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    TimepickerModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    FusionChartsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
 
    MatOptionModule,
    MatChipsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatPaginatorModule,
    NgxPrintModule,
    MatTabsModule,
    MatCardModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CKEditorModule,
    MatExpansionModule,
    MatButtonModule,
    MatSliderModule,
    ScheduleModule,
    DateTimePickerModule,
    MatBadgeModule,
    NgxMaterialTimepickerModule,
    TimePickerModule,
    CommonModule,
    MatStepperModule,
    NgbModule,
    RatingModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [DayService, 
    WeekService, 
    WorkWeekService, 
    MonthService,
    AgendaService,
    MonthAgendaService],
  entryComponents: [
     
      // MaternityupgradeModalComponent
    ]
  


})
export class PatientCheckinModule { 

}
