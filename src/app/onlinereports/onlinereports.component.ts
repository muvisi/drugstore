import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-onlinereports',
  templateUrl: './onlinereports.component.html',
  styleUrls: ['./onlinereports.component.scss']
})
export class OnlinereportsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  dataSource;
  dataSource1;
  dataSource2;
  dataSource3;
  loading;
  // idnumber;
  // phonenumber;
  Columns4: string[] = ['sn','first','email','specialist','payment','gender','symptoms']
  Columns3: string[] = ['sn','first','last','email','specialist','payment','gender']
  Columns2: string[] = ['sn','first','last','email','payments','gender','residence']
  Columns: string[] = ['sn','first','email','phone','gender','residence',]
  constructor(public service:ServiceService,public toastr:ToastrService) { }

  ngOnInit() {
    // this.idnumber="";
    // this.phonenumber="";
    this.loading=true
    this.getbooking();
    this.gettransit();
    this.getleft();
    this.getwithin();
    this.loading=false
   
  }
  getbooking() {
   
    this.service.list('').subscribe(
      data => {
        this.dataSource = new MatTableDataSource <[]>(data.booking);
        this.dataSource.paginator = this.paginator;
        this.loading = false;
       
       
        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }
  getwithin() {
   
    this.service.within().subscribe(
      data => {
        this.dataSource3 = new MatTableDataSource <[]>(data.Within);
        this.dataSource3.paginator = this.paginator;
       
        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }
  gettransit() {
   
    this.service.transit().subscribe(
      data => {
        this.dataSource1 = new MatTableDataSource <[]>(data.Transit);
        this.dataSource1.paginator = this.paginator;
      
        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }
  getleft() {
   
    this.service.left().subscribe(
      data => {
        this.dataSource2 = new MatTableDataSource <[]>(data.Left);
        this.dataSource2.paginator = this.paginator;
       
       
        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }
  applyFilter(filterValue: string) {
    this.service.searchbooking(filterValue).subscribe((data)=>{
      console.log("RESP",data);
      this.dataSource = new MatTableDataSource(data);
    
      this.dataSource.paginator = this.paginator;
    })
  }


}