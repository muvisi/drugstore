import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../service.service'

@Component({
  selector: 'app-covidrevenues',
  templateUrl: './covidrevenues.component.html',
  styleUrls: ['./covidrevenues.component.scss']
})
export class CovidrevenuesComponent implements OnInit {

  dataSource;
  appointmentsList;
  loading=false;
  code;
  appointmentdate;
  mpesa;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  Columns: string[] = ['sn','payer','code','date','time','amount']
  constructor(public service:ServiceService,public toastr: ToastrService,public router:Router) { }
  ngOnInit() {
   
    this.code="";
    this.getPayments();

  }
  
  getPayments(){
    // this.loading=true;
    this.service.getRevenues().subscribe((res)=>{
      this.loading=false;
      this.mpesa=res.results
      this.mpesa = new MatTableDataSource(res);
      this.mpesa.paginator = this.paginator;
    })
  }
 
  // applyFilters(filterValue: string) {
  //   this.service.searchtest(filterValue).subscribe((res)=>{
  //     console.log("RESP",res);
  //     this.mpesa = new MatTableDataSource(res);
  //     this.mpesa=res.results
  //     this.mpesa.paginator = this.paginator;
  //   })
  // }
  applyFilters(filterValue: string) {
    this.service.searchcode(filterValue).subscribe((res)=>{
      console.log("RESP",res);
      this.mpesa = new MatTableDataSource(res.results);
      this.mpesa=res.results
      // this.mpesa.paginator = this.paginator;
    })
  }
  applyFilter(filterValue: string) {
    this.service.searchcode(filterValue).subscribe((res)=>{
      console.log("RESP",res);
      this.mpesa = new MatTableDataSource(res);
      // this.appointmentsList=res.results
      this.dataSource.paginator = this.paginator;
    })
  }
  
 
}

