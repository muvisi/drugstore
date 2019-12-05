import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../../service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  dataSource;
  Columns: string[] = ['sn','name','patient_no','visit_no','national_id','priority','phone','status','date','time']
  constructor(public service: ServiceService, public navCtrl: NgxNavigationWithDataComponent) { }

  ngOnInit() {
    this.patientsList();

  }
  
  search(filterValue: string) {
    this.service.searchPatient(filterValue).subscribe((res)=>{
    this.dataSource = new MatTableDataSource <[]>(res.results);
    this.dataSource.paginator = this.paginator;
    });
  }
patientsList() {
   this.service.patientVisit().subscribe((res) => {
    this.dataSource = new MatTableDataSource <[]>(res.results);
    this.dataSource.paginator = this.paginator;
   }
   );
}
billPatient(item) {
console.log(item.visit_no);
  this.navCtrl.navigate('/dashboard/patients/bill-patient', { data: item.visit_no});
}
}
