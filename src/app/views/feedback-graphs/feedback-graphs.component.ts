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
  services_period;
  category_start_date;
  category_end_date;
  
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
  nps_date;
  channels_data;
  nps_data;
  nps_period;
  perioddepart;
  servicegraphdata;
  services_date;
  services_start_date;
  services_end_date
  respondent_period;

  channels_filter={
    periodic:'Y',
    date:new Date()
  };

  loading;
  constructor( public service:ServiceService) {
    this.nps_data= {
      chart: {
        caption: 'AAR HOSPITAL',
        subCaption: 'Net Promoter Score Value',
        xAxisName: 'NPS Values',
        yAxisName: 'Score Value count',
        numberSuffix: '',
        theme: 'fusion'
      },
      data:[]
    };
  this.channels_data= {
    chart: {
      caption: 'AAR HOSPITAL',
      subCaption: 'Feedback Channel Respondents',
      xAxisName: 'Channels',
      yAxisName: 'Total Respondents',
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
    this.getFeedbackChannels();
    this.getFeedbackservice();
    this.getNpsgraphdata();
 
  }
  getFeedbackChannels(){
  
    this.service.getChannelData().subscribe(
      res => {
        
        this.channels_data.data =res;
        
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );


  }

  channelFilterChange(){
      
    this.service.filterChannelData(this.channels_filter).subscribe(
      res => {
        
        this.channels_data.data =res;
        
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
  
    this.service.getFeedbackservice("").subscribe(
      datas => {
        
        this.servicegraphdata.data =datas.data
  
        
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
    }
    getFeedbackservicefilter(){
      let data={
        period:this.services_period
      }
  
      this.service.getFeedbackservice(data).subscribe(
        datas => {
          
          this.servicegraphdata.data =datas.data
    
          
        },
       
        err => console.error(err),
       
        () => console.log('There is an error')
      );
      }
      ServicesFilterChanged(){
        let data={
          startdate:this.services_start_date,
          enddate:this.services_end_date
        }
        console.log("my data data",data)
    
        this.service.getFeedbackservice(data).subscribe(
          datas => {
            
            this.servicegraphdata.data =datas.data
      
            
          },
         
          err => console.error(err),
         
          () => console.log('There is an error')
        );






      }
      // getFeedbackservicefilterdate(){
      //   let data={
      //     period:this.services_date
      //   }
    
      //   this.service.getFeedbackservice(data).subscribe(
      //     datas => {
            
      //       this.servicegraphdata.data =datas.data
      
            
      //     },
         
      //     err => console.error(err),
         
      //     () => console.log('There is an error')
      //   );
      //   }
  

    
 
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


 
 

getFeedbacksGraph() {
  this.service.feedbacksgraph("").subscribe(
    datas=> {
      console.log(datas)
      this.dataSource.data=datas.data
      
    },
   
    err => console.error(err),
   
    () => console.log('There is an error')
  );
}
getFeedbacksGraphfilter() {
  let data={
    period:this.respondent_period
  }
  this.service.feedbacksgraph(data).subscribe(
    datas=> {
      console.log(datas)
      this.dataSource.data=datas.data
      
    },
   
    err => console.error(err),
   
    () => console.log('There is an error')
  );
}
getNpsgraphdata(){
  this.service.npsgraph("").subscribe(
    datas=> {
      console.log(datas)
      this.nps_data.data=datas.data
      
    },
   
    err => console.error(err),
   
    () => console.log('There is an error')
  );




}
NPSFilterChange(){
  let data={
    period:this.nps_period,
    // date:this.nps_date,
  }
  console.log("filter data",data)
  this.service.npsgraph(data).subscribe(
    datas=> {
      console.log(datas)
      this.nps_data.data=datas.data
      
    },
   
    err => console.error(err),
   
    () => console.log('There is an error')
  );






}
CategoryFilterChanged(){
  let data={
    startdate:this.category_start_date,
    enddate:this.category_end_date
  }
console.log(data)
this.service.feedbacksgraphaverage(data).subscribe(
  datas => {
    
    this.averagegraphdata.data =datas.data

    
  },
 
  err => console.error(err),
 
  () => console.log('There is an error')
);






}
NPSFilterChangedate(){
  let data={
    // period:this.nps_period,
    date:this.nps_date,
  }
  console.log("filter data",data)
  this.service.npsgraph(data).subscribe(
    datas=> {
      console.log(datas)
      this.nps_data.data=datas.data
      
    },
   
    err => console.error(err),
   
    () => console.log('There is an error')
  );
  }

}
