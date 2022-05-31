import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../service.service';

@Component({
  selector: 'app-feedback-response-graph',
  templateUrl: './feedback-response-graph.component.html',
  styleUrls: ['./feedback-response-graph.component.scss']
})
export class FeedbackResponseGraphComponent implements OnInit {
  dataSource: any={}
  title: string;
  constructor(private service: ServiceService) { 

  this.title = 'Weekly feedback response graph';

  this.dataSource = {
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
this.getFeedbcakResponses()
}
getFeedbcakResponses(){
    this.service.getFeedbcakResponses().subscribe(res=>{
      this.dataSource.data=res;
    },err=>{})
}

}
