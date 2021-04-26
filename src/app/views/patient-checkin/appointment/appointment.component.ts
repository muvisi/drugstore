import { Component, OnInit,ViewChild} from '@angular/core';
import { ServiceService } from '../../../service.service';
import { FormBuilder, FormGroup, Validators, FormControl,FormArray} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  visits = [];
  appointmentForm: FormGroup;
  limit = new Date();
  toadysList;
  submitted=false;
  displayedColumns: string[] = ['patient_no', 'name','phone','appointment_date','time','reason','transaction'];
  listColumns: string[] = ['S/No', 'name','phone','time'];
  timing =['8:00AM','8:20AM','8:40AM','9:00AM','9:20AM','9:40AM','10:00AM','10:20AM','10:40AM','11:00AM','11:20AM','11:40AM','12:00PM',
  '12:20AM','12:40AM','2:00PM','2:20PM','2:40PM','3:00PM','3:20PM','3:40PM','4:00PM','4:20PM','4:40PM','5:00PM','5:20PM','5:40PM']
  maxDate;
  constructor(public service: ServiceService,private formBuilder: FormBuilder,public toastr: ToastrService,public router:Router ) { }
  ngOnInit() {
    this.maxDate = new Date();
    this.appointmentForm = this.formBuilder.group({
      phone: ['',Validators.required],
      time: ['', Validators.required],
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
      code:['+254',Validators.required],
      visit_type:['',Validators.required],
      date:['',Validators.required]
    });
    this.patientsList();
  }

  patientsList() {
    this.service.patientListing().subscribe((res) => {
     this.visits = res.results;
    }
    );
 }
 get f() { return this.appointmentForm.controls; }

 
 onSubmit() {
   this.submitted = true;
  if (this.appointmentForm.invalid) {
    this.toastr.error('Fill in All the Fields Marked with *');
      return;
  }

  this.service.createAppointment(this.appointmentForm.value).subscribe((res)=>{
  this.toastr.success("Successfully addeded appointment");
  this.appointmentForm.reset();
  this.router.navigate(['/dashboard/appointment-list/'])
   this.submitted = false;
  })

}
onSelect(item){
  const data = item.item;
  console.log(data)
  this.appointmentForm.patchValue({name:data.name,phone:data.phone});
}


}
