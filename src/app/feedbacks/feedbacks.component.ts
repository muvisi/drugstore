import { DatePipe } from '@angular/common';
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

  positive_dataSource;
  negative_dataSource
  average_dataSource
  date_positive;
  date_negative;
  date_average;
  visit_type_positive;
  visit_type_negative;
  visit_type_average;
  
  loading;
  // idnumber;
  phonenumber;
  Columns: string[] = ['sn','date','patient','service','rating','issues','compliments','comments']
  PositiveColumns: string[] = ['sn','date','patient','service','rating','compliments','comments',"visit_type"]
  NegativeColumns: string[] = ['sn','date','patient','service','rating','issues','comments',"visit_type"]
  AverageColumns: string[] = ['sn','date','patient','service','rating','comments',"visit_type"]
  constructor(public service:ServiceService,private toastr:ToastrService,private datePipe: DatePipe) { }
 
 ngOnInit() {
  // this.idnumber="";
 
    this.getFeedbacksPositive();
    this.getFeedbacksNegative();
    this.getFeedbacksAverage();
    // this.loading=true
  }
  ngAfterViewInit(){

this.date_positive="";
  }
  getFeedbacksPositive() {
    this.service.feedbacks("?category=POSITIVE").subscribe(
      data => {
        this.positive_dataSource = new MatTableDataSource <[]>(data);
        this.positive_dataSource.paginator = this.paginator;
        this.loading = false;
        // this.toastr.success('finished loading Patients');
        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }
  downloadPositive(){
    window.open(this.service.getendpoint()+"api/feedbacks_download/?category=POSITIVE&date="+this.datePipe.transform(this.date_positive,"mediumDate")+"&visit_type="+this.visit_type_positive, "_blank");
  }
  positiveDateSelection(){
    
    this.service.feedbacks("?category=POSITIVE&date="+this.datePipe.transform(this.date_positive,"mediumDate")+"&visit_type="+this.visit_type_positive).subscribe(
      data => {
        this.positive_dataSource = new MatTableDataSource <[]>(data);
        this.positive_dataSource.paginator = this.paginator;
        this.loading = false;
        // this.toastr.success('finished loading Patients');
        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }
  positiveVisitTypeChange(){
    this.service.feedbacks("?category=POSITIVE&date="+this.datePipe.transform(this.date_positive,"mediumDate")+"&visit_type="+this.visit_type_positive).subscribe(
      data => {
        this.positive_dataSource = new MatTableDataSource <[]>(data);
        this.positive_dataSource.paginator = this.paginator;
        this.loading = false;
        // this.toastr.success('finished loading Patients');
        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );    
  }
  getFeedbacksNegative() {
    this.service.feedbacks("?category=NEGATIVE").subscribe(
      data => {
        this.negative_dataSource = new MatTableDataSource <[]>(data);
        this.negative_dataSource.paginator = this.paginator;
        this.loading = false;
        // this.toastr.success('finished loading Patients');
        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }
  downloadNegative(){
    window.open(this.service.getendpoint()+"api/feedbacks_download/?category=NEGATIVE&date="+this.datePipe.transform(this.date_negative,"mediumDate")+"&visit_type="+this.visit_type_negative, "_blank");
  }
  negativeDateSelection(){
    
    this.service.feedbacks("?category=NEGATIVE&date="+this.datePipe.transform(this.date_negative,"mediumDate")+"&visit_type="+this.visit_type_negative).subscribe(
      data => {
        this.positive_dataSource = new MatTableDataSource <[]>(data);
        this.positive_dataSource.paginator = this.paginator;
        this.loading = false;
        // this.toastr.success('finished loading Patients');
        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }
  negativeVisitTypeChange(){
    this.service.feedbacks("?category=NEGATIVE&date="+this.datePipe.transform(this.date_negative,"mediumDate")+"&visit_type="+this.visit_type_negative).subscribe(
      data => {
        this.positive_dataSource = new MatTableDataSource <[]>(data);
        this.positive_dataSource.paginator = this.paginator;
        this.loading = false;
        // this.toastr.success('finished loading Patients');
        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }

  getFeedbacksAverage() {
    this.service.feedbacks("?category=AVERAGE").subscribe(
      data => {
        this.average_dataSource = new MatTableDataSource <[]>(data);
        this.average_dataSource.paginator = this.paginator;
        this.loading = false;
        // this.toastr.success('finished loading Patients');
        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }
  downloadAverage(){
    window.open(this.service.getendpoint()+"api/feedbacks_download/?category=AVERAGE&date="+this.datePipe.transform(this.date_average,"mediumDate")+"&visit_type="+this.visit_type_average, "_blank");
  }
  averageDateSelection(){
    
    this.service.feedbacks("?category=AVERAGE&date="+this.datePipe.transform(this.date_average,"mediumDate")+"&visit_type="+this.visit_type_average).subscribe(
      data => {
        this.positive_dataSource = new MatTableDataSource <[]>(data);
        this.positive_dataSource.paginator = this.paginator;
        this.loading = false;
        // this.toastr.success('finished loading Patients');
        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }

  averageVisitTypeChange(){
    this.service.feedbacks("?category=AVERAGE&date="+this.datePipe.transform(this.date_average,"mediumDate")+"&visit_type="+this.visit_type_average).subscribe(
      data => {
        this.positive_dataSource = new MatTableDataSource <[]>(data);
        this.positive_dataSource.paginator = this.paginator;
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
      this.positive_dataSource = new MatTableDataSource(data);
      // this.phonenumber=data.list
      this.positive_dataSource.paginator = this.paginator;
    })
  }

}