import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../../service.service';

@Component({
  selector: 'app-book-room',
  templateUrl: './book-room.component.html',
  styleUrls: ['./book-room.component.scss']
})
export class BookRoomComponent implements OnInit {
  room:any ={};
  dataSource;
  bookingForm: FormGroup;
  date = new Date();
  counsolers =[];
  transactions =[];
  submitted=false;
  @ViewChild('staticModal', { static: false }) staticModal: ModalDirective;
  paymentForm: FormGroup;
  constructor(public service:ServiceService,private formBuilder: FormBuilder,public toastr:ToastrService,public router:Router,private route: ActivatedRoute) { }
  ngOnInit() {
    this.getRoom(this.route.snapshot.params.id);
    this.getCounselors();
    this.bookingForm = this.formBuilder.group({
      name: ['', Validators.required],
      cost: ['', Validators.required],
      description: ['', Validators.required],
      floor: ['', Validators.required],
      type_name: ['', Validators.required],
      time: ['', Validators.required],
      no: [''],
      amount: ['', Validators.required],
      date: ['', Validators.required],
      staff: ['', Validators.required],
      payment_type: ['', Validators.required]
    }
    
      );
      this.paymentForm = this.formBuilder.group({
        mobile: ['', Validators.required],
        amount: ['', Validators.required],
        acc: ['kapc', Validators.required]
      })
  }
  get f() { return this.bookingForm.controls; }
  get p() { return this.paymentForm.controls; }
  getRoom(id) {
    this.service.getRoom(id).subscribe((res) => {
      this.room =res
      this.bookingForm.patchValue({name:this.room.name,description:this.room.description,cost:this.room.cost,floor:this.room.floor_name,status:this.room.status,type_name:this.room.type_name})
    });
  }

onBook(){
let data = this.bookingForm.value
this.submitted = true;
if(data.cost < data.amount){
  this.toastr.error("Amount should be "+ data.cost,"Error")
  return
}
data.id = this.route.snapshot.params.id
this.service.reservation(data).subscribe((res)=>{
// this.bookingForm.reset();  
this.toastr.success("Successfully booked a room","Success")
this.router.navigateByUrl('/dashboard/rooms/list')
},(err)=>{
  this.toastr.error(err.error.error,"Error")
  this.submitted = false;
})
}
open(item){
  this.bookingForm.patchValue({room:item.id});
}
onPayment(){
console.log("dawa")
}
getCounselors(){
  this.service.getAppointmentUsers().subscribe((res)=>{
    this.counsolers = res.results;
  })
}
mpesa(){
  this.paymentForm.patchValue({amount:this.bookingForm.get('cost').value})
  this.staticModal.show();
}
typeaheadOnSelect(item){
  this.bookingForm.patchValue({amount:item.item.amount,no:item.item.description})
}

rowClick(item){
  this.router.navigate(['/dashboard/book-room/',item.id])
}

searchTransaction(text){
  this.service.mpesaAppointmentPayment(text).subscribe((res)=>{
    this.transactions = res.results;
  })
}
timeChange(item){
let date = new Date(this.bookingForm.get('date').value)
console.log(date)

console.log(item)
}

}
