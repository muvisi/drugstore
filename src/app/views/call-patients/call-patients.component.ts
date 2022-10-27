import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { ServiceService } from '../../../service.service';
import dateFormat, { masks } from "dateformat";
import { MatTableDataSource } from '@angular/material/table';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ServiceService } from '../../service.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-call-patients',
  templateUrl: './call-patients.component.html',
  styleUrls: ['./call-patients.component.scss']
})
export class CallPatientsComponent implements OnInit {
  BookRoomForm:FormGroup;
  minDate = new Date();
  submitted = false;

  constructor(private formBuilder:FormBuilder,private route: ActivatedRoute, private service:ServiceService,private toast:ToastrService) { }
  ngOnInit() {
    this.BookRoomForm = this.formBuilder.group({
      Patient_names: ['',Validators.required],
      // Patient_email: ['',Validators.required],
      Patient_age: ['',Validators.required],
     Patient_phone: ['', [Validators.minLength(9),Validators.required]],
      Patient_gender:['',Validators.required],
      date:['',Validators.required],
      time:['',Validators.required],
      id: this.route.snapshot.params.id,
      Patient_email: ['', [Validators.required, Validators.email]],
     
  });
 
  }
  
  // AvailableRooms() {
  //   this.service.getavailablerooms().subscribe((res) => {
  //    this.dataSource = new MatTableDataSource <[]>(res);
  //    this.dataSource.paginator = this.paginator;
  //   }
  //   );

// }


BookpRoom(){
  this.submitted = true;
    // stop here if form is invalid
if (this.BookRoomForm.invalid) {
      return;
  }
else{
 let data=Object.assign(this.BookRoomForm.value)
  console.log(this.BookRoomForm.value)
    this.service.bookroom(data).subscribe((res) => {
      this.toast.success("success","Rooms Booked Successfully")
      this.BookRoomForm.reset()
    //  this.dataSource = new MatTableDataSource <[]>(res);
    //  this.dataSource.paginator = this.paginator;
    }
    );
}
}

get f() { return this.BookRoomForm.controls; }

}
