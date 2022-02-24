import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ServiceService } from '../../../service.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  displayedColumns: string[] = ['sn','TransactionDate','PhoneNumber', 'MpesaReceiptNumber', 'Amount','Status'];
  dataSource;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  constructor(public service:ServiceService) { }
  ngOnInit() {
    this.getPayments();
  }
 getPayments(){
   this.service.getPayments().subscribe((res)=>{
     this.dataSource = new MatTableDataSource(res);
     this.dataSource.paginator = this.paginator;
   })
 }
 applyFilter(text){
   console.log(text);
   this.service.searchPayments(text).subscribe((res)=>{
    this.dataSource = new MatTableDataSource(res);
    this.dataSource.paginator = this.paginator;
   })
 }
}
