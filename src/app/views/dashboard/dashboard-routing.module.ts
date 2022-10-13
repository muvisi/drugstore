import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

import { AuthGuard } from '../../auth.guard';

import { OnlinereportsComponent } from '../../onlinereports/onlinereports.component';
import { MaincovidComponent } from '../../maincovid/maincovid.component';
import { ToastrService } from 'ngx-toastr';
import { TimeslotComponent } from '../../timeslot/timeslot.component';
import { TestresultComponent } from '../../testresult/testresult.component';
import { ViewlistComponent } from '../../viewlist/viewlist.component';
import { CovidrevenuesComponent } from '../../covidrevenues/covidrevenues.component';
import { FeedbacksComponent } from '../../feedbacks/feedbacks.component';

import { MaternityQrcodeComponent } from '../maternity-qrcode/maternity-qrcode.component';
// import { FootwalkComponent } from '../patient-checkin/footwalk/footwalk.component';

import { FeedbackGraphsComponent } from '../feedback-graphs/feedback-graphs.component';
import { CallPatientsComponent } from '../call-patients/call-patients.component';
import { BirthdaymessengesComponent } from '../birthdaymessenges/birthdaymessenges.component';
import { BookAppointmentComponent } from '../add/book-appointment/book-appointment.component';
import { BookVaccinationComponent } from '../add/book-vaccination/book-vaccination.component';
import { BookMaternityComponent } from '../add/book-maternity/book-maternity.component';
import { BookCovidtestingComponent } from '../add/book-covidtesting/book-covidtesting.component';

import { MaternityfeedbackComponent } from '../maternityfeedback/maternityfeedback.component';
import { DashboardReportComponent } from '../dashboard-report/dashboard-report.component';
import { AdminSetupsComponent } from '../admin-setups/admin-setups.component';
import { ViewmaternityComponent } from '../../viewmaternity/viewmaternity.component';
import { PatientsuploadsComponent } from '../../patientsuploads/patientsuploads.component';
import { MaternityCalendarComponent } from '../../maternity-calendar/maternity-calendar.component';
// import { ClinicsSetupComponent } from '../patient-checkin/clinics-setup/clinics-setup.component';
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
    path: 'maternityfeedback-qrcode-download',
    component: MaternityfeedbackComponent,
  },
 
  {
    path: 'maternity-qrcode-download',
    component: MaternityQrcodeComponent,
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
    path: 'results',
    component: TestresultComponent,
    canActivate: [AuthGuard]
  },
 
  
   {
    path: 'view-maternity-booking',
    component:ViewmaternityComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'view-maternity-calendar',
    component:MaternityCalendarComponent,
    canActivate: [AuthGuard]
  },
 
  {
    path: 'feedbacks',
    component:FeedbacksComponent,
    canActivate: [AuthGuard]
  },
 
  {
    path: 'admin-setups',
    component:AdminSetupsComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'test',
    component:ViewlistComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'patients-upload',
    component:PatientsuploadsComponent,
    
  },
 
  {
    path: 'Feedback-graphs',
    component:FeedbackGraphsComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Feedback Graphs'
    }
    
  },
 
  {
    path: 'call-patients/:id',
    component:CallPatientsComponent,
    
  },
  {
    path: 'birthday-Messanges',
    component:BirthdaymessengesComponent,
    
  },
 
{
  path : 'patients-reports',
  component : DashboardReportComponent,
  canActivate: [AuthGuard],
  data: {
    title: 'Reports'
  }
  },

  // {
  //   path: 'book',
  //   data: {
  //     title: 'Book'
  //   },
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: () => import('../add/add.module').then(m => m.AddModule),
  //       data: { preload: true }
  //     }
  //   ]
  // },

  {
    path: 'book-appointment',
    component: BookAppointmentComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Book Appointment'
    }
  },
  {
    path: 'book-vaccination',
    component: BookVaccinationComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Book vaccination'
    }
  },
  {
    path: 'book-covid-testing',
    component: BookCovidtestingComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Book vaccination'
    }
  },

  {
    path: 'book-maternity',
    component: BookMaternityComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Book Maternity'
    }
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule {}
