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
  MatarnitydataSource: any={}
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
      subCaption: 'Total Respondents Per Department',
      xAxisName: 'Departments',
      yAxisName: 'Total Count',
      numberSuffix: '',
      theme: 'fusion'
    },
    data:[]
  };
 
  this.MatarnitydataSource= {
    chart: {
      caption: 'AAR HOSPITAL',
      subCaption: ' Maternity Average Feedback',
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
  this.dataSourceinpatientpositive= {
    chart: {
      caption: 'AAR HOSPITAL LTD',
      subCaption: 'Inpatient Positive Repondents Feedbacks',
      xAxisName: 'Departments',
      yAxisName: 'Count',
      numberSuffix: '',
      theme: 'fusion'
    },
    data:[]
  };
  this.dataSourceinpatientnegative= {
    chart: {
      caption: 'AAR HOSPITAL LTD',
      subCaption: 'Inpatient Negative Repondents Feedbacks',
      xAxisName: 'Departments',
      yAxisName: 'Count',
      numberSuffix: '',
      theme: 'fusion'
    },
    data:[]
  };
  this.dataSourceOutpatientnegative= {
    chart: {
      caption: 'AAR HOSPITAL LTD',
      subCaption: 'Outpatient Negative Repondents Feedbacks',
      xAxisName: 'Departments',
      yAxisName: 'Count',
      numberSuffix: '',
      theme: 'fusion'
    },
    data:[]
  };
  this.dataSourceinpatient= {
    chart: {
      caption: 'AAR HOSPITAL LTD',
      subCaption: ' Inpatient Repondents Feedbacks',
      xAxisName: 'Departments',
      yAxisName: 'Count',
      numberSuffix: '',
      theme: 'fusion'
    },
    data:[]
  };
  this.dataSourceOutpatient= {
    chart: {
      caption: 'AAR HOSPITAL LTD',
      subCaption: 'Outpatient Repondents Feedbacks',
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
    this.getFeedbacksGraphOutpatient();
    this.getFeedbacksGraphOutpatientPositive();
    this.getFeedbacksGraphIpatientPositive();
    this.getFeedbacksGraphOuatientNegative();
    this.getFeedbacksGraphIpatientNegative();
    this.getFeedbacksGraphInpatient();
    this.getFeedbacksgraphaverage();
    this.geBookingvsPatientsfeedback();
  
    this.getMaternitygraphaverage();
   this.getSurgerygraphaverage()
   this.getOutpatientgraphaverage()
   this.getInpatientgraphaverage()
  }
  getMaternitygraphaverage(){
    this.service.maternitygraphaverage().subscribe(
      datas => {
        
        this.MatarnitydataSource.data =datas.data
          console.log("maternity average",this.MatarnitydataSource )
        
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
    }
    getInpatientgraphaverage(){
      this.service.maternitygraphaverage().subscribe(
        datas => {
          
          this.inpatientaveragegraphdata.data =datas.data
            // console.log("maternity average",this.inpatientaveragegraphdata )
          
        },
       
        err => console.error(err),
       
        () => console.log('There is an error')
      );
      }
      getOutpatientgraphaverage(){
        this.service.maternitygraphaverage().subscribe(
          datas => {
            
            this.outpatientaveragegraphdata.data =datas.data
              // console.log("maternity average",this.outpatientaveragegraphdata )
            
          },
         
          err => console.error(err),
         
          () => console.log('There is an error')
        );
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
        // console.log("DATA average",this.averagegraphdata )
      
    },
   
    err => console.error(err),
   
    () => console.log('There is an error')
  );
  }
getFeedbacksGraphIpatientNegative(){
  this.service.feedbacksgraphinpatientnegative().subscribe(
    datas => {
      // console.log(data)
      this.dataSourceinpatientnegative.data=datas.data
      
    },
   
    err => console.error(err),
   
    () => console.log('There is an error')
  );
  }
getFeedbacksGraphOuatientNegative(){
  this.service.feedbacksgraphoutpatientnegative().subscribe(
    datas => {
      // console.log(data)
      this.dataSourceOutpatientnegative.data=datas.data
      
    },
   
    err => console.error(err),
   
    () => console.log('There is an error')
  );
  }
getFeedbacksGraphOutpatient(){
this.service.feedbacksgraphoutpatient().subscribe(
  datas => {
    // console.log(data)
    this.dataSourceOutpatient.data=datas.data
    
  },
 
  err => console.error(err),
 
  () => console.log('There is an error')
);
}
getFeedbacksGraphIpatientPositive(){
  this.service.feedbacksgraphinpatientpositive().subscribe(
    datas => {
      // console.log(data)
      this.dataSourceinpatientpositive.data=datas.data
      
    },
   
    err => console.error(err),
   
    () => console.log('There is an error')
  );
  }
getFeedbacksGraphOutpatientPositive(){
  this.service.feedbacksgraphoutpatientpositive().subscribe(
    datas => {
      // console.log(data)
      this.dataSourceOutpatientpositive.data=datas.data
      
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
    datas => {
      console.log(datas)
      this.dataSourceinpatient.data=datas.data
      
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
