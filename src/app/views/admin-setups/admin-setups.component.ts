import { Component, Inject, OnInit } from '@angular/core';
// import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
// import { ServiceService } from '../../../service.service';
// import { Component, OnDestroy, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import {  docNavItems } from '../../_doctor';
import {  insuranceItems } from '../../_insurance';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../service.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';

@Component({
  selector: 'app-admin-setups',
  templateUrl: './admin-setups.component.html',
  styleUrls: ['./admin-setups.component.scss']
})
// @ViewChild('qrcodeModal', { static: false }) qrcodeModal: ModalDirective;
export class AdminSetupsComponent implements OnInit {
  patientMobileForm: FormGroup;

  constructor(public navCtrl: NgxNavigationWithDataComponent,private router: Router,public service:ServiceService,public toastr: ToastrService,@Inject(DOCUMENT) _document?: any) {}

  ngOnInit() {
  
  }
  submitinpatientfeedback(){
    this.router.navigateByUrl('dashboard')   
    this.navCtrl.navigate('dashboard/feedback-inpatient-qrcode-download')  
  }
  downloadOutpatientfeedback() {
    this.router.navigateByUrl('dashboard')
    this.navCtrl.navigate('dashboard/feedback-outpatient-qrcode-download')
  }
  downloadMaternity(){
    this.router.navigateByUrl('dashboard')
    this.navCtrl.navigate('dashboard/maternity-qrcode-download')
}
downloadMaternityfeedback(){
  this.router.navigateByUrl('dashboard')
  this.navCtrl.navigate('dashboard/maternityfeedback-qrcode-download')
}
downloadWhatapp(){
  this.router.navigateByUrl('dashboard')
  this.navCtrl.navigate('dashboard/whatapp-qrcode-download')
}
downloadRegister(){
  this.router.navigateByUrl('dashboard')
    this.navCtrl.navigate('dashboard/register-qrcode-download')
}
VaccineSetup(){
  this.router.navigateByUrl('dashboard')
    this.navCtrl.navigate('dashboard/vaccine-setup')
}
TimeSlotsetup(){
  this.router.navigateByUrl('dashboard')
    this.navCtrl.navigate('dashboard/timeslot')
}
ClinicSetup(){
  this.router.navigateByUrl('dashboard')
    this.navCtrl.navigate('dashboard/clinic-setup')
}
FeedbackSetup(){
  this.router.navigateByUrl('dashboard')
    this.navCtrl.navigate('dashboard/feedback-setup')
}
ClinicsSetup(){
  this.router.navigateByUrl('dashboard')
    this.navCtrl.navigate('dashboard/clinics-setup')
}
SetUps(){
  this.router.navigateByUrl('dashboard')
    this.navCtrl.navigate('dashboard/clinics-setup')
}
// <!-- <a class="dropdown-item" routerLink="/dashboard/vaccine-setup" > <i class="fas fa-syringe"></i>Vaccine Setup</a> -->
// <!-- <a class="dropdown-item" routerLink="/dashboard/timeslot" > <i class="fas fa-address-book"></i>Time Slot Setup</a> -->
// <!-- <a class="dropdown-item" routerLink="/dashboard/clinic-setup" > <i class="fa fa-thermometer-half"></i>Clinic Setup</a> -->
// <!-- <a class="dropdown-item" routerLink="/dashboard/clinics-setup" > <i class="fa fa-thermometer-half"></i>Clinics Setup</a> -->
// <!-- <a class="dropdown-item" routerLink="/dashboard/feedback-setup" > <i class="fa fa-thermometer-half"></i>Feedback Setup</a> -->

}
