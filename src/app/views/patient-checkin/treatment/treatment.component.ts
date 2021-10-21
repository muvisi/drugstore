import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../../service.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { MatPaginator } from '@angular/material';


@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.scss']
})
export class TreatmentComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource;
  visits;
  name;
  patientNumber;
  visitNumber;
  searchText;
  phone;
  visit_no;
  displayedColumns:string[]=['sn','name','patient_no','visit_no','national_id','priority','phone','check_in','visit_type','status']
  constructor(public service: ServiceService , public navCtrl: NgxNavigationWithDataComponent) { }

  ngOnInit() {
    this.visits = [];
    this.getPatients();
  }
getPatients() {
  this.service.getTreatments().subscribe((res) => {
    this.visits = res.results;
    this.dataSource = new MatTableDataSource(res.results);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  });
}
treat(item) {

  this.navCtrl.navigate('/dashboard/patients/treatment', { id: item.visit_no});

}
applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
}
