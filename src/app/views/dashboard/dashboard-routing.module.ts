import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

import { AuthGuard } from '../../auth.guard';

import { ToastrService } from 'ngx-toastr';


import { MaternityQrcodeComponent } from '../maternity-qrcode/maternity-qrcode.component';

import { FeedbackGraphsComponent } from '../feedback-graphs/feedback-graphs.component';
import { CallPatientsComponent } from '../call-patients/call-patients.component';
import { BookAppointmentComponent } from '../add/book-appointment/book-appointment.component';
import { BookVaccinationComponent } from '../add/book-vaccination/book-vaccination.component';
import { BookMaternityComponent } from '../add/book-maternity/book-maternity.component';
import { BookCovidtestingComponent } from '../add/book-covidtesting/book-covidtesting.component';

import { MaternityfeedbackComponent } from '../maternityfeedback/maternityfeedback.component';
import { DashboardReportComponent } from '../dashboard-report/dashboard-report.component';
import { AdminSetupsComponent } from '../admin-setups/admin-setups.component';
import { RoomSetupComponent } from '../room-setup/room-setup.component';
import { FreeroomsComponent } from '../freerooms/freerooms.component';
import { freemem } from 'os';
import { AllbookingsComponent } from '../../allbookings/allbookings.component';
// import { SignUpComponent } from '../sign-up/sign-up.component';

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
    path: 'Room-set-up',
    component:RoomSetupComponent,
    canActivate: [AuthGuard]
  },
 
  {
    path: 'admin-setups',
    component:AdminSetupsComponent,
    canActivate: [AuthGuard]
  },

 
  // {
  //   path: 'rooms-available',
  //   component:FreeroomsComponent,
  //   canActivate: [AuthGuard],
    
    
  // },
 
  {
    path: 'call-patients',
    component:CallPatientsComponent,
    
  },

{
  path : 'patients-reports',
  component : DashboardReportComponent,
  canActivate: [AuthGuard],
  data: {
    title: 'Reports'
  }
  },

 
  {
    path: 'rooms-available',
    component: FeedbackGraphsComponent,
    canActivate: [AuthGuard],
    // data: {
    //   title: 'Book Appointment'
    // }
  },
  {
    path: 'personal-booking/:id',
    component: CallPatientsComponent,
    // canActivate: [AuthGuard],
    // data: {
    //   title: 'Book vaccination'
    // }
  },
  {
    path: 'clients-bookings',
    component: AllbookingsComponent,
    canActivate: [AuthGuard],
  
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
