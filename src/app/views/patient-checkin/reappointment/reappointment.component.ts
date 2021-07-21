import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../../service.service';
import { FormBuilder, FormGroup, Validators, FormControl,FormArray} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  time =['8:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00'];
  transactions=[];
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
   if (this.appointmentForm.invalid) {
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
  this.service.searchncbaPaymentsByPhone(text).subscribe((res)=>{
    this.transactions = res.results;
  })
}
typeaheadOnSelect(item){
  this.appointmentForm.patchValue({amount:item.item.amount,no:item.item.trans_id})
}
}
