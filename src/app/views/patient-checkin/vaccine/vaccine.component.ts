import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../../../service.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.scss']
})
export class VaccineComponent implements OnInit {
  minDate = new Date()
  date;
  dataSource;
  loading=false;
  selected;
  @ViewChild('staticModal', { static: false }) staticModal: ModalDirective;
  displayedColumns: string[] = ['no','date','name','delete'];
  vaccines: string[] = ['Pfizer vaccine', 'Johnson & Johnson vaccine', 'Moderna vaccine', 'AstraZeneca vaccine', 'Sinopharm BBIBP vaccine'];
  registerForm: FormGroup;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  constructor(private formBuilder: FormBuilder,public service:ServiceService,public datePipe:DatePipe,public toastr:ToastrService){}
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      date: ['', Validators.required],
      names:[[],Validators.required]
  });
 this.getData()
  }
  getData(){
    this.service.getVaccine().subscribe((res)=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
     
       })
  }
  weekendsDatesFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0 && day !== 1 && day !==2 && day !== 3 && day !== 4 && day !== 5;
  }
  onSubmit() {

    if (this.registerForm.invalid) {
        return;
    }
    let data = this.registerForm.value
    data.date = this.datePipe.transform(this.registerForm.get('date').value,'y-M-d')
    this.service.addVaccine(this.registerForm.value).subscribe((res)=>{
    this.toastr.success('Saved Vaccines','Success');
    this.getData();
    this.registerForm.reset({date:'',names:[]});
    this.registerForm.markAsPristine();
    this.registerForm.markAsUntouched();
    })
}
delete(){
  console.log(this.selected);
  this.service.deleteVaccine(this.selected.id).subscribe((res)=>{
  this.toastr.success('Successfully deleted','Success');
  this.getData();
  this.staticModal.hide();
  })
}
}
