import {Component, OnInit, ViewChild} from '@angular/core';
import { ServiceService } from '../../../service.service';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.scss']
})
export class PharmacyComponent implements OnInit {
  prescriptions = [];
  text;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  dataSource;
  Columns: string[] = ['sn','name','patient_no','visit_no','national_id','priority','phone','status','date','time']
  constructor(private service: ServiceService, private navCtrl: NgxNavigationWithDataComponent) { }

  ngOnInit() {
    this.patientsList();
  }
  patientsList() {
    this.service.patientVisit().subscribe((res) => {
     this.dataSource = new MatTableDataSource <[]>(res.results);
     this.dataSource.paginator = this.paginator;
    }
    );
 }
 onVisit(item){
   console.log(item);
   this.navCtrl.navigate('/dashboard/pharmacy/patient-prescription',{data : item})
 }
 search(filterValue: string){
  this.dataSource.filter = filterValue.trim().toLowerCase();
 }
}
