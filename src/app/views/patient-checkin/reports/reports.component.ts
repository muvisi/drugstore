import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../service.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  width = 500;
  height = 300;
  dataFormat = "json";
  gender: any;
  profitData = profit;
  data:any;
  visits:any;
  constructor( public service: ServiceService) {
    this.getReport();
   }

  ngOnInit() {
    
  }
getReport(){
  this.service.reports().subscribe((res)=>{
    this.data = {
      chart: {
        caption: "Payments Transactions",
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
        caption: "Patients Visit Graph",
        xaxisname: "Number of Visits",
        rotatelabels: "1",
        // numbersuffix: "K",
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
    
    
  });
}
}





const profit = {
  chart: {
    caption: "Insurance, Cash & Number of visits",
    drawcrossline: "1",
    yaxisname: "Cash (in k)",
    syaxisname: "Number of patients",
    showvalues: "0",
    showanchors: "0",
    numberprefix: "$",
    plothighlighteffect: "fadeout",
    paletteColors: '#33CEFF,#5E50F9,#FF6E33',
    theme: "fusion"
  },
  categories: [
    {
      category: [
        {
          label: "Mar-2012"
        },
        {
          label: "Jun-2012"
        },
        {
          label: "Sept-2012"
        },
        {
          label: "Dec-2012"
        },
        {
          label: "Mar-2013"
        },
        {
          label: "Jun-2013"
        },
        {
          label: "Sept-2013"
        },
        {
          label: "Dec-2013"
        },
        {
          label: "Mar-2014"
        },
        {
          label: "Jun-2014"
        },
        {
          label: "Sept-2014"
        },
        {
          label: "Dec-2014"
        },
        {
          label: "Mar-2015"
        },
        {
          label: "Jun-2015"
        },
        {
          label: "Sept-2015"
        },
        {
          label: "Dec-2015"
        },
        {
          label: "Mar-2016"
        },
        {
          label: "Jun-2016"
        },
        {
          label: "Sept-2016"
        },
        {
          label: "Dec-2016"
        },
        {
          label: "Mar-2017"
        },
        {
          label: "Jun-2017"
        }
      ]
    }
  ],
  dataset: [
    {
      seriesname: "Insurance",
      plottooltext: "Insurance in $label : <b>$dataValue</b>",
      data: [
        {
          value: "36000"
        },
        {
          value: "22000"
        },
        {
          value: "24000"
        },
        {
          value: "42000"
        },
        {
          value: "35000"
        },
        {
          value: "21000"
        },
        {
          value: "26000"
        },
        {
          value: "28000"
        },
        {
          value: "47000"
        },
        {
          value: "38000"
        },
        {
          value: "29000"
        },
        {
          value: "23000"
        },
        {
          value: "24000"
        },
        {
          value: "42000"
        },
        {
          value: "35000"
        },
        {
          value: "21000"
        },
        {
          value: "26000"
        },
        {
          value: "28000"
        },
        {
          value: "47000"
        },
        {
          value: "38000"
        },
        {
          value: "29000"
        },
        {
          value: "23000"
        }
      ]
    },
    {
      seriesname: "Cash",
      plottooltext: "Cash in $label : <b>$dataValue</b>",
      renderas: "area",
      showvalues: "0",
      data: [
        {
          value: "4000"
        },
        {
          value: "5000"
        },
        {
          value: "3000"
        },
        {
          value: "4000"
        },
        {
          value: "1000"
        },
        {
          value: "7000"
        },
        {
          value: "1000"
        },
        {
          value: "4000"
        },
        {
          value: "1000"
        },
        {
          value: "6000"
        },
        {
          value: "2000"
        },
        {
          value: "7000"
        },
        {
          value: "6000"
        },
        {
          value: "8000"
        },
        {
          value: "10000"
        },
        {
          value: "7000"
        },
        {
          value: "8000"
        },
        {
          value: "4000"
        },
        {
          value: "9000"
        },
        {
          value: "6000"
        },
        {
          value: "6000"
        },
        {
          value: "7000"
        }
      ]
    },
    {
      seriesname: "Number of Patients",
      parentyaxis: "S",
      renderas: "line",
      showvalues: "0",
      plottooltext: "$value patients",
      data: [
        {
          value: "500"
        },
        {
          value: "25"
        },
        {
          value: "100"
        },
        {
          value: "29"
        },
        {
          value: "25"
        },
        {
          value: "50"
        },
        {
          value: "26"
        },
        {
          value: "25"
        },
        {
          value: "25"
        },
        {
          value: "35"
        },
        {
          value: "20"
        },
        {
          value: "30"
        },
        {
          value: "46"
        },
        {
          value: "34"
        },
        {
          value: "26"
        },
        {
          value: "33"
        },
        {
          value: "46"
        },
        {
          value: "25"
        },
        {
          value: "35"
        },
        {
          value: "28"
        },
        {
          value: "20"
        },
        {
          value: "43"
        }
      ]
    }
  ]
};
