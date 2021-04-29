import { Component, OnInit, ViewChild} from '@angular/core';
import { ServiceService } from '../../../service.service';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ExcelService } from '../../../excel.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  providers:[DatePipe]
})
export class PaymentsComponent implements OnInit {
@ViewChild('passwordModal', {static: true}) passwordModal: ModalDirective;
@ViewChild(MatSort, {static: true}) sort: MatSort;
@ViewChild('paginator', {static: true}) paginator: MatPaginator;
@ViewChild('paginator1', {static: true}) paginator1: MatPaginator;
cashSource;
payments = [];
dataSource1;
dataSource;
mpesaSource;
maxDate: Date;
date;
cash_date;
mpesaColumns: string[] = ['sn','name','msisdn','amount','channel','trxref','accountref','status','date'];
displayedColumns: string[] = ['sn','date','amount','trx','client','mobile','name'];
Columns: string[] = ['sn','date','trans_id','name','msisdn','trans_type','amount','status','use']
claimsColumns: string[] = ['sn','member','patient_number','visit_number','insurance_company','member_number','visit_type','amount','created'];
  constructor(public service: ServiceService, private router: Router,
    public navCtrl: NgxNavigationWithDataComponent, private toastr: ToastrService,private excelService: ExcelService,private datePipe: DatePipe) {
 
  }

  ngOnInit() {
    this.getBills();
    this.getClaims();
    this.getMpesa();
    this.maxDate = new Date();
    this.getNcba();
  }
  getNcba(){
    this.service.ncbaAllPayments().subscribe((res)=>{
      this.dataSource = new MatTableDataSource(res.results);
    })
  }
  onDate(date){
    date = this.datePipe.transform(date,'yyyy-MM-dd')
    if(date !=undefined){
      this.service.searchncbaPaymentsByDate(date).subscribe((res)=>{
        this.dataSource = new MatTableDataSource(res);
      })
    }
  }
  searchNbaPhone(text){
    this.service.searchncbaPaymentsByPhone(text).subscribe((res)=>{
      this.dataSource = new MatTableDataSource(res.results);
    })
  }
  getClaims() {
    this.service.getClaims().subscribe((res) => {
      this.claimsData(res.results);
    }
    );
  }
  searchByDate(item){
    if(item != null){
      const date = this.datePipe.transform(item,'yyyy-MM-dd')
      this.service.searchClaims(date).subscribe((res)=>{
       this.claimsData(res.results);
      })
     }else{
       this.getClaims();
     }
  }

  searchCashPhone(text){
   if(text!=undefined){
     this.service.cashPaymentsByPhone(text).subscribe((res)=>{
      this.tableData(res.results);
      this.payments = res.results;
     })
   } 
  }
  searchCash(item){
   if(item != null){
    const date = this.datePipe.transform(item,'yyyy-MM-dd')
    if(date !=undefined){
      this.service.cashPaymentsBydate(date).subscribe((res)=>{
        this.tableData(res);
        this.payments = res;
       })
    }
   }else{
     this.getBills();
   }
  }
  claimsData(items){
    this.dataSource1 = new MatTableDataSource(items);
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }
  getBills(){
    this.service.allCashPayments().subscribe((res)=>{
      this.tableData(res.results);
      this.payments = res.results;
    })
  }

  getMpesa(){
    this.service.mpesa().subscribe((res)=>{
      this.mpesaSource = res.results;
    })
  }

  applyFilter(filterValue: string) {
    this.cashSource.filter = filterValue.trim().toLowerCase();
  }
  exportAsXLSX(): void {
    const data = this.payments;
    this.excelService.exportAsExcelFile(data, 'Cash Payemnts');
  }
  tableData(items){
    this.cashSource = new MatTableDataSource(items);
    this.cashSource.sort = this.sort;
    this.cashSource.paginator = this.paginator;
  }
}
