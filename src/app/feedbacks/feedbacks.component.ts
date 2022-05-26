import { DatePipe } from '@angular/common';
import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../service.service';


// import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss']
})
export class FeedbacksComponent implements OnInit {
  
  
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  dataSource: Object;
  dataSourceOutpatient: Object;
  dataSourceOutpatientpositive: Object;
  dataSourceOutpatientnegative: Object;
  dataSourceinpatientpositive: Object;
  dataSourceinpatientnegative: Object;
  dataSourceinpatient: Object;
  averagegraphdata: Object;
  bookingvspatient: Object;
  dataSources;
  title='Total Feedbacks Count Per Department'
  title1='Total Outpatient Per Department'
  title2='Total Outpatient Positive Per Department'
  title3='Total Inpatient  Per Department'
  title4='Total Inpatient Positive Per Department'
  title5='Total Outpatient Negative Per Department'
  title6='Total Inpatient Negative Per Department'





  positive_dataSource;
  negative_dataSource;
  
  average_dataSource;
  all_dataSource
  date_positive;
  date_negative;
  date_average;
  date_all;
  visit_type_positive;
  visit_type_negative;
  visit_type_average;
  visit_type_all;
  period;
  period2;
  period3;
  period4;
  allpatients;
  withfeedback;
  withoutfeedback;
  




  period_outpatient;
  date_outpatient;
  outpatient_dataSource;



  period_inpatient;
  date_inpatient;
  inpatient_dataSource;

