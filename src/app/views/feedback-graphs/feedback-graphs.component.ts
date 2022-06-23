import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-feedback-graphs',
  templateUrl: './feedback-graphs.component.html',
  styleUrls: ['./feedback-graphs.component.scss']
})
export class FeedbackGraphsComponent implements OnInit {
  dataSourceOutpatient: any={}
  dataSourceOutpatientpositive: any={}
  dataSourceOutpatientnegative: any={}
  dataSourceinpatientpositive: any={}
  dataSourceinpatientnegative: any={}
  dataSourceinpatient: any={}
  inpatientaveragegraphdata: any={}
  outpatientaveragegraphdata: any={}
  averagegraphdata: any={}
  dataSource: any={}
  SurgerydataSource: any={}
  piedataSource: any={}
  RespondentdataSource: any={}
  bookingvspatient: Object;
  dataSources;
  periodres;
 





  positive_dataSource;
  negative_dataSource;
  maternity_dataSource;
  
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
  period_maternity
  period_outpatient;
  date_outpatient;
  outpatient_dataSource;
  surgery_dataSource;
  date_martenity;
  period_surgery;
  date_surgery;
  period_inpatient;
  date_inpatient;
  inpatient_dataSource;
  endpoint;
  selected;
  feedbackperdepartment;
  perioddepart;
  servicegraphdata;


  loading;
  constructor( public service:ServiceService) {
  this.feedbackperdepartment= {
    chart: {
      caption: 'AAR HOSPITAL',
      subCaption: 'Department Averages',
      xAxisName: 'Departments',
      yAxisName: 'Average values',
      numberSuffix: '',
      theme: 'fusion'
    },
    data:[]
  };
  this.servicegraphdata= {
    chart: {
      caption: 'AAR HOSPITAL',
      subCaption: 'Service Averages',
      xAxisName: 'services',
      yAxisName: 'Average values',
      numberSuffix: '',
      theme: 'fusion'
    },
    data:[]
  };

  this.averagegraphdata= {
    chart: {
      caption: 'AAR HOSPITAL',
      subCaption: 'Category Averages',
      xAxisName: 'Departments',
      yAxisName: 'Avg',
      numberSuffix: '',
      theme: 'fusion'
    },
    data:[]
  };
 
  this.dataSource= {
    chart: {
      caption: 'AAR HOSPITAL',
      subCaption: ' Total Respondents',
      xAxisName: 'count',
      yAxisName: 'Average',
      numberSuffix: '',
      theme: 'fusion'
    },
    data:[]
  };



 
 

 
 
}


  ngOnInit() {
    this.getFeedbacksGraph();
  
    this.getFeedbacksgraphaverage();
    this.getFeedbackperdepartment();
    this.getFeedbackservice();
 
  }
  periodChangeddepartment(){
    let data={
      period:this.perioddepart
    }
    console.log('department',data)
    this.service.AverangeFeedbacksDepartment(data).subscribe(
      datas => {
        
        this.feedbackperdepartment.data =datas.data
  console.log(datas)
        
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );


  }
  periodChanged(){
    console.log('period',this.periodres)
    let data={
      period:this.periodres
    }
    // this.periodres
    this.service.surgeryperiodfilter(data).subscribe(
      datas => {
        
        this.averagegraphdata.data =datas.data
          console.log("Surgery average",this.averagegraphdata.data )
        
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
    

  }
  getFeedbackservice(){
  
    this.service.getFeedbackservice().subscribe(
      datas => {
        
        this.servicegraphdata.data =datas.data
  
        
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
    }
 
getFeedbacksgraphaverage(){
  let data={
    period:this.periodres
  }
  this.service.feedbacksgraphaverage(data).subscribe(
    datas => {
      
      this.averagegraphdata.data =datas.data

      
    },
   
    err => console.error(err),
   
    () => console.log('There is an error')
  );
  }


  getFeedbackperdepartment(){
    let data={
      period:this.perioddepart
    }
  this.service.AverangeFeedbacksDepartment(data).subscribe(
    datas => {
      
      this.feedbackperdepartment.data =datas.data

      
    },
   
    err => console.error(err),
   
    () => console.log('There is an error')
  );
}


 
 

getFeedbacksGraph() {
  this.service.feedbacksgraph().subscribe(
    datas=> {
      console.log(datas)
      this.dataSource.data=datas.data
      
    },
   
    err => console.error(err),
   
    () => console.log('There is an error')
  );
}


}
