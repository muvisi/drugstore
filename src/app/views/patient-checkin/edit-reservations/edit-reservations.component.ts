import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../../service.service';

@Component({
  selector: 'app-edit-reservations',
  templateUrl: './edit-reservations.component.html',
  styleUrls: ['./edit-reservations.component.scss']
})
export class EditReservationsComponent implements OnInit {
  bookingForm: FormGroup;
  reservation:any ={};
  counsolers: any=[];
  submitted=false;
  date = new Date()
  constructor(public service:ServiceService,private formBuilder: FormBuilder,public toastr:ToastrService,public router:Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.bookingForm = this.formBuilder.group({
      name: ['', Validators.required],
      cost: ['', Validators.required],
      description: ['', Validators.required],
      floor: ['', Validators.required],
      type_name: ['', Validators.required],
      time: ['', Validators.required],
      date: ['', Validators.required],
      staff: ['', Validators.required]
    })
    this.getReservation(this.route.snapshot.params.id)
    this.getCounselors();
  }
  get f() { return this.bookingForm.controls; }
  getReservation(id) {
    this.service.getReservation(id).subscribe((res) => {
      this.reservation = res;
      this.bookingForm.patchValue({name:res.room.name,description:res.room.description,cost:res.room.cost,floor:res.room.floor_name,type_name:res.room.type_name,time:res.start,date:new Date(res.date),staff:res.staff_id})
    });
  }
  getCounselors(){
    this.service.getAppointmentUsers().subscribe((res)=>{
      this.counsolers = res.results;
    })
  }
  onUpdate(){
    this.submitted =true;
    this.service.updateReservation(this.route.snapshot.params.id,this.bookingForm.value).subscribe((res)=>{
      console.log(res);
      this.submitted =false;
      this.toastr.success("Successfully updated","Success")

    })
  }
}
