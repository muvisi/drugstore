import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ServiceService } from '../../../service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.scss'],
  providers: [DatePipe]
})


export class RegisterPatientComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('staticModal', { static: false }) staticModal: ModalDirective;
  searchText;
  dataSource;
  patient:any = {};
  Columns: string[] = ['sn','name','patient_no','dob','national_id','phone','gender','edit','new_visit']
  constructor(private datePipe: DatePipe, public service: ServiceService, public navCtrl: NgxNavigationWithDataComponent) {

  }

  ngOnInit() {

  this.encounter();
  }
  search(filterValue: string) {
    if(filterValue !=''){
      this.service.SearchPatientRecords(filterValue).subscribe((res)=>{
        this.dataSource = new MatTableDataSource <[]>(res.results);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        });
    }else {
      this.encounter()
    }
  }
revisit(item)  {
  this.patient = item;
  this.staticModal.show();
//  this.navCtrl.navigate('/dashboard/patients/new-patient/', { revisit: item});
}
appointment(){
  this.navCtrl.navigate('/dashboard/patients/calendar/');
}
edit(item){
  this.navCtrl.navigate('/dashboard/patients/edit/', { data: item});

}
encounter() {
  this.service.patientRecords().subscribe((res) => {
    this.dataSource = new MatTableDataSource <[]>(res.results);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });
  }
sendVisit(){
  console.log(this.patient);
  this.service.revisit(this.patient).subscribe((res)=>{
    this.navCtrl.navigate('/dashboard/patients/bill-patient', { data:res.visit_no });
  })
}
}
