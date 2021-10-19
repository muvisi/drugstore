import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../../service.service';
import { FormBuilder, FormGroup, Validators, FormControl,FormArray} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
@Component({
  selector: 'app-reappointment',
  templateUrl: './reappointment.component.html',
  styleUrls: ['./reappointment.component.scss']
})
export class ReappointmentComponent implements OnInit {
  patient:any={};
  customer:any={}
  maxDate = new Date();
  loading = false;
  appointmentForm: FormGroup;
  submitted: boolean;
  student=false;
  time =['8:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00'];
  transactions=[];
  counsellling_type=[
    {
      type:"Couples",
      code:201,
      value:"couple"

    },
    {
      type:"Family",
      code:202,
      value:"family"

    },  
    {
      type:"Children",
      code:203,
      value:"children"

    },  {
      type:"Groups",
      code:204,
      value:"group"

    },
    {
      type:"Webinars",
      code:205,
      value:"webinar"

    },
    {
      type:"Individual",
      code:206,
      value:"individual"

    },  {
      type:"Students",
      code:207,
      value:"student"

    }

  ]
  constructor(private route: ActivatedRoute,public router:Router,public service:ServiceService,private formBuilder: FormBuilder,public toastr:ToastrService) { }
  ngOnInit() {
    this.getPatient(this.route.snapshot.params.id);
    this.appointmentForm = this.formBuilder.group({
      time: ['', Validators.required],
      type: ['', Validators.required],
      payment_type:['',Validators.required],
      amount:['',Validators.required],
      reason: ['', Validators.required],
      no:[''],
      date:['',Validators.required]
    });
  }
  get f() { return this.appointmentForm.controls; }

  getPatient(id){
    this.service.getPatient(id).subscribe((res)=>{
      this.customer = res;
      })
  }
  
  onSubmit() {
  this.loading = true;
  this.submitted = true;
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
   if (!this.student && (this.appointmentForm.get('date').value=='' || 
    this.appointmentForm.get('time').value=='' ||
    this.appointmentForm.get('payment_type').value=='' ||
    this.appointmentForm.get('amount').value=='' ||
    this.appointmentForm.get('reason').value==''
   )) {
       this.loading = false; 
       this.submitted = false;
       this.toastr.info("please write correct details");
       return;
   }else if(this.student && (this.appointmentForm.get('date').value=='' || 
      this.appointmentForm.get('time').value=='' ||
      this.appointmentForm.get('reason').value==''
      )){
        this.loading = false; 
        this.submitted = false;
        this.toastr.info("please write correct details");
        return;
      }
    let data:any ={};
    data.id = this.route.snapshot.params.id
    data.date = this.appointmentForm.get('date').value
    data.time = this.appointmentForm.get('time').value
    data.reason = this.appointmentForm.get('reason').value
    data.payment_type = this.appointmentForm.get('payment_type').value
    data.amount = this.appointmentForm.get('amount').value
    data.no = this.appointmentForm.get('no').value
    data.type = this.appointmentForm.get('type').value
    this.service.createReappointment(data).subscribe((res)=>{
      console.log(res);
    this.toastr.success("Successfully addeded appointment");
      this.submitted = false;
      this.loading = false;
      this.router.navigate(['/dashboard/appointment-list/'])
    },(err)=>{
      this.loading = false;
      this.toastr.info(err.error.error,'Information');
    })
 
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
appointmentTypeSelected(value){
  console.log("vvv",value);
  if(value=="student")this.student=true;else this.student=false;
}
}
