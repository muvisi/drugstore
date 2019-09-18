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
import { InventoryComponent } from '../patient-checkin/inventory/inventory.component';
import { StockLevelComponent } from '../patient-checkin/stock-level/stock-level.component';
import { LabComponent } from '../patient-checkin/lab/lab.component';
import { LabResultsComponent} from '../patient-checkin/lab-results/lab-results.component';
import { CreateClaimComponent } from '../patient-checkin/create-claim/create-claim.component';
import { MemberInformationComponent } from '../patient-checkin/member-information/member-information.component';
import { AuthGuard } from '../../auth.guard';


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
  {
    path: 'inventory',
    component: InventoryComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'parients-dashboard'
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
    path: 'eclaims-dashboard',
    component: EclaimsDashboardComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'eclaims-dashboard'
    }
  },
  {
    path: 'patients/register',
    component: RegisterPatientComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'register'
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
    path: 'patients/patient-list',
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
    path: 'claims/claim-detail',
    component: ClaimDetailComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'claims'
    }
  },
  {
    path: 'patients/new-patient',
    component: NewPatientComponent,
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
  path: 'patients/services',
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
  // ,
  // {
  //   path : 'register-member',
  //   component : AddmemberComponent ,
  //   data: {
  //     title: 'News'
  //   }
  //   },
  //   {
  //     path : 'Tags',
  //     component : TagsComponent ,
  //     data: {
  //       title: 'Tags'
  //     }
  //     }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
