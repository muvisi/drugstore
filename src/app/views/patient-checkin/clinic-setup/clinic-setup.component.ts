
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import { ServiceService } from '../../../service.service';
// import * as moment from 'moment';
// import { ServiceService } from '../service.service';

@Component({
  selector: 'app-clinic-setup',
  templateUrl: './clinic-setup.component.html',
  styleUrls: ['./clinic-setup.component.scss']
})
export class ClinicSetupComponent implements OnInit {

  displayedColumns: string[] = ['no','date','start','end','clinic','week','user','delete'];
  minDate = new Date()
  date;
  selected;
  dataSource;
  MONTHS=[];
  CLINIC_DATA;
  WEEK_DAYS=[
    {day:"Monday"},
    {day:"Tuesday"},
    {day:"Wednesday"},
    {day:"Thursday"},
    {day:"Friday"},
    {day:"Saturday"},
    {day:"Sunday"},
]



  @ViewChild('staticModal', { static: false }) staticModal: ModalDirective;
  registerForm: FormGroup;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  constructor(private formBuilder: FormBuilder,public service:ServiceService,public datePipe:DatePipe,public toastr:ToastrService){}
  ngOnInit() {
    this.getData()
    this. getdepartments()
    
  
    this.registerForm = this.formBuilder.group({
      date: ['', Validators.required],
      clinic: [''],
      
      week: [''],
      start:['',Validators.required],
      end:['',Validators.required],
      // comment:['']
  });
 

  }
  // data to the table
  getData(){
    this.service.getClinics().subscribe((res)=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
     
       })
  }
  getdepartments() {
    this.service.getdepartment().subscribe(
      data => {
        this.CLINIC_DATA=data
        // console.log("CLINIC_DATA",this.CLINIC_DATA)
        
        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }
 
  onSubmitted() {
    if (this.registerForm.invalid) {
        return;
    }
    let data = this.registerForm.value
    console.log("RESP DATA",data)
    data.date = this.datePipe.transform(this.registerForm.get('date').value,'y-M-d')
    this.service.clinicsetup(this.registerForm.value).subscribe((res)=>{
     this.toastr.success('created clinic','Success');
    this.getData();
  
     })
     this.registerForm.reset()
}
delete(){
  console.log(this.selected);
  this.service.deleteclinic(this.selected.id).subscribe((res)=>{
  this.toastr.success('Successfully deleted','Success');
  this.getData();
  this.staticModal.hide();
  })
}

}