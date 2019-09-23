import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from '../../../service.service';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
@Component({
  selector: 'app-lab-orders',
  templateUrl: './lab-orders.component.html',
  styleUrls: ['./lab-orders.component.scss']
})
export class LabOrdersComponent implements OnInit {

  displayedColumns: string[] = ['sample_no', 'created', 'patient', 'visit', 'status', 'name'];
  dataSource;
  status;

  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;

  constructor( public service: ServiceService, public navCtrl: NgxNavigationWithDataComponent) {
    this.status = this.navCtrl.get('status');
    console.log(this.status);
   }

  ngOnInit() {
    this.requests();
  }
  requests() {
    this.service.labOrders(this.status).subscribe((res) => {
    console.log(res.results);
    this.dataSource = new MatTableDataSource <[]>(res.results);
    this.dataSource.paginator = this.paginator;
    });
  }
applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  view(data) {
    console.log(data);
  }
  rowClick(item) {
    this.navCtrl.navigate('/dashboard/sample-orders/', {sample: item});
  }
}
