import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ServiceService } from '../../../service.service';
import { FormBuilder, FormGroup, Validators, FormControl,FormArray} from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  roomColumns: string[] = ['sn','name', 'type', 'floor','cost','status','bookings','book'];
  Columns: string[] = ['sn','date', 'start', 'end','type','staff'];
  @ViewChild('pagination', {static: true}) paginator: MatPaginator;
  @ViewChild('pagination1', {static: true}) paginator1: MatPaginator;
  @ViewChild('staticModal', { static: false }) staticModal: ModalDirective;
  @ViewChild('reservationModal', { static: false }) reservationModal: ModalDirective;
  rooms: MatTableDataSource<unknown>;
  dataSource;
  bookingForm: FormGroup;
  date = new Date();
  counsolers =[];
  time =['8:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00']
  constructor(public service:ServiceService,private formBuilder: FormBuilder,public toastr:ToastrService) { }
  ngOnInit() {
    this.getRoom();
    this.getCounselors();
    this.bookingForm = this.formBuilder.group({
      time: ['', Validators.required],
      date: ['', Validators.required],
      room: ['', Validators.required],
      staff:['',Validators.required]
    });
  }
  get f() { return this.bookingForm.controls; }

  getRoom() {
    this.service.getRooms().subscribe((res) => {
      this.rooms = new MatTableDataSource(res.results);
      this.rooms.paginator =this.paginator;
    });
  }
searchRoom(text){
  this.service.searchRooms(text).subscribe((res) => {
    this.rooms = new MatTableDataSource(res.results);
    this.rooms.paginator =this.paginator;
  });
}
onBook(){
this.service.reservation(this.bookingForm.value).subscribe((res)=>{
this.staticModal.hide();
this.bookingForm.reset();  
this.toastr.success("Successfully booked a room","Success")
},(err)=>{
  this.toastr.error(err.error.error,"Error")
})
}
open(item){
  this.bookingForm.patchValue({room:item.id});
  this.staticModal.show();
}
getCounselors(){
  this.service.getAppointmentUsers().subscribe((res)=>{
    this.counsolers = res.results;
  })
}
reservations(item){
this.service.reservationList(item.id).subscribe((res)=>{
  this.dataSource = new MatTableDataSource(res.results);
  this.dataSource.paginator = this.paginator1;
  this.reservationModal.show();

})
}
}


