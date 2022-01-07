import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../../service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl,FormArray} from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { element } from 'protractor';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.scss']
})
export class RecordListComponent implements OnInit {
  dataSource;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  Columns: string[] = ['sn','name','national_id','gender','phone','email','create','edit']
  clientForm: FormGroup;
  submitted=false;
  maxDate=new Date();
  @ViewChild('staticModal', { static: false }) staticModal: ModalDirective;
  constructor(public service: ServiceService,public router:Router,public formBuilder:FormBuilder,private toastr: ToastrService,public datePipe:DatePipe) { }
  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      phone: ['',Validators.required],
      first_name: ['', Validators.required],
      other_names: [''],
      last_name: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['',Validators.email],
      dob: ['', Validators.required],
      residence: [''],
      national_id: ['',Validators.required],
      occupation: [''],
      id: ['']
    });
    this.getRecords();

  }
  get f() { return this.clientForm.controls; }
getRecords(){
  this.service.patientRecords().subscribe((res)=>{
    this.dataSource = new MatTableDataSource(res);
    this.dataSource.paginator = this.paginator;
  })
}
rowClick(item){
 this.router.navigate(['/dashboard/reappointments/',item.id])

}
applyFilter(filterValue: string) {
  this.service.SearchPatientRecords(filterValue).subscribe((res)=>{
    console.log(res)
    this.dataSource = new MatTableDataSource(res);
    this.dataSource.paginator = this.paginator;
  })
}
edit(item){
  this.clientForm.patchValue({first_name:item.first_name,last_name:item.last_name,other_names:item.other_names,phone:item.phone,
    dob:new Date(item.dob),gender:item.gender,email:item.email,residence:item.residence,national_id:item.national_id,occupation:item.occupation,id:item.id
  })
  this.staticModal.show();
}
onSave(){
 this.submitted = true;
 let data = this.clientForm.value;
 data.dob = this.datePipe.transform(data.dob,'yyyy-MM-dd');
 this.service.updateClient(data).subscribe((res)=>{
    this.staticModal.hide();
    this.submitted = false;
    this.toastr.success('Successfully updated client','Success');
    this.getRecords();
 })
}



}
