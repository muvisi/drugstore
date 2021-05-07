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
  maxDate = new Date();
  appointmentForm: FormGroup;
  submitted: boolean;
  time =['8:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00'];
  constructor(private route: ActivatedRoute,public router:Router,public service:ServiceService,private formBuilder: FormBuilder,public toastr:ToastrService) { }

  ngOnInit() {
    this.getPatient(this.route.snapshot.params.id);
    this.appointmentForm = this.formBuilder.group({
      phone: ['',Validators.required],
      time: ['', Validators.required],
      type: ['', Validators.required],
      reason: ['', Validators.required],
      first_name: ['', Validators.required],
      other_names: [''],
      last_name: ['', Validators.required],
      gender: ['Female', Validators.required],
      email: ['',Validators.email],
      dob: ['', Validators.required],
      priority: ['3', Validators.required],
      residence: [''],
      national_id: ['',Validators.required],
      passport_no: [''],
      occupation: [''],
      visit_type:['REVISIT',Validators.required],
      date:['',Validators.required]
    });
  }
  get f() { return this.appointmentForm.controls; }

  getPatient(id){
    this.service.getPatient(id).subscribe((res)=>{
      this.patient = res;
      this.appointmentForm.patchValue({last_name:this.patient.last_name,first_name:this.patient.first_name,other_names:this.patient.other_names,gender:this.patient.gender,
      national_id:this.patient.national_id,phone:this.patient.phone,email:this.patient.email,dob:new Date(this.patient.dob),residence:this.patient.residence
      })
    })
  }
  onSubmit() {
    this.submitted = true;
   if (this.appointmentForm.invalid) {
       return;
   }
   let data:any ={};
   data.id = this.route.snapshot.params.id
   data.date = this.appointmentForm.get('date').value
   data.time = this.appointmentForm.get('time').value
   data.reason = this.appointmentForm.get('reason').value
   this.service.createReappointment(data).subscribe((res)=>{
   this.toastr.success("Successfully addeded appointment");
    this.submitted = false;
    this.router.navigate(['/dashboard/appointment-list/'])
   },(err)=>{
    this.toastr.info(err.error.error,'Information');
   })
 
 }
}
