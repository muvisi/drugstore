import { Component, OnInit,ViewChild} from '@angular/core';
import { ServiceService } from '../../../service.service';
import { FormBuilder, FormGroup, Validators, FormControl,FormArray} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table'
import { ToastrService } from 'ngx-toastr';
import dayGridPlugin from '@fullcalendar/daygrid';

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
  calendarPlugins = [dayGridPlugin]; 
  displayedColumns: string[] = ['patient_no', 'name','phone','appointment_date','time'];
  listColumns: string[] = ['S/No', 'name','phone','time'];
  timing =['8:00AM','8:20AM','8:40AM','9:00AM','8:00AM','8:20AM','8:40AM','9:00AM','9:20AM','9:40AM','10:00AM','10:20AM','10:40AM','11:00AM','11:20AM','11:40AM','12:00PM',
  '12:20AM','12:40AM','2:00PM','2:20PM','2:40PM','3:00PM','3:20PM','3:40PM','4:00PM','4:20PM','4:40PM','5:00PM','5:20PM','5:40PM']
  dataSource;
  @ViewChild('paginator', {static: true}) paginator: MatPaginator;
  @ViewChild('paginator1', {static: true}) paginator1: MatPaginator;
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
    this.getList();
  }
getList(){
  this.service.todayAppointmentList().subscribe((res)=>{
    this.toadysList = new MatTableDataSource(res.results);
    this.toadysList.paginator = this.paginator1;
  })
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
  this.getList();
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
handleDateClick(arg) { // handler method
  alert(arg.dateStr);
}

}
