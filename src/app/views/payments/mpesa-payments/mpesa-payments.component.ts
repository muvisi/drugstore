
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ServiceService } from '../../../service.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { UtilizePaymentModal } from './utilize.payment.modal';
@Component({
  selector: 'app-mpesa-payments',
  templateUrl: './mpesa-payments.component.html',
  styleUrls: ['./mpesa-payments.component.scss']
})
export class MpesaPaymentsComponent implements OnInit {

    displayedColumns: string[] = ['sn','TransactionDate','PhoneNumber','Name', 'MpesaReceiptNumber', 'Amount','type','Status'];
    dataSource;
    data:any={};
    max = new Date()
    @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
    constructor(public service:ServiceService,public datePipe:DatePipe,private modalService: NgbModal) { }
    ngOnInit() {
      this.getPayments();
   
    }


   getPayments(){
     this.service.getPayments().subscribe((res)=>{
       this.dataSource = new MatTableDataSource(res);
       this.dataSource.paginator = this.paginator;
     })
   }
   dateFilter(){
     this.data.start_date=this.datePipe.transform(this.data.start_date,'yyyy-MM-dd');
     this.data.end_date=this.datePipe.transform(this.data.end_date,'yyyy-MM-dd');
     console.log(this.data);
     this.service.paymentsDateFilter(this.data).subscribe((res)=>{
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
  
   utilizePayment(item){
    const modalRef =this.modalService.open(UtilizePaymentModal, {size: 'lg'});
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.utilizeEmitter.subscribe((resp) => {
      console.log(resp);
      item.status=false;
      })
   }
  
  
  }
  