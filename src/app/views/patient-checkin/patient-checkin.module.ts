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
MatBadgeModule,
MatHeaderRowDef,
MatRowDef
} from '@angular/material';
// import { FullCalendarModule } from '@fullcalendar/angular';
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
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
// import { CalendarComponent } from './calendar/calendar.component';
import { ReportsComponent } from './reports/reports.component';
import { PatientEditComponent } from './patient-edit/patient-edit.component';
import { RecordsComponent } from './records/records.component';
import { RecordListComponent } from './record-list/record-list.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService} from '@syncfusion/ej2-angular-schedule';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
// import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
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
import { TimeslotComponent } from '../../timeslot/timeslot.component';
import { TestresultComponent } from '../../testresult/testresult.component';
import { ViewlistComponent } from '../../viewlist/viewlist.component';
import { CovidrevenuesComponent } from '../../covidrevenues/covidrevenues.component';

import { TestingDetailsComponent } from './testing-details/testing-details.component';
import { FeedbacksComponent } from '../../feedbacks/feedbacks.component';
import { SpecialtyComponent } from './specialty/specialty.component';
import { ClinicSetupComponent } from './clinic-setup/clinic-setup.component';
import { SpecificClinicsetupComponent } from './specific-clinicsetup/specific-clinicsetup.component';
import { InsuranceFormsComponent } from './insurance-forms/insurance-forms.component';
import { CooperativeClaimformComponent } from './cooperative-claimform/cooperative-claimform.component';
import { AarClaimformComponent } from './aar-claimform/aar-claimform.component';
import { FirstassuranceComponent } from './firstassurance/firstassurance.component';
import { ApaClaimformComponent } from './apa-claimform/apa-claimform.component';
import { SedgrickComponent } from './sedgrick/sedgrick.component';
import { OldmutualClaimformComponent } from './oldmutual-claimform/oldmutual-claimform.component';
import { MTNClaimformComponent } from './mtn-claimform/mtn-claimform.component';
// import { PacisClaimformsComponent } from './pacis-claimforms/pacis-claimforms.component';
import { MinetClaimformsComponent } from './minet-claimforms/minet-claimforms.component';
// import { GAClaimformsComponent } from './ga-claimforms/ga-claimforms.component';
import { JubileeClaimformComponent } from './jubilee-claimform/jubilee-claimform.component';
import { CignaClaimformComponent } from './cigna-claimform/cigna-claimform.component';
import { HeritageClaimformComponent } from './heritage-claimform/heritage-claimform.component';
import { CicgroupClaimformComponent } from './cicgroup-claimform/cicgroup-claimform.component';
import { BupaclobalClaimformComponent } from './bupaclobal-claimform/bupaclobal-claimform.component';
import { RegistrationLinkComponent } from './registration-link/registration-link.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { PrintInsuranceFormsComponent } from './print-insurance-forms/print-insurance-forms.component';
import { PaymentsComponent } from '../payments/payments/payments.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { QrcodeDownloadComponent } from '../qrcodes/qrcode-download/qrcode-download.component';
import { QRCodeModule } from 'angularx-qrcode';
import { FeedbackInpatientQrcodesComponent } from '../qrcodes/feedback-inpatient-qrcodes/feedback-inpatient-qrcodes.component';
import { FeedbackOutpatientQrcodesComponent } from '../qrcodes/feedback-outpatient-qrcodes/feedback-outpatient-qrcodes.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MpesaPaymentsComponent } from '../payments/mpesa-payments/mpesa-payments.component';
import { MpesaPaymentReportComponent } from '../payments/mpesa-payment-report/mpesa-payment-report.component';
import { UtilizePaymentModal } from '../payments/mpesa-payments/utilize.payment.modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import {
  MatPaginator, MatSort, MatTable, MatTabHeader,
  MatHeaderRow, MatHeaderCell, MatHeaderCellDef,
  MatSortHeader, MatRow,   MatCell, MatCellDef
} from '@angular/material';
import { MaternityListComponent } from './maternity-list/maternity-list.component';
import { MaternityDetailsComponent } from './maternity-details/maternity-details.component';
import { WhatappComponent } from '../qrcodes/whatapp/whatapp.component';
import { MaternityQrcodeComponent } from '../maternity-qrcode/maternity-qrcode.component';
import { FootwalkComponent } from './footwalk/footwalk.component';
import { FeedbackResponseGraphComponent } from './feedback-response-graph/feedback-response-graph.component';
import { FeedbackAgeGraphComponent } from './feedback-age-graph/feedback-age-graph.component';
import { FeedbackSetupComponent } from './feedback-setup/feedback-setup.component';
import { FeedbackGraphsComponent } from '../feedback-graphs/feedback-graphs.component';
import { CallPatientsComponent } from '../call-patients/call-patients.component';
import { BirthdaymessengesComponent } from '../birthdaymessenges/birthdaymessenges.component';
import { ClinicsSetupComponent } from './clinics-setup/clinics-setup.component';





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
    MaincovidComponent,
    TimeslotComponent,
    TestresultComponent,
    ViewlistComponent,
    CovidrevenuesComponent,
    TestingDetailsComponent,
    FeedbacksComponent,
    SpecialtyComponent,
    ClinicSetupComponent,
    SpecificClinicsetupComponent,
    InsuranceFormsComponent,
    CooperativeClaimformComponent,
    AarClaimformComponent,
    FirstassuranceComponent,
    ApaClaimformComponent,
    SedgrickComponent,
    OldmutualClaimformComponent,
    MTNClaimformComponent,
    MaternityQrcodeComponent,
    FeedbackGraphsComponent,
    
    MinetClaimformsComponent,
    
    JubileeClaimformComponent,
    CignaClaimformComponent,
    HeritageClaimformComponent,
    CicgroupClaimformComponent,
    BupaclobalClaimformComponent,
    RegistrationLinkComponent,
    BookingDetailComponent,
    PrintInsuranceFormsComponent,
    PaymentsComponent,
    UsermanagementComponent,
    QrcodeDownloadComponent,
    FeedbackInpatientQrcodesComponent,
    WhatappComponent,
    FeedbackOutpatientQrcodesComponent,
    MpesaPaymentsComponent,
    MpesaPaymentReportComponent,   
    UtilizePaymentModal, MaternityListComponent,
     MaternityDetailsComponent, FootwalkComponent, 
     FeedbackResponseGraphComponent, FeedbackAgeGraphComponent,
      FeedbackSetupComponent, CallPatientsComponent,BirthdaymessengesComponent,
    MaternityDetailsComponent, FootwalkComponent, 
    FeedbackResponseGraphComponent, FeedbackAgeGraphComponent,
    FeedbackSetupComponent, ClinicsSetupComponent
   
      

    

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
    ButtonModule,
    DateTimePickerModule,
    MatBadgeModule,
    NgxMaterialTimepickerModule,
    TimePickerModule,
    QRCodeModule,
    CommonModule,
    NgbModule,  
     

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [DayService, 
    WeekService, 
    WorkWeekService, 
    MonthService,
    AgendaService,
    MonthAgendaService],
  entryComponents: [
      UtilizePaymentModal
    ]
  


})
export class PatientCheckinModule { 

}
