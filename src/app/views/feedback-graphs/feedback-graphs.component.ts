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
 



  nps_datasource={
    data:[0,0,0,0,0,0,0,0,0,0,0],
    total: '',
    detractors: '',
    passives: '',
    promoters: '',
    detractors_perc: '',
    passives_perc: '',
    promoters_perc: '',
    nps: ''

  };
  nps_datasource_chart= {"chart": {
    "caption": "",
    "subCaption": "",
    "numberPrefix": "$",
    "bgColor": "#ffffff",
    "startingAngle": "310",
    "showLegend": "0",
    "defaultCenterLabel":"",
    "centerLabel":  "",
    "centerLabelBold": "1",
    "baseFont": "Verdana",
    "basefontsize": "1vw",
    "outcnvbasefontsize": "1vw",
    "labelfontsize": "3rem",
    "valuefontsize": "60%",
    "showTooltip": "0",
    "showLabels":"0",
    "showValues":"0",
    "decimals": "0",
    "theme": "fusion"
},
"data":[]
}





  positive_dataSource;
  negative_dataSource;
  maternity_dataSource;
  services_period;
  
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
  nps_date1;
  nps_date2;
  channels_data;
  nps_data;
  nps_period;
  perioddepart;
  servicegraphdata;
  services_date;
  respondent_period;

  channels_filter={
    periodic:'Y',
    date:new Date()
  };

  loading;
  dataSource_fall: { chart: { caption: string; subCaption: string; xAxisName: string; yAxisName: string; numberSuffix: string; theme: string; }; data: any[]; };
  title: string;
  title3: string;
  dataSource3: { chart: { caption: string; subCaption: string; xAxisName: string; yAxisName: string; numberSuffix: string; theme: string; }; data: any[]; };
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

  this.title = 'Weekly patient  arrival graph';

  this.dataSource_fall = {
    chart: {
      caption: 'AAR HOSPITAL',
      subCaption: 'Patient arrival',
      xAxisName: 'Week day',
      yAxisName: 'patients',
      numberSuffix: '',
      theme: 'fusion'
    },
    data: []
  };

this.title3 = 'Weekly feedback response graph';

this.dataSource3 = {
  chart: {
    caption: 'AAR HOSPITAL',
    subCaption: 'Feedback Responses',
    xAxisName: 'Week day',
    yAxisName: 'patients',
    numberSuffix: '',
    theme: 'fusion'
  },
  data: []
};



 
 

 
 
}


  ngOnInit() {
    this.getFeedbacksGraph();
  
    this.getFeedbacksgraphaverage();
    this.getFeedbackChannels();
    this.getFeedbackservice();
    this.getNpsgraphdata();
    this.getnps();
 

    this.getFootWalkData()
    this.getFeedbcakResponses()
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
  

    
      getnps(){
        this.service.getNps().subscribe(res=>{
          this.nps_datasource=res;
          this.nps_datasource_chart={
            "chart": {
                "caption": "",
                "subCaption": "",
                "numberPrefix": "$",
                "bgColor": "#ffffff",
                "startingAngle": "310",
                "showLegend": "0",
                "defaultCenterLabel":res.nps,
                "centerLabel":    res.nps,
                "centerLabelBold": "1",
                "baseFont": "Verdana",
                "basefontsize": "1vw",
                "outcnvbasefontsize": "1vw",
                "labelfontsize": "3rem",
                "valuefontsize": "60%",
                "showTooltip": "0",
                "showLabels":"0",
                "showValues":"0",
                "decimals": "0",
                "theme": "fusion"
            },
            "data":[{
            label:"detractors",
            value:res.detractors_perc,
            color:'#f86c6b'
          },
          {
            label:"passives",
            value:res.passives_perc,
            color:'#ffc107'
          },
          {
            label:"promoters",
            value:res.promoters_perc,
            color:'#4dbd74'
          }]}
        },err=>{})
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
NPSFilterChangedate(){
  let data={
    // period:this.nps_period,
    date1:this.nps_date1,
    date2:this.nps_date2,
  }
  console.log("filter data",data)
  this.service.npsgraph(data).subscribe(
    res=> {
      this.nps_datasource=res;
      this.nps_datasource_chart={
        "chart": {
            "caption": "",
            "subCaption": "",
            "numberPrefix": "$",
            "bgColor": "#ffffff",
            "startingAngle": "310",
            "showLegend": "0",
            "defaultCenterLabel":res.nps,
            "centerLabel":    res.nps,
            "centerLabelBold": "1",
            "baseFont": "Verdana",
            "basefontsize": "1vw",
            "outcnvbasefontsize": "1vw",
            "labelfontsize": "3rem",
            "valuefontsize": "60%",
            "showTooltip": "0",
            "showLabels":"0",
            "showValues":"0",
            "decimals": "0",
            "theme": "fusion"
        },
        "data":[{
        label:"detractors",
        value:res.detractors_perc,
        color:'#f86c6b'
      },
      {
        label:"passives",
        value:res.passives_perc,
        color:'#ffc107'
      },
      {
        label:"promoters",
        value:res.promoters_perc,
        color:'#4dbd74'
      }]}
      
    },
   
    err => console.error(err),
   
    () => console.log('There is an error')
  );
  }

  getFootWalkData(){
    this.service.getFootWalkData().subscribe(res=>{
      this.dataSource_fall.data=res;
    },err=>{})
}

getFeedbcakResponses(){
  this.service.getFeedbcakResponses().subscribe(res=>{
    this.dataSource3.data=res;
  },err=>{})
}


}
