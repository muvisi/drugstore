import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../../service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { Router } from '@angular/router';
@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.scss']
})
export class RecordListComponent implements OnInit {
  dataSource;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  Columns: string[] = ['sn','first_name','other_names','last_name','national_id','gender','phone','email','residence','create']
  constructor(public service: ServiceService,public router:Router) { }
  ngOnInit() {
    this.getRecords();
  }
getRecords(){
  this.service.patientRecords().subscribe((res)=>{
    this.dataSource = new MatTableDataSource(res.results);
    this.dataSource.paginator = this.paginator;
  })
}
rowClick(item){
 this.router.navigate(['/dashboard/reappointments/',item.id])

}
applyFilter(filterValue: string) {
  this.service.SearchPatientRecords(filterValue).subscribe((res)=>{
    this.dataSource = new MatTableDataSource(res.results);
    this.dataSource.paginator = this.paginator;
  })
}

}
