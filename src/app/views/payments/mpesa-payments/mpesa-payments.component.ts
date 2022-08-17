
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ServiceService } from '../../../service.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { UtilizePaymentModal } from './utilize.payment.modal';
import { UtilizationsModal } from './utilizations.modal';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-mpesa-payments',
  templateUrl: './mpesa-payments.component.html',
  styleUrls: ['./mpesa-payments.component.scss']
})
export class MpesaPaymentsComponent implements OnInit {
  displayedColumns3: string[] = ['sn','TransactionDate','PhoneNumber','Name', 'MpesaReceiptNumber', 'Amount','type','department'];
    displayedColumns1: string[] = ['sn','TransactionDate','PhoneNumber','Name', 'MpesaReceiptNumber', 'Amount','type'];
    dataSource3;
    dataSource2;
    endpoint;
    data3:any={};
    data2:any={};
    displayedColumns: string[] = ['sn','TransactionDate','PhoneNumber','Name', 'MpesaReceiptNumber', 'Amount','type','Status'];
    dataSource;
    data:any={};
    max = new Date()
    @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  loading: boolean;
    constructor(public service:ServiceService,public datePipe:DatePipe,private modalService: NgbModal,private toastr:ToastrService) { }
    ngOnInit() {
      this.getPayments();
      this.getEdpoint();
      this.getUtilizedPayments()
      this.getNotUtilizedPayments()
   
    }
    getUtilizedPayments(){
      this.service.getUtilizePayments().subscribe((res)=>{
        this.dataSource3 = new MatTableDataSource(res);
        this.dataSource3.paginator = this.paginator;
      })
    }
    getNotUtilizedPayments(){
     this.service.getNotUtilizePayments().subscribe((res)=>{
       this.dataSource2 = new MatTableDataSource(res);
       this.dataSource2.paginator = this.paginator;
     })
   }

   getPayments(){
    this.loading=true;
     this.service.getPayments().subscribe((res)=>{
      this.loading=false;
       this.dataSource = new MatTableDataSource(res);
       this.dataSource.paginator = this.paginator;
     },(err)=>{
      this.loading=false;
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
   dateFilterUtilized(){
     this.data3.start_date=this.datePipe.transform(this.data3.start_date,'yyyy-MM-dd');
     this.data3.end_date=this.datePipe.transform(this.data3.end_date,'yyyy-MM-dd');
     console.log(this.data3);
     this.loading=true;
     this.service.paymentsDateFilterUtilized(this.data3).subscribe((res)=>{
      this.loading=false;
      this.dataSource3 = new MatTableDataSource(res);
      this.dataSource3.paginator = this.paginator;
     },(err)=>{  this.loading=false;})
   }
   dateFilterNotUtilized(){
    this.data2.start_date=this.datePipe.transform(this.data2.start_date,'yyyy-MM-dd');
    this.data2.end_date=this.datePipe.transform(this.data2.end_date,'yyyy-MM-dd');
    console.log(this.data2);
    this.service.paymentsDateFilterNotUtilized(this.data2).subscribe((res)=>{
     this.dataSource2 = new MatTableDataSource(res);
     this.dataSource2.paginator = this.paginator;
    })
  }
   applyFilter(text){
     console.log(text);
     this.service.searchPayments(text).subscribe((res)=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
     })
   }
   applyFilter1(text){
    console.log(text);
    this.service.searchPaymentsUtilized(text).subscribe((res)=>{
     this.dataSource3 = new MatTableDataSource(res);
     this.dataSource3.paginator = this.paginator;
    })
  }
  applyFilter2(text){
   console.log(text);
   this.service.searchPaymentsNotUtilized(text).subscribe((res)=>{
    this.dataSource2 = new MatTableDataSource(res);
    this.dataSource2.paginator = this.paginator;
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
   showUtilizations(item){
    console.log("opening");
    const modalRef =this.modalService.open(UtilizationsModal, {size: 'lg'});
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.utilizeEmitter.subscribe((resp) => {
      console.log(resp);
      item.status=false;
      })
   }
  refreshPayments(){
    this.loading=true;
    this.service.refreshPayments().subscribe((res)=>{
      this.loading=false;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    },(err)=>{
      this.loading=false;
    })
  }
  getEdpoint(){
    this.endpoint= this.service.getendpoint()
  console.log("URL IS",this.endpoint)
  }
  SendFeedbackSMS(){
    this.refreshPayments()
    this.service.SendSmsMpesa().subscribe((res)=>{
      this.loading=false;
      this.toastr.success("Successfully Feedback send")
      //  this.dataSource = new MatTableDataSource(res);
      //  this.dataSource.paginator = this.paginator;
     },(err)=>{
      this.loading=false;
      this.toastr.warning("Please Refresh the Mpesa First")

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

  
  }
  