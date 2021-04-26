import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../service.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  height = 450;
  dataFormat = "json";
  gender: any;
  data:any;
  visits:any;
  profit:any;
  loading = true;
  constructor( public service: ServiceService) {
    this.getReport();
   }

  ngOnInit() {
  }
getReport(){
  this.service.reports().subscribe((res)=>{
    this.loading = false;
    this.data = {
      chart: {
        subcaption: "Ncba Payments Transactions",
        yaxisname: "Number of Transactions",
        xaxisname: "Days of week",
        aligncaptionwithcanvas: "0",
        plottooltext: "<b>$dataValue</b> Transactions done",
        theme: "fusion"
      },
      data: res.transaction
    };
    this.visits= {
      chart: {
        subcaption: "Appointments",
        xaxisname: "Number of Visits",
        rotatelabels: "0.5",
        paletteColors: '#33CEFF,#D733FF,#900C3F ',
        theme: "fusion"
      },
      data: res.visits
    };

    this.gender = {
      chart: {
        caption: "Patients Gender Distribution Graph",
        showlegend: "1",
        showpercentvalues: "1",
        legendposition: "bottom",
        usedataplotcolorforlabels: "1",
        theme: "fusion",
        paletteColors: '#FF9933,#9333FF',
      },
      data:res.gender
    };
    
    this.profit= {
      chart: {
        subcaption: "Cash & Insurance Payments",
        numvisibleplot: "7",
        showanchors: "0",
        theme: "fusion"
      },
      categories: [
        {
          category: res.labels
        }
      ],
      dataset: [
        {
          seriesname: "Insurance",
          data: res.insurance
        },
        {
          seriesname: "Cash Payments",
          renderas: "area",
          data: res.cash
        }
      ]
    };
    
    
  });
}
}



