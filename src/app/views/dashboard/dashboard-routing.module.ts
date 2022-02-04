import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { BillPatientComponent } from './../patient-checkin/bill-patient/bill-patient.component';
import { DiagnosisComponent } from '../patient-checkin/diagnosis/diagnosis.component';
import { PatientListComponent } from '../patient-checkin/patient-list/patient-list.component';
import { ClaimsComponent } from '../patient-checkin/claims/claims.component';
import { ClaimDetailComponent } from '../patient-checkin/claim-detail/claim-detail.component';
import {PatientDashboardComponent } from '../patient-checkin/patient-dashboard/patient-dashboard.component';
import { RegisterPatientComponent } from '../patient-checkin/register-patient/register-patient.component';
import { TriageComponent } from '../patient-checkin/triage/triage.component';
import { TriageDetailsComponent } from '../patient-checkin/triage-details/triage-details.component';
import { TreatmentComponent } from '../patient-checkin/treatment/treatment.component';
import { SetUpComponent } from '../patient-checkin/set-up/set-up.component';
import { HospitalComponent } from '../patient-checkin/hospital/hospital.component';
import { AuthGuard } from '../../auth.guard';
import { CalendarComponent } from '../patient-checkin/calendar/calendar.component';
import { ReportsComponent } from '../patient-checkin/reports/reports.component';
import { PatientEditComponent } from '../patient-checkin/patient-edit/patient-edit.component';
import { RecordsComponent } from '../patient-checkin/records/records.component';
import { RecordListComponent } from '../patient-checkin/record-list/record-list.component';
import { AppointmentComponent } from '../patient-checkin/appointment/appointment.component';
import { ReappointmentComponent } from '../patient-checkin/reappointment/reappointment.component';
import { AppointmentListComponent } from '../patient-checkin/appointment-list/appointment-list.component';
import { AppointmentDetailsComponent } from '../patient-checkin/appointment-details/appointment-details.component';
import { UserAccountComponent } from '../patient-checkin/user-account/user-account.component';
import { EmployeesComponent } from '../patient-checkin/employees/employees.component';
import { ClientsComponent } from '../patient-checkin/clients/clients.component';
import { BookingComponent } from '../patient-checkin/booking/booking.component';
import { BillingComponent } from '../patient-checkin/billing/billing.component';
import { VaccineComponent } from '../patient-checkin/vaccine/vaccine.component';
import { QueueComponent } from '../patient-checkin/queue/queue.component';
import { PexperienceComponent } from '../patient-checkin/pexperience/pexperience.component';
import { AllbookingComponent } from '../patient-checkin/allbooking/allbooking.component';
import { QueuelistComponent } from '../patient-checkin/queuelist/queuelist.component';
import { OnlinereportsComponent } from '../../onlinereports/onlinereports.component';
import { MaincovidComponent } from '../../maincovid/maincovid.component';
import { ToastrService } from 'ngx-toastr';
import { TimeslotComponent } from '../../timeslot/timeslot.component';
import { TestresultComponent } from '../../testresult/testresult.component';
import { ViewlistComponent } from '../../viewlist/viewlist.component';
import { CovidrevenuesComponent } from '../../covidrevenues/covidrevenues.component';
import { TestingDetailsComponent } from '../patient-checkin/testing-details/testing-details.component';
import { FeedbacksComponent } from '../../feedbacks/feedbacks.component';
import { SpecialtyComponent } from '../patient-checkin/specialty/specialty.component';
import { ClinicSetupComponent } from '../patient-checkin/clinic-setup/clinic-setup.component';
import { SpecificClinicsetupComponent } from '../patient-checkin/specific-clinicsetup/specific-clinicsetup.component';
import { InsuranceFormsComponent } from '../patient-checkin/insurance-forms/insurance-forms.component';
import { CooperativeClaimformComponent } from '../patient-checkin/cooperative-claimform/cooperative-claimform.component';
import { AarClaimformComponent } from '../patient-checkin/aar-claimform/aar-claimform.component';
import { FirstassuranceComponent } from '../patient-checkin/firstassurance/firstassurance.component';
import { SedgrickComponent } from '../patient-checkin/sedgrick/sedgrick.component';
import { ApaClaimformComponent } from '../patient-checkin/apa-claimform/apa-claimform.component';
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
    path: 'appointments',
    component: AppointmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'queueline',
    component: QueuelistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'timeslot',
    component: TimeslotComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'queuereports',
    component: OnlinereportsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'revenues',
    component: CovidrevenuesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'action',
    component: MaincovidComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'queue',
    component: QueueComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'results',
    component: TestresultComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'allbooking',
    component: AllbookingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'specialty',
    component: SpecialtyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pexperience',
    component: PexperienceComponent,
    canActivate: [AuthGuard]
  },
  
  {
    path: 'appointment-list',
    component: AppointmentListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'billing',
    component: BillingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'appointment-details/:id',
    component: AppointmentDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'testing-details/:id',
    component: TestingDetailsComponent,
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
    path: 'booking',
    component:BookingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'feedback',
    component:FeedbacksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'AAR/Claimform',
    component:AarClaimformComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'FirstAssurance',
    component:FirstassuranceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sedgrick',
    component:SedgrickComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'APA',
    component:ApaClaimformComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'test',
    component:ViewlistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'clinic-setup',
    component:ClinicSetupComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cooperative-claimform',
    component:CooperativeClaimformComponent,
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
    path: 'vaccine-setup',
    component:VaccineComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'parients-dashboard'
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
    path: 'clients',
    component: ClientsComponent,
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
    path: 'insurance-forms/:id',
    component:InsuranceFormsComponent,
    
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
    path: 'staff',
    component: EmployeesComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'patient list'
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
    path: 'claims/claim-detail/:id',
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
  path: 'billing',
  component : PatientListComponent,
  canActivate: [AuthGuard],
  data: {
    title: 'patient-list'
  }
  },
{
  path: 'bill-client/:id',
  canActivate: [AuthGuard],
  component: BillPatientComponent
  }
  ,

{
path : 'calendar/:speciality',
component : CalendarComponent,
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
