import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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

  @ViewChild('stk', { static: false }) private stk;
  constructor(private formBuilder: FormBuilder,private service:ServiceService,private toast: ToastrService) {
  
   }

  ngOnInit() {
    this.patientMobileForm=this.formBuilder.group({
      phone:[''],
    })
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

}
