import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-feedback-graphs',
  templateUrl: './feedback-graphs.component.html',
  styleUrls: ['./feedback-graphs.component.scss']
})
export class FeedbackGraphsComponent implements OnInit {
  dataSource
  Columns: string[] = ['sn','created','room_number','room_block','room_package','room_price','boarding_package','status','action','pay']

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

}
