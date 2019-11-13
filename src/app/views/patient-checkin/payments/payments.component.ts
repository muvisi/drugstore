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
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
dataSource;
payments = [];
dataSource1;
maxDate: Date;
date;
cash_date;
displayedColumns: string[] = ['sn','name','patient_no','visit_no','no','amount','created'];
claimsColumns: string[] = ['sn','member','patient_number','visit_number','insurance_company','member_number','visit_type','amount','created'];
  constructor(public service: ServiceService, private router: Router,
    public navCtrl: NgxNavigationWithDataComponent, private toastr: ToastrService,private excelService: ExcelService,private datePipe: DatePipe) {
 
  }

  ngOnInit() {
    this.getBills();
    this.getClaims();
    this.maxDate = new Date();
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
  searchCash(item){
   if(item != null){
    const date = this.datePipe.transform(item,'yyyy-MM-dd')
    this.service.searchInvoice(date).subscribe((res)=>{
     this.tableData(res.results);
    })
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
    this.service.getBills().subscribe((res)=>{
      this.tableData(res.results);
      this.payments = res.results;
    })
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  exportAsXLSX(): void {
    const data = this.payments;
    this.excelService.exportAsExcelFile(data, 'Cash Payemnts');
  }
  tableData(items){
    this.dataSource = new MatTableDataSource(items);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
