import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PatientCheckinModule } from '../patient-checkin/patient-checkin.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    // ChartsModule,
    ButtonsModule.forRoot(),
    PatientCheckinModule,
    CommonModule

  ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule { }
