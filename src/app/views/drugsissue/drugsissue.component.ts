// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-drugsissue',
//   templateUrl: './drugsissue.component.html',
//   styleUrls: ['./drugsissue.component.scss']
// })
// export class DrugsissueComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../service.service';
// import { ServiceService } from '../../service.service';

 @Component({
    selector: 'app-drugsissue',
    templateUrl: './drugsissue.component.html',
    styleUrls: ['./drugsissue.component.scss']
  })
  export class DrugsissueComponent implements OnInit {
  
  dataSource;
  room_block;
  room_price;
  room_number;
  room_package
  room_id
  @ViewChild('ConfirmAppointment', { static: false }) confirmAppointmentModal: ModalDirective;
  Columns: string[] = ['sn','created','drug_name','prescription','quantity','price','status','action','edit','delete']

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
  
  }
  );

}
Delete(element){
  console.log(element)
  let data={
    id:element.id
  }
  this.service.deleteroom(data).subscribe((res) => {
    console.log("my data",res)
    this.toast.success("deleted successfully","You Have Successfully Deleted")
 this.AvailableRooms()
  }
  );
}
}

