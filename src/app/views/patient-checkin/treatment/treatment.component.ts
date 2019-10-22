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
  Search() {
    if (this.searchText !== '') {
      this.visits = this.visits.filter(res => {
        return res.patient.national_id.match(this.searchText);
      });
    } else {
      this.ngOnInit();
    }
  }
  SearchName() {
    if (this.name !== '') {
      this.visits = this.visits.filter(res => {
        return res.name.toLowerCase().match(this.name.toLowerCase());
      });
    } else {
      this.ngOnInit();
    }
  }

  SearchVisit() {
    if (this.visitNumber !== '') {
      this.visits = this.visits.filter(res => {
        return res.visit_no.match(this.visitNumber);
      });
    } else {
      this.ngOnInit();
    }
  }

  SearchByPatient() {
    if (this.patientNumber !== '') {
      this.visits = this.visits.filter(res => {
        return res.patient.patient_no.match(this.patientNumber);
      });
    } else {
      this.ngOnInit();
    }
  }

  SearchPhone() {
    if (this.phone !== '') {
      this.visits = this.visits.filter(res => {
        return res.patient.phone.match(this.phone);
      });
    } else {
      this.ngOnInit();
    }
  }
}
