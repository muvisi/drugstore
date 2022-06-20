import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { type } from 'os';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ServiceService } from '../../../service.service';

@Component({
  selector: 'app-registration-link',
  templateUrl: './registration-link.component.html',
  styleUrls: ['./registration-link.component.scss']
})
export class RegistrationLinkComponent implements OnInit {
  patientMobileForm: FormGroup;
  mpesa_amount;
  loading;

  already_booked_data=[];
  @ViewChild('stk', { static: false }) private stk;

    formatter = (item: {phone:'',type:string,date:string,id:string}) =>
    { 
      return item.phone+" "+item.type+" "+item.date;
    }

    search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map(term => term === '' ? []
          : this.already_booked_data.filter(v => v.phone.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
      )
  constructor(private formBuilder: FormBuilder,private service:ServiceService,private toast: ToastrService,private router:Router) {
  
   }

  ngOnInit() {
    this.patientMobileForm=this.formBuilder.group({
      phone:[''],
    })
    this.filterBooking()
  }

  submitPhoneMaternity(){
    var data=this.patientMobileForm.value;
    if(data.phone=="" || data.phone==null){
      this.toast.warning("Enter phone number");
      return ;
    }
    this.loading=true;
    
    data=Object.assign(data,{type:'maternity'});
    this.service.getRegistrationLink(data).subscribe((res)=>{
      this.loading=false
      if(res.status){
        this.toast.success("Successfully sent");
      }else{
        this.toast.warning("System error")
      }
    },(err)=>{
      this.loading=false;
      this.toast.warning("Network error")
    })

  }
  showStk(){
    var data=this.patientMobileForm.value;
    if(data.phone=="" || data.phone==null){
      this.toast.warning("Enter phone number");
      return ;
    }
    this.stk.show()
  }
  submitPhoneRegister(){
    var data=this.patientMobileForm.value;
    if(data.phone=="" || data.phone==null){
      this.toast.warning("Enter phone number");
      return ;
    }
    this.loading=true;
    
    data=Object.assign(data,{type:'register'});
    this.service.getRegistrationLink(data).subscribe((res)=>{
      this.loading=false
      if(res.status){
        this.toast.success("Successfully sent");
      }else{
        this.toast.warning("System error")
      }
    },(err)=>{
      this.loading=false;
      this.toast.warning("Network error")
    })

  }
  submitPhoneVacinnation(){
    var data=this.patientMobileForm.value;
    if(data.phone=="" || data.phone==null){
      this.toast.warning("Enter phone number");
      return ;
    }
    this.loading=true;
    
    data=Object.assign(data,{type:'vaccination'});
    this.service.getRegistrationLink(data).subscribe((res)=>{
      this.loading=false
      if(res.status){
        this.toast.success("Successfully sent");
      }else{
        this.toast.warning("System error")
      }
    },(err)=>{
      this.loading=false;
      this.toast.warning("Network error")
    })

  }
  submitPhoneTesting(){
    var data=this.patientMobileForm.value;
    if(data.phone=="" || data.phone==null){
      this.toast.warning("Enter phone number");
      return ;
    }
    this.loading=true;
    
    data=Object.assign(data,{type:'testing'});
    this.service.getRegistrationLink(data).subscribe((res)=>{
      this.loading=false
      if(res.status){
        this.toast.success("Successfully sent");
      }else{
        this.toast.warning("System error")
      }
    },(err)=>{
      this.loading=false;
      this.toast.warning("Network error")
    })

  }
  submitPhoneFeedBack(){
    var data=this.patientMobileForm.value;
    if(data.phone=="" || data.phone==null){
      this.toast.warning("Enter phone number");
      return ;
    }
    this.loading=true;
  

    this.service.getFeedbackLink(data).subscribe((res)=>{
      this.toast.success("Successful")
      this.loading=false
    },(err)=>{
      this.toast.warning("Failed")
      this.loading=false
    });

  }


  mpesaPayment(){
    var data=this.patientMobileForm.value;
    var phone=data['phone']
    var new_phone=""
    if (phone.startsWith("07")||phone.startsWith("01")){
      new_phone="254"+phone.slice(1,10);
    }else if(phone.startsWith("254")){
        new_phone=phone;
    }
    else if(phone.startsWith("+254")){
      new_phone=phone.replace("+","");
  }else{
    this.toast.warning("Check mobile number")
    return;
  }
  if (Number(this.mpesa_amount)<1){
    this.toast.warning("Please enter amount")
  }
  let post_data={
    "mobile":new_phone,
    "amount":this.mpesa_amount,
    "visit_number":new_phone
  }
  this.loading=true;
    this.service.mpesapay(post_data).subscribe((res)=>{
      this.loading=false
      if(res.msg=="success"){
        this.toast.success("Successfully sent");
        this.stk.hide();
      }else{
        this.toast.warning(res.msg);
      }
 
    },(err)=>{
      this.loading=false;
      this.toast.warning("Network error")
    })

  }
  submitPhone(){
    this.loading=true;
    this.service.getRegistrationLink(this.patientMobileForm.value).subscribe((res)=>{
      this.loading=false
      if(res.status){
        this.toast.success("Successfully sent");
      }else{
        this.toast.warning("System error")
      }
    },(err)=>{
      this.loading=false;
      this.toast.warning("Network error")
    })

  }

  selectedBooking($event){
    let item=$event.item
    if($event.item.type=="Appointment booking"){
      this.router.navigateByUrl("dashboard/booking-details/"+item.id)
    }else if($event.item.type=="Maternity booking"){
      this.router.navigateByUrl("dashboard/maternity-details/"+item.id)
    }else if($event.item.type=="Covid Vaccination"){
      this.router.navigateByUrl("dashboard/appointment-details/"+item.id)
    }else if($event.item.type=="Covid testing"){
      this.router.navigateByUrl("dashboard/testing-details/"+item.id)
    }
  }

  filterBooking(){
    let d=this.patientMobileForm.value
    this.service.getBookingSuggestions(d.phone).subscribe(res=>{
      this.already_booked_data=res;
    },err=>{

    })
  }



}
