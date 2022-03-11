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
import { OldmutualClaimformComponent } from '../patient-checkin/oldmutual-claimform/oldmutual-claimform.component';
import { MTNClaimformComponent } from '../patient-checkin/mtn-claimform/mtn-claimform.component';
// import { PacisClaimformsComponent } from '../patient-checkin/pacis-claimforms/pacis-claimforms.component';
import { MinetClaimformsComponent } from '../patient-checkin/minet-claimforms/minet-claimforms.component';
// import { GAClaimformsComponent } from '../patient-checkin/ga-claimforms/ga-claimforms.component';
import { JubileeClaimformComponent } from '../patient-checkin/jubilee-claimform/jubilee-claimform.component';
import { CignaClaimformComponent } from '../patient-checkin/cigna-claimform/cigna-claimform.component';
import { HeritageClaimformComponent } from '../patient-checkin/heritage-claimform/heritage-claimform.component';
import { CicgroupClaimformComponent } from '../patient-checkin/cicgroup-claimform/cicgroup-claimform.component';
import { BupaclobalClaimformComponent } from '../patient-checkin/bupaclobal-claimform/bupaclobal-claimform.component';
import { RegistrationLinkComponent } from '../patient-checkin/registration-link/registration-link.component';
import { BookingDetailComponent } from '../patient-checkin/booking-detail/booking-detail.component';
import { PrintInsuranceFormsComponent } from '../patient-checkin/print-insurance-forms/print-insurance-forms.component';
import { PaymentsComponent } from '../patient-checkin/payments/payments.component';
import { UsermanagementComponent } from '../patient-checkin/usermanagement/usermanagement.component';
// import { QrcodeDownloadComponent } from '../qrcode-download/qrcode-download.component';
import { QrcodeDownloadComponent } from '../qrcodes/qrcode-download/qrcode-download.component';
import { FeedbackOutpatientQrcodesComponent } from '../qrcodes/feedback-outpatient-qrcodes/feedback-outpatient-qrcodes.component';
import { FeedbackInpatientQrcodesComponent } from '../qrcodes/feedback-inpatient-qrcodes/feedback-inpatient-qrcodes.component';
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
    path: 'register-qrcode-download',
    component: QrcodeDownloadComponent,
  },
  {
    path: 'feedback-outpatient-qrcode-download',
    component: FeedbackOutpatientQrcodesComponent,
  },
  {
    path: 'feedback-inpatient-qrcode-download',
    component: FeedbackInpatientQrcodesComponent,
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
    path: 'booking-details/:id',
    component: BookingDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'specialty',
    component: SpecialtyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Users',
    component: UsermanagementComponent,
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
    path: 'feedbacks',
    component:FeedbacksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'AAR/Claimform/:id',
    component:AarClaimformComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cignainsurance/:id',
    component:CignaClaimformComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'uapoldmutual/:id',
    component:OldmutualClaimformComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'jubileeinsurance/:id',
    component:JubileeClaimformComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mtninsurance/:id',
    component:MTNClaimformComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'minetinsurance/:id',
    component:MinetClaimformsComponent,
    canActivate: [AuthGuard]
  },
  //  
  {
    path: 'FirstAssurance/:id',
    component:FirstassuranceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'heritageinsurance/:id',
    component:  HeritageClaimformComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bupaglobal/:id',
    component:BupaclobalClaimformComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sedgrick/:id',
    component:SedgrickComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cicinsurance/:id',
    component:CicgroupClaimformComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'APA/:id',
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
    path: 'InsuranceclaimsForm',
    component:PrintInsuranceFormsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cooperative-claimform/:id',
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
    path: 'registration-link',
    component: RegistrationLinkComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Patient Registration Link'
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
    path: 'payments',
    component:PaymentsComponent,
    
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
