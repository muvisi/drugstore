import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../service.service';
// import { ServiceService } from '../service.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  dataSource
  Columns: string[] = ['sn','created','client','phone','age','quantity','drug_name','status']

  constructor(public service: ServiceService,private router: Router,private toast:ToastrService) { }

  ngOnInit() {
    this.AvailableRooms()
  }
  
  AvailableRooms() {
    this.service.getbookingsreport().subscribe((res) => {
      console.log("my data",res)
     this.dataSource = res;
    }
    );

}


BookRoom(item){
  let data={
    id:item.id
  }
  this.router.navigateByUrl("dashboard/personal-booking/"+item.id)


}
FreeRoom(item){
 
  let data={
    room_id:item.room.id,
    booking_id:item.id

  }
  console.log(data)
  this.service.freeroom(data).subscribe((res) => {
    console.log("my data",res)
   this.toast.success("Success","Room is now Free")
   this.AvailableRooms()
  }
  );





}


PushSTK(item){
  var num="254"

  let data={
    phone:num.concat(item.phone),
    amount:item.room.room_price
  }
  console.log("stk data",data)
  this.service.pushstk(data).subscribe((res) => {
    console.log("my data",res)
   this.toast.success("Success","Successfully pushed stk")
   this.AvailableRooms()
  }
  );
}

}
