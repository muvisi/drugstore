import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss']
})
export class FeedbacksComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;

  dataSource;
  loading;
  // idnumber;
  phonenumber;
  Columns: string[] = ['sn','date','service','rating','issues','compliments','comments']

  constructor(public service:ServiceService,private toastr:ToastrService) { }
 
 ngOnInit() {
  // this.idnumber="";
 
    this.getFeedbacks();
    // this.loading=true
  }
  getFeedbacks() {
    this.service.feedbacks().subscribe(
      data => {
        this.dataSource = new MatTableDataSource <[]>(data);
        this.dataSource.paginator = this.paginator;
        this.loading = false;
        // this.toastr.success('finished loading Patients');
        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }
  applyFilter(filterValue: string) {
    this.service.searchFor(filterValue).subscribe((data)=>{
      console.log("RESP",data);
      this.dataSource = new MatTableDataSource(data);
      // this.phonenumber=data.list
      this.dataSource.paginator = this.paginator;
    })
  }

}