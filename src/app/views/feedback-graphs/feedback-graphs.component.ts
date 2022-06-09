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
  RespondentdataSource: any={}
  bookingvspatient: Object;
  dataSources;
 





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

  loading;
  constructor( public service:ServiceService) {
  this.averagegraphdata= {
    chart: {
      caption: 'AAR HOSPITAL',
      subCaption: 'All Feedback Averages',
      xAxisName: 'Departments',
      yAxisName: 'Average values',
      numberSuffix: '',
      theme: 'fusion'
    },
    data:[]
  };
  this.outpatientaveragegraphdata= {
    chart: {
      caption: 'AAR HOSPITAL',
      subCaption: 'Outpatient Feedback Averages',
      xAxisName: 'Departments',
      yAxisName: 'Average values',
      numberSuffix: '',
      theme: 'fusion'
    },
    data:[]
  };
  this.inpatientaveragegraphdata= {
    chart: {
      caption: 'AAR HOSPITAL',
      subCaption: 'Inpatient Feedback Averages',
      xAxisName: 'Departments',
      yAxisName: 'Average values',
      numberSuffix: '',
      theme: 'fusion'
    },
    data:[]
  };
  this.dataSource= {
    chart: {
      caption: 'AAR HOSPITAL',
      subCaption: 'All Respondent Counts',
      xAxisName: 'Departments',
      yAxisName: 'Total Count',
      numberSuffix: '',
      theme: 'fusion'
    },
    data:[]
  };
 
  this.RespondentdataSource= {
    chart: {
      caption: 'AAR HOSPITAL',
      subCaption: ' Total Respondents',
      xAxisName: 'Departments',
      yAxisName: 'Average',
      numberSuffix: '',
      theme: 'fusion'
    },
    data:[]
  };
  this.SurgerydataSource= {
    chart: {
      caption: 'AAR HOSPITAL',
      subCaption: 'Surgery Average Feedback',
      xAxisName: 'Departments',
      yAxisName: 'Average',
      numberSuffix: '',
      theme: 'fusion'
    },
    data:[]
  };

  this.dataSourceOutpatientpositive= {
    chart: {
      caption: 'AAR HOSPITAL LTD',
      subCaption: 'Outpatient Positive Repondents Feedbacks',
      xAxisName: 'Departments',
      yAxisName: 'Count',
      numberSuffix: '',
      theme: 'fusion'
    },
    data:[]
  };
 
 

 
 
}


  ngOnInit() {
    this.getFeedbacksGraph();
  
    this.getFeedbacksgraphaverage();
  
   this.getSurgerygraphaverage()
 
  }
 
  
  getSurgerygraphaverage(){
    this.service.surgerygraphaverage().subscribe(
      datas => {
        
        this.SurgerydataSource.data =datas.data
          console.log("Surgery average",this.SurgerydataSource )
        
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
    }
getFeedbacksgraphaverage(){
  this.service.feedbacksgraphaverage().subscribe(
    datas => {
      
      this.averagegraphdata.data =datas.data

      
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
