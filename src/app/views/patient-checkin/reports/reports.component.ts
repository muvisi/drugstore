import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../../service.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ExcelService } from '../../../excel.service';
import { DatePipe } from '@angular/common';

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
  date;
  date3;
  loading = true;
  cashSource;
  dataSource;
  revenueSource;
  dataSource1;
  payments = [];
  id;
  graphic_data={}
  displayedColumns: string[] = ['sn','date','amount','trx','client','mobile','name'];
  Columns: string[] = ['sn','date','trans_id','name','msisdn','trans_type','amount','status']
  roomsColumns: string[] = ['sn','date','room','start', 'end','amount','type','staff'];
  revenueColumns: string[] = ['sn','StartTime','EndTime','Client','national_id','phone','Counselor','supervisor','amount']
  @ViewChild('pagination', {static: true}) paginator: MatPaginator;
  @ViewChild('paginator1', {static: true}) paginator1: MatPaginator;
  counsolers=[];
  constructor( public service: ServiceService,public datePipe:DatePipe,public excelService:ExcelService) {
    this.getReport();
   }

  ngOnInit() {
    this.getCash();
    this.getRoomsRevenue();
    this.getRecords();
    this.getCounselors();
    this.getGraphicData();

  }
  getGraphicData(){
    this.service.getRevenuePerConsellor().subscribe((res)=>{
      this.graphic_data['revenue_per_counsellor']={};
      this.graphic_data['revenue_per_counsellor']["data"]=res;
      this.graphic_data['revenue_per_counsellor']['PIE'] = {
        chart: {
          caption: "Total Revenue per Counsellor",
          showlegend: "1",
          showpercentvalues: "1",
          legendposition: "bottom",
          usedataplotcolorforlabels: "1",
          theme: "fusion",
        },
        data:res
      };

      
        this.graphic_data['revenue_per_counsellor']['BAR'] = {
        chart: {
          caption: "Total Revenue Per Counsellor",
          yaxisname: "Revenue Amount(kshs)",
          xaxisname: "Counsellor",
          aligncaptionwithcanvas: "0",
          xAxisPosition: "left",
          plottooltext: "<b>$dataValue</b> Revenue done",
          theme: "fusion"
        },
        data: res
      };
    });
    this.service.getRevenuePerInsurance().subscribe((res)=>{
      this.graphic_data['revenue_per_insurance']={};
      this.graphic_data['revenue_per_insurance']["data"]=res;
      this.graphic_data['revenue_per_insurance']['PIE'] = {
        chart: {
          caption: "Total Revenue per Insurance Company",
          showlegend: "1",
          showpercentvalues: "1",
          legendposition: "bottom",
          usedataplotcolorforlabels: "1",
          theme: "fusion",
        },
        data:res
      };

      
        this.graphic_data['revenue_per_insurance']['BAR'] = {
        chart: {
          caption: "Total Revenue per Insurance Company",
          yaxisname: "Revenue Amount(kshs)",
          xaxisname: "Insurance Company",
          aligncaptionwithcanvas: "0",
          xAxisPosition: "left",
          plottooltext: "<b>$dataValue</b> Revenue done",
          theme: "fusion"
        },
        data: res
      };
    });
  
    this.service.getRevenuePerRoom().subscribe((res)=>{
      this.graphic_data['revenue_per_room']={};
      this.graphic_data['revenue_per_room']["data"]=res;
      this.graphic_data['revenue_per_room']['PIE'] = {
        chart: {
          caption: "Total Revenue per Reservation Room",
          showlegend: "1",
          showpercentvalues: "1",
          legendposition: "bottom",
          usedataplotcolorforlabels: "1",
          theme: "fusion",
        },
        data:res
      };

      
        this.graphic_data['revenue_per_room']['BAR'] = {
        chart: {
          caption: "Total Revenue per Reservation Room",
          yaxisname: "Revenue Amount(kshs)",
          xaxisname: "Reservation Room",
          aligncaptionwithcanvas: "0",
          xAxisPosition: "left",
          plottooltext: "<b>$dataValue</b> Revenue done",
          theme: "fusion"
        },
        data: res
      };
    });
    this.service.getSessionPerPlatform().subscribe((res)=>{
      this.graphic_data['sessions_per_platform']={};
      this.graphic_data['sessions_per_platform']["data"]=res;
      this.graphic_data['sessions_per_platform']['PIE'] = {
        chart: {
          caption: "Session per Platform",
          showlegend: "1",
          showpercentvalues: "1",
          legendposition: "bottom",
          usedataplotcolorforlabels: "1",
          theme: "fusion",
        },
        data:res
      };

      
        this.graphic_data['sessions_per_platform']['BAR'] = {
        chart: {
          caption: "Session per Platform",
          yaxisname: "Session",
          xaxisname: "Platform",
          aligncaptionwithcanvas: "0",
          xAxisPosition: "left",
          plottooltext: "<b>$dataValue</b> Revenue done",
          theme: "fusion"
        },
        data: res
      };
    });
    this.service.getAppointmentPerStatus().subscribe((res)=>{
      this.graphic_data['appointments_per_status']={};
      this.graphic_data['appointments_per_status']["data"]=res;
      this.graphic_data['appointments_per_status']['PIE'] = {
        chart: {
          caption: "Sessions status",
          showlegend: "1",
          showpercentvalues: "1",
          legendposition: "bottom",
          usedataplotcolorforlabels: "1",
          theme: "fusion",
        },
        data:res
      };

      
        this.graphic_data['appointments_per_status']['BAR'] = {
        chart: {
          caption: "Session status",
          yaxisname: "Session",
          xaxisname: "status",
          aligncaptionwithcanvas: "0",
          xAxisPosition: "left",
          plottooltext: "<b>$dataValue</b> Revenue done",
          theme: "fusion"
        },
        data: res
      };
    });
    this.service.getClaimsPerInsurance().subscribe((res)=>{
      this.graphic_data['claims_per_insurance']={};
      this.graphic_data['claims_per_insurance']["data"]=res;
      this.graphic_data['claims_per_insurance']['PIE'] = {
        chart: {
          caption: "Total Claims per Insurance Company",
          showlegend: "1",
          showpercentvalues: "1",
          legendposition: "bottom",
          usedataplotcolorforlabels: "1",
          theme: "fusion",
        },
        data:res
      };

      
        this.graphic_data['claims_per_insurance']['BAR'] = {
        chart: {
          caption: "Total Claims per Insurance Company",
          yaxisname: "Total Claims",
          xaxisname: "Insurance Company",
          aligncaptionwithcanvas: "0",
          xAxisPosition: "left",
          plottooltext: "<b>$dataValue</b> Revenue done",
          theme: "fusion"
        },
        data: res
      };
  
    });



    this.service.getClientMonthlyTotal().subscribe((res)=>{
      this.graphic_data['clients_monthly_total']=res;
     
    });





  }
  onSelect(id){
    this.service.getAppointmentsRevenuesByCounselor(id).subscribe((res)=>{
      this.revenueSource = new MatTableDataSource(res.results);
      this.revenueSource.paginator = this.paginator;
    })
  }
  getCounselors(){
    this.service.getAppointmentUsers().subscribe((res)=>{
      this.counsolers = res.results;
    })
  }
  
  getRecords(){
    this.service.getAppointmentsRevenues().subscribe((res)=>{
      this.revenueSource = new MatTableDataSource(res.results);
      this.revenueSource.paginator = this.paginator;
    })
  }

  getRoomsRevenue(){
    this.service.roomRevenues().subscribe((res)=>{
      this.dataSource1 = new MatTableDataSource(res);
    })
  }
  searchCash(item){
    if(item != null){
     const date = this.datePipe.transform(item,'yyyy-MM-dd')
     if(date !=undefined){
       this.service.cashPaymentsBydate(date).subscribe((res)=>{
         this.tableData(res);
         this.payments = res;
        })
     }
    }else{
      this.getCash();
    }
   }
   getCash(){
    this.service.allCashPayments().subscribe((res)=>{
      this.tableData(res.results);
      this.payments = res.results;
    })
  }
  tableData(items){
    this.cashSource = new MatTableDataSource(items);
    this.cashSource.paginator = this.paginator;
  }

  exportAsXLSX(): void {
    const data = this.payments;
    this.excelService.exportAsExcelFile(data, 'Cash Payemnts');
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



