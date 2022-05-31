import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../service.service';

@Component({
  selector: 'app-footwalk',
  templateUrl: './footwalk.component.html',
  styleUrls: ['./footwalk.component.scss']
})
export class FootwalkComponent implements OnInit {
  dataSource: any={}
  title: string;
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
  }

  ngOnInit() {
this.getFootWalkData()
  }
  getFootWalkData(){
      this.service.getFootWalkData().subscribe(res=>{
        this.dataSource.data=res;
      },err=>{})
  }
}
