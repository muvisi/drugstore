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
  time =['8:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00']
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
  this.router.navigate(['/dashboard/appointment-details/',res.id])
   this.submitted = false;
  })

}
onSelect(item){
  const data = item.item;
  console.log(data)
  this.appointmentForm.patchValue({name:data.name,phone:data.phone});
}


}
