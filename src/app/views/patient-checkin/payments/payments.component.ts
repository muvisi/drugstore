import { Component, OnInit, ViewChild} from '@angular/core';
import { ServiceService } from '../../../service.service';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
@ViewChild('passwordModal', {static: true}) passwordModal: ModalDirective;
@ViewChild(MatSort, {static: true}) sort: MatSort;
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
dataSource;
displayedColumns: string[] = ['sn','name','patient_no','visit_no','no','amount','created'];
statuses = [
  {value: '1', viewValue: 'Paid'},
  {value: '0', viewValue: 'Not paid'},
  {value: '2', viewValue: 'Insurance'}
];
  constructor(public service: ServiceService, private router: Router,
    public navCtrl: NgxNavigationWithDataComponent, private toastr: ToastrService) {
 
  }

  ngOnInit() {
    this.getBills();
  }
  getBills(){
    this.service.getBills().subscribe((res)=>{
      this.tableData(res.results);
    })
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  tableData(items){
    this.dataSource = new MatTableDataSource(items);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
