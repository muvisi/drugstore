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
  loading;
  QRCODE_DATA: string;
  constructor(public navCtrl: NgxNavigationWithDataComponent,private router: Router,public service:ServiceService,public toastr: ToastrService,@Inject(DOCUMENT) _document?: any) {
    if (localStorage.getItem("SIGNATURE_ID")!=null){
      this.QRCODE_DATA=localStorage.getItem("SIGNATURE_ID");
    }else{
      let id=this.generate_signature_id();
      localStorage.setItem("SIGNATURE_ID",id);
      this.QRCODE_DATA=id;
    }
  }

  ngOnInit() {
  
  }
  generate_signature_id(){
    var gen_str="AAR-SIGNATURE-";
    let random_str="AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789";
    for (var i=0;i<=30;i++){
      try{
        let randint=Math.floor((Math.floor(Math.random()*10)*Math.floor(Math.random()*10))/2)
        gen_str+=random_str.charAt(randint)
      }catch(e){

      }
    }
    return gen_str;
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
