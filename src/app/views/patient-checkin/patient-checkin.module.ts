import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PatientCheckinRoutingModule } from './patient-checkin-routing.module';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MatStepperModule, MatIconModule, MatTableModule, MatPaginatorModule,
MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatChipsModule,
MatCheckboxModule, MatRadioModule, MatTabsModule, MatCardModule, MatSortModule, MatDatepickerModule, MatNativeDateModule,MatExpansionModule, MatButtonModule, MatSliderModule,
MatBadgeModule
} from '@angular/material';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { TreatmentComponent } from './treatment/treatment.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { PatientListComponent } from './patient-list/patient-list.component';
import { BillPatientComponent } from './bill-patient/bill-patient.component';
import { ClaimsComponent } from './claims/claims.component';
import { ClaimDetailComponent } from './claim-detail/claim-detail.component';
import { TriageDetailsComponent } from './triage-details/triage-details.component';
import { FusionChartsModule } from 'angular-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import * as Widgets from 'fusioncharts/fusioncharts.widgets';
import { SetUpComponent } from './set-up/set-up.component';
import { NgxPrintModule } from 'ngx-print';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxLoadingModule } from 'ngx-loading';
import { TriageComponent } from './triage/triage.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { HospitalComponent } from './hospital/hospital.component';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { CalendarComponent } from './calendar/calendar.component';
import { ReportsComponent } from './reports/reports.component';
import { PatientEditComponent } from './patient-edit/patient-edit.component';
import { RecordsComponent } from './records/records.component';
import { RecordListComponent } from './record-list/record-list.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService} from '@syncfusion/ej2-angular-schedule';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ReappointmentComponent } from './reappointment/reappointment.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { EmployeesComponent } from './employees/employees.component';
import { ClientsComponent } from './clients/clients.component';
import { BookingComponent } from './booking/booking.component';
import { BillingComponent } from './billing/billing.component';
import { VaccineComponent } from './vaccine/vaccine.component';
import { QueuelistComponent } from './queuelist/queuelist.component';
import { PexperienceComponent } from './pexperience/pexperience.component';
import { AllbookingComponent } from './allbooking/allbooking.component';
import { QueueComponent } from './queue/queue.component';
import { OnlinereportsComponent } from '../../onlinereports/onlinereports.component';
import { MaincovidComponent } from '../../maincovid/maincovid.component';

FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme, Widgets);
@NgModule({
  declarations: [
    RegisterPatientComponent,
    DiagnosisComponent,
    TreatmentComponent,
    PatientDashboardComponent,
    PatientListComponent,
    BillPatientComponent,
    ClaimsComponent,
    ClaimDetailComponent,
    TriageDetailsComponent,
    SetUpComponent,
    TriageComponent,
    HospitalComponent,
    CalendarComponent,
    ReportsComponent,
    PatientEditComponent,
    RecordsComponent,
    RecordListComponent,
    AppointmentComponent,
    ReappointmentComponent,
    AppointmentListComponent,
    AppointmentDetailsComponent,
    UserAccountComponent,
    EmployeesComponent,
    ClientsComponent,
    BookingComponent,
    BillingComponent,
    VaccineComponent ,
    QueueComponent,
    QueuelistComponent,
    PexperienceComponent,
    AllbookingComponent,
    OnlinereportsComponent,
    MaincovidComponent

  ],
  imports: [
    CommonModule,
    PatientCheckinRoutingModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    TabsModule,
    MatStepperModule,
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
    DropDownListModule,
    FullCalendarModule,
    NgxMaterialTimepickerModule,
    TimePickerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [DayService, 
    WeekService, 
    WorkWeekService, 
    MonthService,
    AgendaService,
    MonthAgendaService]


})
export class PatientCheckinModule { }
