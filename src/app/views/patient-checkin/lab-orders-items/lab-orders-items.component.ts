import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from '../../../service.service';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';

@Component({
  selector: 'app-lab-orders-items',
  templateUrl: './lab-orders-items.component.html',
  styleUrls: ['./lab-orders-items.component.scss']
})
export class LabOrdersItemsComponent implements OnInit {
  notes = '';
  displayedColumns: string[] = ['order_number', 'test_name', 'test_code', 'created', 'doctor', 'status', 'patient_no', 'patient_type'];
  dataSource;
  id;
  patient: any = {};
  test: any = {};
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;

  constructor( public service: ServiceService, public navCtrl: NgxNavigationWithDataComponent) {
  this.patient = this.navCtrl.get('sample');
  if (this.patient.id == null) {
    this.navCtrl.navigate('/dashboard/lab-orders/');
  }
   }

  ngOnInit() {
    this.getOrders();
  }
  getOrders() {
    this.service.labOrderItems(this.id).subscribe((res) => {
      console.log(res.results);
      this.dataSource = new MatTableDataSource <[]>(res.results);
      this.dataSource.paginator = this.paginator;
      });
  }
view(item) {
  this.test = item;
  console.log('test', this.test);
}
search(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
}
