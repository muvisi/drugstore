// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
// import { AuthGuard } from '../../auth.guard';
// import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
// import { BookCovidtestingComponent } from './book-covidtesting/book-covidtesting.component';
// import { BookMaternityComponent } from './book-maternity/book-maternity.component';
// import { BookVaccinationComponent } from './book-vaccination/book-vaccination.component';

// // import { ClinicsSetupComponent } from '../patient-checkin/clinics-setup/clinics-setup.component';
// const routes: Routes = [


//   {
//     path: 'appointment',
//     component: BookAppointmentComponent,
//     canActivate: [AuthGuard],
//     data: {
//       title: 'Book Appointment'
//     }
//   },
//   {
//     path: 'vaccination',
//     component: BookVaccinationComponent,
//     canActivate: [AuthGuard],
//     data: {
//       title: 'Book vaccination'
//     }
//   },

//   {
//     path: 'maternity',
//     component: BookMaternityComponent,
//     canActivate: [AuthGuard],
//     data: {
//       title: 'Book Maternity'
//     }
//   },

//   {
//     path: 'covid-test',
//     component: BookCovidtestingComponent,
//     canActivate: [AuthGuard],
//     data: {
//       title: 'Book Covid Testing'
//     }
//   }


// ];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class AddRoutingModule {}
