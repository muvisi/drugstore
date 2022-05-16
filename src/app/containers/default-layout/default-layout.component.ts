import { Component, OnDestroy, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import {  docNavItems } from '../../_doctor';
import {  insuranceItems } from '../../_insurance';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../service.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public docNavItems = docNavItems;
  public insuranceItems = insuranceItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  data: any ={};
  user = JSON.parse(sessionStorage.getItem('user'));
  @ViewChild('staticModal', { static: false }) staticModal: ModalDirective;
  @ViewChild('qrcodeModal', { static: false }) qrcodeModal: ModalDirective;
  QRCODE_DATA;
  INPATIENT_QRCODE="https://bookings.aarhospital.com/#/feedback-2";
  OUTPATIENT_QRCODE="https://bookings.aarhospital.com/#/feedback";
  REGISTER_QRCODE="https://bookings.aarhospital.com/#/register/patient";
  WHATAPP_QRCODE="https://wa.me/14155238886/?text=join nervous-fast";
  constructor(public navCtrl: NgxNavigationWithDataComponent,private router: Router,public service:ServiceService,public toastr: ToastrService,@Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });

    if (localStorage.getItem("SIGNATURE_ID")!=null){
      this.QRCODE_DATA=localStorage.getItem("SIGNATURE_ID");
    }else{
      let id=this.generate_signature_id();
      localStorage.setItem("SIGNATURE_ID",id);
      this.QRCODE_DATA=id;
    }
  }
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('login');
    // location.href = '/login';
    console.clear();
    console.log('logged out');
  }
  submit(){
    if(this.data.password1 != this.data.password2 ){
      this.toastr.error("New Password Didn't Match");
      return;
    }
    this.service.changePassword(this.data).subscribe((res)=>{
      this.toastr.success("Successfully changed password");
      this.staticModal.hide();
      this.data ={};
    },()=>{
      this.toastr.error("Password Change Failed");
    });
  }
  ngOnDestroy(): void {
    this.changes.disconnect();
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
  downloadInpatient() {
    this.router.navigateByUrl('dashboard')   
    this.navCtrl.navigate('dashboard/feedback-inpatient-qrcode-download',{"data":{url:this.INPATIENT_QRCODE,type:"Inpatient"}})  
  }
  downloadOutpatient() {
    this.router.navigateByUrl('dashboard')
    this.navCtrl.navigate('dashboard/feedback-outpatient-qrcode-download',{"data":{url:this.OUTPATIENT_QRCODE,type:"Outpatient"}})
  }
  downloadRegister(){
    this.router.navigateByUrl('dashboard')
      this.navCtrl.navigate('dashboard/register-qrcode-download',{"data":{url:this.REGISTER_QRCODE,type:"Register"}})
  }
  downloadWhatapp(){
    this.router.navigateByUrl('dashboard')
    this.navCtrl.navigate('dashboard/whatapp-qrcode-download',{"data":{url:this.WHATAPP_QRCODE,type:"Whatapp"}})
  }
}
