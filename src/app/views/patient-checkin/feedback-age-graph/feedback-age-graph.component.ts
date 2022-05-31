import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../service.service';

@Component({
  selector: 'app-feedback-age-graph',
  templateUrl: './feedback-age-graph.component.html',
  styleUrls: ['./feedback-age-graph.component.scss']
})
export class FeedbackAgeGraphComponent implements OnInit {
  dataSource: any={}
  title: string;
  constructor(private service: ServiceService) { 

  this.title = 'Age graph';

  this.dataSource = {
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
}

ngOnInit() {
this.getFeedbcakAges();
}
getFeedbcakAges(){
    this.service.getFeedbcakAges().subscribe(res=>{
      this.dataSource.data=res;
    },err=>{})
}

}
