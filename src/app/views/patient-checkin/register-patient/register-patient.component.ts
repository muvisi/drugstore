import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ServiceService } from '../../../service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.scss'],
  providers: [DatePipe]
})


export class RegisterPatientComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  searchText;
  dataSource;
  Columns: string[] = ['name','patient_no','visit_no','national_id','priority','phone','status','date','time']
  constructor(private datePipe: DatePipe, public service: ServiceService, public navCtrl: NgxNavigationWithDataComponent) {

  }

  ngOnInit() {

  this.encounter();
  }
  search(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 patientDetails(item)  {
this.navCtrl.navigate('/dashboard/patients/treatment', { id: item.visit_no});
}

encounter() {
  this.service.patientVisit().subscribe((res) => {
    this.dataSource = new MatTableDataSource <[]>(res.results);
    this.dataSource.paginator = this.paginator;
  });
  }

}
