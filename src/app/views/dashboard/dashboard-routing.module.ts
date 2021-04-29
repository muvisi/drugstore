import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { BillPatientComponent } from './../patient-checkin/bill-patient/bill-patient.component';
import { DiagnosisComponent } from '../patient-checkin/diagnosis/diagnosis.component';
import { PatientListComponent } from '../patient-checkin/patient-list/patient-list.component';
import { NewPatientComponent } from '../patient-checkin/new-patient/new-patient.component';
import { InsureCheckComponent } from '../patient-checkin/insure-check/insure-check.component';
import { ClaimsComponent } from '../patient-checkin/claims/claims.component';
import { ClaimDetailComponent } from '../patient-checkin/claim-detail/claim-detail.component';
import {PatientDashboardComponent } from '../patient-checkin/patient-dashboard/patient-dashboard.component';
import { RegisterPatientComponent } from '../patient-checkin/register-patient/register-patient.component';
import { TriageComponent } from '../patient-checkin/triage/triage.component';
import { TriageDetailsComponent } from '../patient-checkin/triage-details/triage-details.component';
import { TreatmentComponent } from '../patient-checkin/treatment/treatment.component';
import { SetUpComponent } from '../patient-checkin/set-up/set-up.component';
import { PaymentsComponent } from '../patient-checkin/payments/payments.component';
import { PaymentListComponent } from '../patient-checkin/payment-list/payment-list.component';
import { EclaimsDashboardComponent } from '../patient-checkin/eclaims-dashboard/eclaims-dashboard.component';
import { BatchingComponent } from '../patient-checkin/batching/batching.component';
import { BatchesComponent } from '../patient-checkin/batches/batches.component';
import { BatchDetailComponent } from '../patient-checkin/batch-detail/batch-detail.component';
import { StockLevelComponent } from '../patient-checkin/stock-level/stock-level.component';
import { HospitalComponent } from '../patient-checkin/hospital/hospital.component';
import { LabComponent } from '../patient-checkin/lab/lab.component';
import { PharmacyComponent } from '../patient-checkin/pharmacy/pharmacy.component';
import { LabResultsComponent} from '../patient-checkin/lab-results/lab-results.component';
import { CreateClaimComponent } from '../patient-checkin/create-claim/create-claim.component';
import { MemberInformationComponent } from '../patient-checkin/member-information/member-information.component';
import { AuthGuard } from '../../auth.guard';
import { LabOrdersComponent } from '../patient-checkin/lab-orders/lab-orders.component';
import { LabOrdersItemsComponent } from '../patient-checkin/lab-orders-items/lab-orders-items.component';
import { LabTestsComponent } from '../patient-checkin/lab-tests/lab-tests.component';
import { AuthorizationLetterComponent } from '../patient-checkin/authorization-letter/authorization-letter.component';
import { AuthletterRequestComponent} from '../patient-checkin/authletter-request/authletter-request.component';
import { PatientPrescriptionComponent } from '../patient-checkin/patient-prescription/patient-prescription.component';
import { CalendarComponent } from '../patient-checkin/calendar/calendar.component';
import { ReportsComponent } from '../patient-checkin/reports/reports.component';
import { PatientEditComponent } from '../patient-checkin/patient-edit/patient-edit.component';
import { RecordsComponent } from '../patient-checkin/records/records.component';
import { RecordListComponent } from '../patient-checkin/record-list/record-list.component';
import { AppointmentComponent } from '../patient-checkin/appointment/appointment.component';
import { RoomsComponent } from '../patient-checkin/rooms/rooms.component';
import { CreateRoomComponent } from '../patient-checkin/create-room/create-room.component';
import { ReappointmentComponent } from '../patient-checkin/reappointment/reappointment.component';
import { AppointmentListComponent } from '../patient-checkin/appointment-list/appointment-list.component';
import { AppointmentDetailsComponent } from '../patient-checkin/appointment-details/appointment-details.component';
import { UserAccountComponent } from '../patient-checkin/user-account/user-account.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Dashboard'
    }
  },

  {
    path: 'patients',
    component: PatientDashboardComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'parients-dashboard'
    }
  },
  // {
  //   path: 'records',
  //   component: RecordsComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     title: 'parients-dashboard'
  //   }
  // },
  {
    path: 'appointments',
    component: AppointmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'appointment-list',
    component: AppointmentListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'appointment-details/:id',
    component: AppointmentDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reappointments/:id',
    component: ReappointmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-account/:id',
    component:UserAccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'records',
    component: RecordListComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'parients-dashboard'
    }
  },
  {
    path: 'pharmacy',
    component: PharmacyComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'parients-dashboard'
    }
  },
  {
    path: 'authletter',
    component: AuthorizationLetterComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'authletter'
    }
  },
  {
    path: 'authletter-requests',
    component: AuthletterRequestComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'authletter'
    }
  },
  {
    path: 'lab',
    component: LabComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'labs'
    }
  },
  {
    path: 'lab-tests',
    component: LabTestsComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'tests component'
    }
  },
  {
    path: 'rooms/list',
    component: RoomsComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'tests component'
    }
  },
  {
    path: 'rooms/create',
    component: CreateRoomComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'tests component'
    }
  },
  {
    path: 'lab-orders',
    component: LabOrdersComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'labs'
    }
  },
  {
    path: 'patients/edit',
    component:PatientEditComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'labs'
    }
  },
  {
    path: 'sample-orders',
    component: LabOrdersItemsComponent,
  },
  {
    path: 'eclaims-dashboard',
    component: EclaimsDashboardComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'eclaims-dashboard'
    }
  },
  {
    path: 'patients/diagnosis&treatment',
    component: TreatmentComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'register'
    }
  },
  {
    path: 'patients/add-triage',
    component: TriageComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'register'
    }
  },
  {
    path: 'claims',
    component: ClaimsComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'claims'
    }
  },
  {
    path: 'stock-level',
    component: StockLevelComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'stock-level'
    }
  },
  {
    path: 'eclaims-dashboard/claims',
    component: ClaimsComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'claims'
    }
  },
  {
    path: 'eclaims-dashboard/create-claim',
    component: CreateClaimComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'claims'
    }
  },
  {
    path: 'eclaims-dashboard/batching',
    component: BatchingComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'claims'
    }
  },
  {
    path: 'eclaims-dashboard/batch-list',
    component: BatchesComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'claims'
    }
  },
  {
    path: 'eclaims-dashboard/batch-details',
    component: BatchDetailComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'claims'
    }
  },
  {
    path: 'invoice',
    component: PaymentListComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'patient list'
    }

  },
  {
    path: 'payments',
    component: PaymentsComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'payment'
    }

  },
  {
    path: 'set-up',
    component: SetUpComponent ,
    canActivate: [AuthGuard],
    data: {
      title: 'claims'
    }
  },
  {
    path: 'set-up/hospital',
    component: HospitalComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'claims'
    }
  },
  {
    path: 'claims/claim-detail',
    component: ClaimDetailComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'claims'
    }
  },
  {
    path: 'new-client',
    component: AppointmentComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'new-patient'
    }
  },
  {
    path: 'patients/triage',
    component: TriageDetailsComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'triage'
    }
  },
  {
    path: 'patients/treatment',
    component: DiagnosisComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'calender'
    }
  },
  {
    path: 'patients/insure-check',
    component: InsureCheckComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'All Members'
    }
  },
  {
    path: 'member-details',
    component: MemberInformationComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'All Members'
    }
  },
  {
  path: 'billing',
  component : PatientListComponent,
  canActivate: [AuthGuard],
  data: {
    title: 'patient-list'
  }
  },
{
    path: 'patients/bill-patient',
  canActivate: [AuthGuard],
    component: BillPatientComponent,
    data: {
      title: 'bill-patient'
    }
  }
  ,
{
path : 'pharmacy/patient-prescription',
component : PatientPrescriptionComponent,
data: {
title: 'News'
}
},
{
path : 'calendar',
component : CalendarComponent,
data: {
  title: 'Tags'
}
},
{
  path : 'reports',
  component : ReportsComponent,
  data: {
    title: 'Tags'
  }
  }    
      
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
