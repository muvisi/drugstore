
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceService } from '../../../service.service';
@Component({
  selector: 'app-mpesa-payment-report',
  templateUrl: './mpesa-payment-report.component.html',
  styleUrls: ['./mpesa-payment-report.component.scss']
})
export class MpesaPaymentReportComponent implements OnInit {
    displayedColumns: string[] = ['sn','TransactionDate','PhoneNumber','Name', 'MpesaReceiptNumber', 'Amount','type','department'];
    displayedColumns1: string[] = ['sn','TransactionDate','PhoneNumber','Name', 'MpesaReceiptNumber', 'Amount','type'];
    dataSource;
    dataSource2;
    endpoint;
    data:any={};
    data2:any={};
    max = new Date()
    @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
    constructor(public service:ServiceService,public datePipe:DatePipe,private modalService: NgbModal) { }
    ngOnInit() {
      this.getPayments();
      this.getPayments2();
      this.getEdpoint()
    }
   getPayments(){
     this.service.getUtilizePayments().subscribe((res)=>{
       this.dataSource = new MatTableDataSource(res);
       this.dataSource.paginator = this.paginator;
     })
   }
   getPayments2(){
    this.service.getNotUtilizePayments().subscribe((res)=>{
      this.dataSource2 = new MatTableDataSource(res);
      this.dataSource2.paginator = this.paginator;
    })
  }
   dateFilter(){
     this.data.start_date=this.datePipe.transform(this.data.start_date,'yyyy-MM-dd');
     this.data.end_date=this.datePipe.transform(this.data.end_date,'yyyy-MM-dd');
     console.log(this.data);
     this.service.paymentsDateFilterUtilized(this.data).subscribe((res)=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
     })
   }
   dateFilter2(){
    this.data2.start_date=this.datePipe.transform(this.data2.start_date,'yyyy-MM-dd');
    this.data2.end_date=this.datePipe.transform(this.data2.end_date,'yyyy-MM-dd');
    console.log(this.data2);
    this.service.paymentsDateFilterNotUtilized(this.data2).subscribe((res)=>{
     this.dataSource = new MatTableDataSource(res);
     this.dataSource.paginator = this.paginator;
    })
  }
   applyFilter1(text){
     console.log(text);
     this.service.searchPaymentsUtilized(text).subscribe((res)=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
     })
   }
   applyFilter2(text){
    console.log(text);
    this.service.searchPaymentsNotUtilized(text).subscribe((res)=>{
     this.dataSource2 = new MatTableDataSource(res);
     this.dataSource2.paginator = this.paginator;
    })
  }
    downloadUtilized(){
      window.open(this.service.getUtilizePaymentsDownloadUrl())
    }
    downloadNotUtilized(){
      window.open(this.service.getNotUtilizePaymentsDownloadUrl())
    }
    dateddownloaddatedNotUtilized(){
      console.log("the end date",this.data2.end_date)
      console.log("start time",this.data2.start_date)
      
      // window.open(this.service.getdatedNotUtilizePaymentsDownloadUrl())
    }
    getEdpoint(){
      this.endpoint= this.service.getendpoint()
    console.log("URL IS",this.endpoint)
    }
    
  }
  