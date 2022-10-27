import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-feedback-graphs',
  templateUrl: './feedback-graphs.component.html',
  styleUrls: ['./feedback-graphs.component.scss']
})
export class FeedbackGraphsComponent implements OnInit {
  dataSource;
  room_block;
  room_price;
  room_number;
  room_package
  room_id
  @ViewChild('ConfirmAppointment', { static: false }) confirmAppointmentModal: ModalDirective;
  Columns: string[] = ['sn','created','room_number','room_block','room_package','room_price','boarding_package','status','action','pay','edit']

  constructor(public service: ServiceService,private router: Router,private toast:ToastrService) { }

  ngOnInit() {
    this.AvailableRooms()
  }
  
  AvailableRooms() {
    this.service.getavailablerooms().subscribe((res) => {
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

//   console.log("data item",item)
//   this.service.bookroom(data).subscribe((res) => {
//     console.log("my data",res)
//    this.dataSource = res;
//   }
//   );
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
editdata(item){
  console.log(item)
  this.room_package=item.room_package,
  this.room_block=item.room_block,
  this.room_price=item.room_price,
  this.room_number=item.room_number,
  this.room_id=item.id


  this.confirmAppointmentModal.show()

}
editDatarooms(){
  let data={
    room_package:this.room_package,
    room_block:this.room_block,
    room_price:this.room_price,
    room_number:this.room_number,
    id:this.room_id
  }
  console.log(data)
  this.service.editrooms(data).subscribe((res) => {
    console.log("res",res)
    this.toast.success("success","successfully updated")
    this.confirmAppointmentModal.hide()
    this.AvailableRooms()
  //   console.log("my data",res)
  //  this.dataSource = res;
  }
  );

}
}

