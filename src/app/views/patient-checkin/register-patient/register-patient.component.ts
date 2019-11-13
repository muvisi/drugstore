import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ServiceService } from '../../../service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.scss'],
  providers: [DatePipe]
})


export class RegisterPatientComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  searchText;
  dataSource;
  Columns: string[] = ['sn','name','patient_no','visit_no','national_id','priority','phone','status','date','time','edit','referral','new_visit','appointment']
  constructor(private datePipe: DatePipe, public service: ServiceService, public navCtrl: NgxNavigationWithDataComponent) {

  }

  ngOnInit() {

  this.encounter();
  }
  search(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
revisit(item)  {
 this.navCtrl.navigate('/dashboard/patients/new-patient/', { revisit: item.patient});
}
appointment(){
  this.navCtrl.navigate('/dashboard/patients/calendar/');
}
edit(item){
  this.navCtrl.navigate('/dashboard/patients/edit/', { data: item.patient});

}
encounter() {
  this.service.patientVisit().subscribe((res) => {
    this.dataSource = new MatTableDataSource <[]>(res.results);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });
  }

}