  loading;
  // idnumber;
  phonenumber;
  Columns: string[] = ['sn','date','patient','service','rating','issues','compliments','comments']
  PositiveColumns: string[] = ['sn','date','patient','service','rating','compliments','comments',"visit_type"]
  NegativeColumns: string[] = ['sn','date','patient','service','rating','issues','comments',"visit_type"]
  AverageColumns: string[] = ['sn','date','patient','service','rating','comments',"visit_type"]
  AllColumns: string[] = ['sn','date','patient','service','rating','comments',"visit_type"]
  constructor(public service:ServiceService,private toastr:ToastrService,private datePipe: DatePipe) { 

  // this.dataSource = {
  //   chart: {
  //     caption: 'Countries With Most Oil Reserves [2017-18]',
  //     subCaption: 'In MMbbl = One Million barrels',
  //     xAxisName: 'Country',
  //     yAxisName: 'Reserves (MMbbl)',
  //     numberSuffix: 'K',
  //     theme: 'fusion'
  //   },
    
  // };
}

 
 ngOnInit() {
  // this.idnumber="";
 
    this.getFeedbacksPositive();
    this.getFeedbacksNegative();
    this.getFeedbacksAverage();
    this.getFeedbacksAll();
    this.getFeedbacksOutpatient();
    this.getFeedbacksInpatient();
    this.getFeedbacksGraph();
    this.getFeedbacksGraphOutpatient();
    this.getFeedbacksGraphOutpatientPositive();
    this.getFeedbacksGraphIpatientPositive();
    this.getFeedbacksGraphOuatientNegative();
    this.getFeedbacksGraphIpatientNegative();
    this.getFeedbacksGraphInpatient();
    this.getFeedbacksgraphaverage();
    this.geBookingvsPatientsfeedback();
    // dataFormat: 'json',

    this.bookingvspatient={
      data:[{
        label: "Total Patients Booked",
        value:  this.allpatients
    },
    {
        label: "Total Feedbacks",
        value:this.withfeedback
    },
    {
        label: "No Feedbacks",
        value:this.withoutfeedback
    },
    ]

    }
    console.log('data',this.bookingvspatient)
    
    
  }
  ngAfterViewInit(){

this.date_positive="";
  }
  getFeedbacksPositive() {
    this.service.feedbacks("?category=POSITIVE"+"&period="+this.period).subscribe(
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
  getFeedbacksgraphaverage(){
    this.service.feedbacksgraphaverage().subscribe(
      datas => {
        // console.log("DATA",datas)
        this.averagegraphdata=datas
          console.log("DATA",this.averagegraphdata)
        
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
    }
  getFeedbacksGraphIpatientNegative(){
    this.service.feedbacksgraphinpatientnegative().subscribe(
      data => {
        console.log(data)
        this.dataSourceinpatientnegative=data
        
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
    }
  getFeedbacksGraphOuatientNegative(){
    this.service.feedbacksgraphoutpatientnegative().subscribe(
      data => {
        console.log(data)
        this.dataSourceOutpatientnegative=data
        
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
    }
  getFeedbacksGraphOutpatient(){
  this.service.feedbacksgraphoutpatient().subscribe(
    data => {
      console.log(data)
      this.dataSourceOutpatient=data
      
    },
   
    err => console.error(err),
   
    () => console.log('There is an error')
  );
  }
  getFeedbacksGraphIpatientPositive(){
    this.service.feedbacksgraphinpatientpositive().subscribe(
      data => {
        console.log(data)
        this.dataSourceinpatientpositive=data
        
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
    }
  getFeedbacksGraphOutpatientPositive(){
    this.service.feedbacksgraphoutpatientpositive().subscribe(
      data => {
        console.log(data)
        this.dataSourceOutpatientpositive=data
        
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
    }
    geBookingvsPatientsfeedback(){
      this.service.Bookingsvsfeedbackgraph().subscribe(
        data => {
          console.log('Bookings data',data)
          this.allpatients=data.bookings;
          this.withfeedback=data.withfeedback;
          this.withoutfeedback=data.nofeedback;
  //         allpatients;
  // withfeedback;
  // withoutfeedback;
          
        },
       
        err => console.error(err),
       
        () => console.log('There is an error')
      );
      }
    // Bookingsvsfeedbackgraph()
  getFeedbacksGraphInpatient(){
    this.service.feedbacksgrapinpatient().subscribe(
      data => {
        console.log(data)
        this.dataSourceinpatient=data
        
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
    }
  getFeedbacksGraph() {
    this.service.feedbacksgraph().subscribe(
      data => {
        console.log(data)
        this.dataSource=data
        
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }
  downloadPositive(){
    window.open(this.service.getendpoint()+"api/feedbacks_download/?category=POSITIVE&date="+this.datePipe.transform(this.date_positive,"mediumDate")+"&visit_type="+this.visit_type_positive+"&period="+this.period, "_blank");
  }
  positiveDateSelection(){
    
    this.service.feedbacks("?category=POSITIVE&date="+this.datePipe.transform(this.date_positive,"mediumDate")+"&visit_type="+this.visit_type_positive+"&period="+this.period).subscribe(
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
  periodChangedPositive(){
    this.service.feedbacks("?category=POSITIVE&date="+this.datePipe.transform(this.date_positive,"mediumDate")+"&visit_type="+this.visit_type_positive+"&period="+this.period).subscribe(
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
    this.service.feedbacks("?category=POSITIVE&date="+this.datePipe.transform(this.date_positive,"mediumDate")+"&visit_type="+this.visit_type_positive+"&period="+this.period).subscribe(
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
    this.service.feedbacks("?category=NEGATIVE"+"&period="+this.period2).subscribe(
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
    window.open(this.service.getendpoint()+"api/feedbacks_download/?category=NEGATIVE&date="+this.datePipe.transform(this.date_negative,"mediumDate")+"&visit_type="+this.visit_type_negative+"&period="+this.period2, "_blank");
  }
  negativeDateSelection(){
    
    this.service.feedbacks("?category=NEGATIVE&date="+this.datePipe.transform(this.date_negative,"mediumDate")+"&visit_type="+this.visit_type_negative+"&period="+this.period2).subscribe(
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
  periodChangedNegative(){
    this.service.feedbacks("?category=NEGATIVE&date="+this.datePipe.transform(this.date_negative,"mediumDate")+"&visit_type="+this.visit_type_negative+"&period="+this.period2).subscribe(
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
  negativeVisitTypeChange(){
    this.service.feedbacks("?category=NEGATIVE&date="+this.datePipe.transform(this.date_negative,"mediumDate")+"&visit_type="+this.visit_type_negative+"&period="+this.period2).subscribe(
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

  getFeedbacksAverage() {
    this.service.feedbacks("?category=AVERAGE"+"&period="+this.period3).subscribe(
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
    window.open(this.service.getendpoint()+"api/feedbacks_download/?category=AVERAGE&date="+this.datePipe.transform(this.date_average,"mediumDate")+"&visit_type="+this.visit_type_average+"&period="+this.period3, "_blank");
  }
  averageDateSelection(){
    
    this.service.feedbacks("?category=AVERAGE&date="+this.datePipe.transform(this.date_average,"mediumDate")+"&visit_type="+this.visit_type_average+"&period="+this.period3).subscribe(
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

  averageVisitTypeChange(){
    this.service.feedbacks("?category=AVERAGE&date="+this.datePipe.transform(this.date_average,"mediumDate")+"&visit_type="+this.visit_type_average+"&period="+this.period3).subscribe(
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
  periodChangedAverage(){
    this.service.feedbacks("?category=AVERAGE&date="+this.datePipe.transform(this.date_average,"mediumDate")+"&visit_type="+this.visit_type_average+"&period="+this.period3).subscribe(
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

  getFeedbacksAll() {
    this.service.feedbacks("?period="+this.period4).subscribe(
      data => {
        this.all_dataSource = new MatTableDataSource <[]>(data);
        this.all_dataSource.paginator = this.paginator;
        this.loading = false;
        // this.toastr.success('finished loading Patients');
        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }
  downloadAll(){
    window.open(this.service.getendpoint()+"api/feedbacks_download/?date="+this.datePipe.transform(this.date_all,"mediumDate")+"&visit_type="+this.visit_type_all+"&period="+this.period4, "_blank");
  }

  allDateSelection(){
    
    this.service.feedbacks("?date="+this.datePipe.transform(this.date_all,"mediumDate")+"&visit_type="+this.visit_type_all+"&period="+this.period4).subscribe(
      data => {
        this.all_dataSource = new MatTableDataSource <[]>(data);
        this.all_dataSource.paginator = this.paginator;
        this.loading = false;
        // this.toastr.success('finished loading Patients');
        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }
  allVisitTypeChange(){
    this.service.feedbacks("?date="+this.datePipe.transform(this.date_all,"mediumDate")+"&visit_type="+this.visit_type_all+"&period="+this.period4).subscribe(
      data => {
        this.all_dataSource = new MatTableDataSource <[]>(data);
        this.all_dataSource.paginator = this.paginator;
        this.loading = false;
        // this.toastr.success('finished loading Patients');
        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }
  periodChangedAll(){
    this.service.feedbacks("?date="+this.datePipe.transform(this.date_all,"mediumDate")+"&visit_type="+this.visit_type_all+"&period="+this.period4).subscribe(
      data => {
        this.all_dataSource = new MatTableDataSource <[]>(data);
        this.all_dataSource.paginator = this.paginator;
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

  getFeedbacksOutpatient() {
    this.service.feedbacks("?period="+this.period_outpatient+"&visit_type=OUTPATIENT").subscribe(
      data => {
        this.outpatient_dataSource = new MatTableDataSource <[]>(data);
        this.outpatient_dataSource.paginator = this.paginator;
        this.loading = false;
        // this.toastr.success('finished loading Patients');
        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }

  periodChangedOutpatient(){
    this.service.feedbacks("?date="+this.datePipe.transform(this.date_outpatient,"mediumDate")+"&visit_type=OUTPATIENT&period="+this.period_outpatient).subscribe(
      data => {
        this.outpatient_dataSource = new MatTableDataSource <[]>(data);
        this.outpatient_dataSource.paginator = this.paginator;
        this.loading = false;
        // this.toastr.success('finished loading Patients');
        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }

  outPatientDateSelection(){
    this.service.feedbacks("?date="+this.datePipe.transform(this.date_outpatient,"mediumDate")+"&visit_type=OUTPATIENT&period="+this.period_outpatient).subscribe(
      data => {
        this.outpatient_dataSource = new MatTableDataSource <[]>(data);
        this.outpatient_dataSource.paginator = this.paginator;
        this.loading = false;
        // this.toastr.success('finished loading Patients');
        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }

  downloadOutpatient(){
    window.open(this.service.getendpoint()+"api/feedbacks_download/?date="+this.datePipe.transform(this.date_outpatient,"mediumDate")+"&visit_type=OUTPATIENT&period="+this.period_outpatient, "_blank");
  }



  getFeedbacksInpatient() {
    this.service.feedbacks("?period="+this.period_inpatient+"&visit_type=INPATIENT").subscribe(
      data => {
        this.inpatient_dataSource = new MatTableDataSource <[]>(data);
        this.inpatient_dataSource.paginator = this.paginator;
        this.loading = false;
        // this.toastr.success('finished loading Patients');
        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }

  periodChangedInpatient(){
    this.service.feedbacks("?date="+this.datePipe.transform(this.date_inpatient,"mediumDate")+"&visit_type=INPATIENT&period="+this.period_inpatient).subscribe(
      data => {
        this.inpatient_dataSource = new MatTableDataSource <[]>(data);
        this.inpatient_dataSource.paginator = this.paginator;
        this.loading = false;
        // this.toastr.success('finished loading Patients');
        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }

  inPatientDateSelection(){
    this.service.feedbacks("?date="+this.datePipe.transform(this.date_inpatient,"mediumDate")+"&visit_type=INPATIENT&period="+this.period_inpatient).subscribe(
      data => {
        this.inpatient_dataSource = new MatTableDataSource <[]>(data);
        this.inpatient_dataSource.paginator = this.paginator;
        this.loading = false;
        // this.toastr.success('finished loading Patients');
        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }

  downloadInpatient(){
    window.open(this.service.getendpoint()+"api/feedbacks_download/?date="+this.datePipe.transform(this.date_inpatient,"mediumDate")+"&visit_type=INPATIENT&period="+this.period_inpatient, "_blank");
  }
 
}