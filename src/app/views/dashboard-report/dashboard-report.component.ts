import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-dashboard-report',
  templateUrl: './dashboard-report.component.html',
  styleUrls: ['./dashboard-report.component.scss']
})
export class DashboardReportComponent implements OnInit {
  dataSource: any={}
  title: string;
  dataSource2: any={}
  title2: string;
  dataSource3: any={}
  title3: string;
  constructor(private service: ServiceService) { 

    this.title = 'Weekly patient  arrival graph';

    this.dataSource = {
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

this.title2 = 'Age graph';

this.dataSource2 = {
    chart: {
      caption: 'AAR HOSPITAL',
      subCaption: 'Feedback ages',
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
    this.getFootWalkData()
    this.getFeedbcakAges()
    this.getFeedbcakResponses()
    
  }
  getFootWalkData(){
    this.service.getFootWalkData().subscribe(res=>{
      this.dataSource.data=res;
    },err=>{})
}
getFeedbcakAges(){
  this.service.getFeedbcakAges().subscribe(res=>{
    this.dataSource2.data=res;
  },err=>{})
}
getFeedbcakResponses(){
  this.service.getFeedbcakResponses().subscribe(res=>{
    this.dataSource3.data=res;
  },err=>{})
}



}
