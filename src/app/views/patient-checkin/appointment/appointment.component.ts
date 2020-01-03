import { Component, OnInit,ViewChild} from '@angular/core';
import { ServiceService } from '../../../service.service';
import { FormBuilder, FormGroup, Validators, FormControl,FormArray} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  visits = [];
  appointmentForm: FormGroup;
  limit = new Date();
  displayedColumns: string[] = ['patient_no', 'name','phone','appointment_date','time'];
  dataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(public service: ServiceService,private formBuilder: FormBuilder,public toastr: ToastrService ) { }

  ngOnInit() {
    this.appointmentForm = this.formBuilder.group({
      appointment_date: ['', Validators.required],
      phone: ['',Validators.required],
      time: ['', Validators.required],
      reason: ['', Validators.required],
      patient_no: ['', Validators.required],
      name: ['',Validators.required]
    });
    this.patientsList();
    this.appointments();
  }

  patientsList() {
    this.service.patientListing().subscribe((res) => {
     this.visits = res.results;
    }
    );
 }
 get f() { return this.appointmentForm.controls; }

 applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
 onSubmit() {
 
  if (this.appointmentForm.invalid) {
    this.toastr.error('Fill in All the Fields Marked with *');
      return;
  }
  this.service.createAppointment(this.appointmentForm.value).subscribe((res)=>{
  this.toastr.success("Successfully addeded appointment");
  this.appointmentForm.reset();
  this.appointments();
  })

}
onSelect(item){
  const data = item.item;
  console.log(data)
  this.appointmentForm.patchValue({name:data.name,phone:data.phone});
}
appointments(){
  this.service.appointmentList().subscribe((res)=>{
    this.dataSource = new MatTableDataSource(res.results);
    this.dataSource.paginator = this.paginator;
  })
}
}
