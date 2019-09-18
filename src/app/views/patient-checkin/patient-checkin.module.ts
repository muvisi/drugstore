import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PatientCheckinRoutingModule } from './patient-checkin-routing.module';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MatStepperModule, MatIconModule, MatTableModule, MatPaginatorModule,
MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatChipsModule,
MatCheckboxModule, MatRadioModule, MatTabsModule, MatCardModule, MatSortModule, MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import { PatientRecordsComponent } from './patient-records/patient-records.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { InsureCheckComponent } from './insure-check/insure-check.component';
import { TreatmentComponent } from './treatment/treatment.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MemberInformationComponent } from './member-information/member-information.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { NewPatientComponent } from './new-patient/new-patient.component';
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
import { PaymentsComponent } from './payments/payments.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { EclaimsDashboardComponent } from './eclaims-dashboard/eclaims-dashboard.component';
import { BatchingComponent } from './batching/batching.component';
import { BatchesComponent } from './batches/batches.component';
import { BatchDetailComponent } from './batch-detail/batch-detail.component';
import { InventoryComponent } from './inventory/inventory.component';
import { StockLevelComponent } from './stock-level/stock-level.component';
import { LabComponent } from './lab/lab.component';
import { LabResultsComponent } from './lab-results/lab-results.component';
import { NgxLoadingModule } from 'ngx-loading';
import { TriageComponent } from './triage/triage.component';
import { CreateClaimComponent } from './create-claim/create-claim.component';
import { CKEditorModule } from 'ckeditor4-angular';
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme, Widgets);

@NgModule({
  declarations: [
    RegisterPatientComponent,
    PatientRecordsComponent,
    DiagnosisComponent,
    InsureCheckComponent,
    TreatmentComponent,
    MemberInformationComponent,
    PatientDashboardComponent,
    NewPatientComponent,
    PatientListComponent,
    BillPatientComponent,
    ClaimsComponent,
    ClaimDetailComponent,
    TriageDetailsComponent,
    SetUpComponent,
    PaymentsComponent,
    PaymentListComponent,
    EclaimsDashboardComponent,
    BatchingComponent,
    BatchesComponent,
    BatchDetailComponent,
    InventoryComponent,
    StockLevelComponent,
    LabComponent,
    LabResultsComponent,
    CreateClaimComponent,
    TriageComponent
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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

})
export class PatientCheckinModule { }
