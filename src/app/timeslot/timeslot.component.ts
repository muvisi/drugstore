
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-timeslot',
  templateUrl: './timeslot.component.html',
  styleUrls: ['./timeslot.component.scss']
})
export class TimeslotComponent implements OnInit {
  
  displayedColumns: string[] = ['no','date','start','end','slots','user','delete'];
  minDate = new Date()
  date;
  selected;
  dataSource;

  @ViewChild('staticModal', { static: false }) staticModal: ModalDirective;
  registerForm: FormGroup;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  constructor(private formBuilder: FormBuilder,public service:ServiceService,public datePipe:DatePipe,public toastr:ToastrService){}
  ngOnInit() {
    this.getData()
  //   this.registerForm = this.formBuilder.group({
  //     date: ['', Validators.required],
  //     start:['',Validators.required],
  //     end:['',Validators.required],
  //     slots:['',Validators.required]
  // });
 

  }
  // data to the table
  getData(){
    this.service.getslots().subscribe((res)=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
     
       })
  }

  // filtering weekends on appointment date
  weekendsDatesFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0 && day !== 1 && day !==2 && day !== 3 && day !== 4 && day !== 5;
  }
 
  onSubmit() {

    if (this.registerForm.invalid) {
        return;
    }
    let data = this.registerForm.value
    console.log(data)
    data.date = this.datePipe.transform(this.registerForm.get('date').value,'y-M-d')
    this.service.timeslot(this.registerForm.value).subscribe((res)=>{
     this.toastr.success('created clots','Success');
    this.getData();
  
     })
     this.registerForm.reset()
}
delete(){
  console.log(this.selected);
  this.service.deleteslot(this.selected.id).subscribe((res)=>{
  this.toastr.success('Successfully deleted','Success');
  this.getData();
  this.staticModal.hide();
  })
}

}
