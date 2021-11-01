import { Component, OnInit,ViewChild} from '@angular/core';
import { ServiceService } from '../../../service.service';
import { FormBuilder, FormGroup, Validators, FormControl,FormArray} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  visits = [];
  appointmentForm: FormGroup;
  student=false;
  limit = new Date();
  toadysList;
  submitted=false;
  transactions=[];
  loading = false;
  displayedColumns: string[] = ['patient_no', 'name','phone','appointment_date','time','reason','transaction'];
  listColumns: string[] = ['S/No', 'name','phone','time'];
  time =['8:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00']
  maxDate = new Date();
  dobDate= new Date(moment().subtract(4,'years').format())
  paymentForm: FormGroup;

  counsellling_type=[
    {
      type:"First Dose",
      code:201,
      value:"First Dose"

    },
    {
      type:"Second Dose",
      code:202,
      value:"Second Dose"

    }

  ]


  @ViewChild('staticModal', { static: false }) staticModal: ModalDirective;
  constructor(public service: ServiceService,private formBuilder: FormBuilder,public toastr: ToastrService,public router:Router ) { 
    console.log(this.dobDate);
  }
  ngOnInit() {
    this.maxDate = new Date();
    this.appointmentForm = this.formBuilder.group({
      phone: ['',Validators.required],
      dose: ['', Validators.required],
      time: ['', Validators.required],
      reason: ['', Validators.required],
      first_name: ['', Validators.required],
      doc_type: ['', Validators.required],
      last_name: ['', Validators.required],
      gender: ['Female', Validators.required],
      email: ['',Validators.email],
      dob: ['', Validators.required],
      residence: [''],
      national_id: ['',Validators.required],
      passport_no: [''],
      occupation: [''],
      date:['',Validators.required]
    });
    this.paymentForm = this.formBuilder.group({
      mobile: ['', Validators.required],
      amount: [0, Validators.required],
      acc: ['kapc', Validators.required]
    })
    this.patientsList();
    
  }

  patientsList() {
    this.service.patientListing().subscribe((res) => {
     this.visits = res.results;
    }
    );
 }
 get f() { return this.appointmentForm.controls; }
 get p() { return this.paymentForm.controls; }

 onPayment(){
   console.log(this.paymentForm.value)
  this.service.mpesaStk(this.paymentForm.value).subscribe((res)=>{
    this.toastr.success("Request Sent","Success")
    this.paymentForm.reset();
    this.staticModal.hide()
  },(err)=>{
    this.toastr.error("Request Failed","Failed")
  })
  }
 onSubmit() {
   this.submitted = true;
   this.loading = true;
   if(moment().format('YYYY-MM-DD') >= moment(this.appointmentForm.get('date').value).format('YYYY-MM-DD')){
    if(moment().format('HH:mm') >= moment(this.appointmentForm.get('time').value,'HH:mm').format('HH:mm')){
      this.toastr.info("please select time future date or time");
    this.loading = false; 
    this.submitted = false;
    return
    }

  }
  if(moment(this.appointmentForm.get('time').value,'HH:mm').format('HH:mm') >=moment('17:00','HH:mm').format('HH:mm') || moment(this.appointmentForm.get('time').value,'HH:mm').format('HH:mm') < moment('08:00','HH:mm').format('HH:mm') ){
    this.toastr.info("please select time between 8am - 4pm");
    this.loading = false; 
    this.submitted = false;
    return
  }

  if (this.appointmentForm.invalid) {
    console.log(this.appointmentForm.errors);
    this.toastr.error('Fill in All the Fields Marked with *');
      this.loading=false;
      return;
  }

  this.service.createAppointment(this.appointmentForm.value).subscribe((res)=>{
  this.toastr.success("Successfully addeded appointment");
  this.appointmentForm.reset();
  this.router.navigate(['/dashboard/appointment-details/',res.id])
   this.submitted = false;
   this.loading=false;
  },(err)=>{
    this.toastr.error(err.error.error);
  this.submitted = false;
   this.loading=false;
  })

}

appointmentTypeSelected(value){
  
  if(value=="student")this.student=true;else this.student=false;
}

onSelect(item){
  const data = item.item;
  console.log(data)
  this.appointmentForm.patchValue({name:data.name,phone:data.phone});
}
searchTransaction(text){
  this.service.mpesaAppointmentPayment(text).subscribe((res)=>{
    this.transactions = res.results;
  })
}
typeaheadOnSelect(item){
  this.appointmentForm.patchValue({amount:item.item.amount,no:item.item.description})
}
mpesa(){
  this.paymentForm.patchValue({amount:1000,acc:"kapc"})
  this.staticModal.show();
}

}
