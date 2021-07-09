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



