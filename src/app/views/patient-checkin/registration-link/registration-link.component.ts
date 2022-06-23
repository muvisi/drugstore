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
  @ViewChild('paymentModal', { static: false }) private stk;

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
  mpesa_paid: boolean;
  transaction_code: any;
  payment_amount: any;
  payer_name: any;
  payer_phone: any;
  phone_number: any;
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

    this.service.postFootWalkData(data).subscribe(res=>{

    },err=>{})

  }
  showStk(){
    var data=this.patientMobileForm.value;
    if(data.phone=="" || data.phone==null){
      this.toast.warning("Enter phone number");
      return ;
    }
    var data=this.patientMobileForm.value;
    this.phone_number=data['phone']
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
    this.service.postFootWalkData(data).subscribe(res=>{

    },err=>{})

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

    this.service.postFootWalkData(data).subscribe(res=>{

    },err=>{})
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

    this.service.postFootWalkData(data).subscribe(res=>{

    },err=>{})
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

    this.service.postFootWalkData(data).subscribe(res=>{

    },err=>{})

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
    try{
      this.service.postFootWalkData(item).subscribe(res=>{

      },err=>{})
  
    }catch(err){

    }
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

  mpesaPayment(){
    var data=this.patientMobileForm.value;
    var phone=data['phone']
  this.phone_number=""
    if (phone.startsWith("07")||phone.startsWith("01")){
      this.phone_number="254"+phone.slice(1,10);
    }else if(phone.startsWith("254")){
      this.phone_number=phone;
    }
    else if(phone.startsWith("+254")){
      this.phone_number=phone.replace("+","");
  }else{
    this.toast.warning("Check mobile number")
    return;
  }
  if (Number(this.mpesa_amount)<1){
    this.toast.warning("Please enter amount")
  }
  let post_data={
    "mobile":this.phone_number,
    "amount":this.mpesa_amount,
    "visit_number":this.phone_number
  }

  
    
      this.loading=true;
      this.service.requestStkPush(post_data).subscribe((res)=>{
        this.check_paid(this.phone_number,post_data.amount,0);
      
    },(err)=>{
      this.loading=false;
      this.toast.error("Payment Failed");
    });  
        
      
    this.service.postFootWalkData(data).subscribe(res=>{

    },err=>{})

}

sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async check_paid(phone,amount,count){
  this.sleep(2000);
  if(count>=100){
    this.loading=false;
    this.toast.error("Payment Failed"); 
    this.mpesa_paid=false;;
      return;
  }
 this.service.mpesaPayment(phone).subscribe((res)=>{
    
    for(var i=0;i<res.length;i++){
      if(amount==res[i].Amount){
        this.loading=false;
        this.mpesa_paid=true;
        this.transaction_code=res[i].MpesaReceiptNumber
        this.payment_amount=res[i].Amount
        this.payer_name=res[i].Name
        this.payer_phone=phone;

        count=11;
       return;
      }
    }


     
    this.check_paid(phone,amount,count+1);
    
    },(err)=>{
      this.mpesa_paid=false;
      this.loading=false;
      console.log(err);
      this.toast.error(err.error.message);       
    });
    
}

}
