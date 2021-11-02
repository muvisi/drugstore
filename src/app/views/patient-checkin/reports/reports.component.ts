import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ServiceService } from '../../../service.service';
import { FormControl } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  firstDoseAppointMent;
  firstDoseAppointMentList;
  secondDoseAppointMent;
  secondDoseAppointMentList;
  completedAppointMent
  completedAppointMentList;
  allAppointMent;
  allAppointMentList;
  monthlyAppointMent;
  monthlyAppointMentList;
  month;
  year;
  dailyAppointMent;
  dailyAppointMentList;
  date;
  selected_date;
  loading=false;

  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  Columns: string[] = ['sn','date','time','Client','phone','national_id','dose','status']
  Columns2: string[] = ['sn','date','time','Client','phone','national_id']
  constructor(public service:ServiceService,public toastr: ToastrService,public router:Router) { }
  ngOnInit() {
    this.month=new Date().getMonth()
    this.year=new Date().getFullYear()
    this.date= new Date(Date.now()-24*60*60*1000);
    this.getFirstDose();
    this.getSecondDose();
    this.getCompleted();
    this.getMonthly();
    this.getDaily();


  }
  getFirstDose(){
    // this.loading=true;
    this.service.getAppointmentreports("report_type=First Dose").subscribe((res)=>{
      this.loading=false;
      this.firstDoseAppointMentList=res
      this.firstDoseAppointMent = new MatTableDataSource(res);
      this.firstDoseAppointMent.paginator = this.paginator;
    })
  }
  getSecondDose(){
    // this.loading=true;
    this.service.getAppointmentreports("report_type=Second Dose").subscribe((res)=>{
      this.loading=false;
      this.secondDoseAppointMentList=res
      this.secondDoseAppointMent = new MatTableDataSource(res);
      this.secondDoseAppointMent.paginator = this.paginator;
    })
  }
  getCompleted(){
    // this.loading=true;
    this.service.getAppointmentreports("report_type=Completed").subscribe((res)=>{
      this.loading=false;
      this.completedAppointMentList=res
      this.completedAppointMent = new MatTableDataSource(res);
      this.completedAppointMent.paginator = this.paginator;
    })
  }

  getMonthly(){
    // this.loading=true;
    this.service.getAppointmentreports("report_type=Monthly&month="+this.month+"&year="+this.year).subscribe((res)=>{
      this.loading=false;
      this.monthlyAppointMentList=res
      this.monthlyAppointMent = new MatTableDataSource(res);
      this.monthlyAppointMent.paginator = this.paginator;
    })
  }


  getDaily(){
    // this.loading=true;
    this.service.getAppointmentreports("report_type=Daily&date="+this.date).subscribe((res)=>{
      this.loading=false;
      this.dailyAppointMentList=res
      this.dailyAppointMent = new MatTableDataSource(res);
      this.dailyAppointMent.paginator = this.paginator;
    })
  }


downloadReportFirstDose(){
    this.service.downloadAppointmentreports("report_type=First Dose").subscribe((res)=>{
      // const blob = new Blob([res], { type: 'text/csv' });
      // const url= window.URL.createObjectURL(blob);
      this.handle_download(res);
    })
  
      // const workSheet = XLSX.utils.json_to_sheet(this.firstDoseAppointMent.data, {header:['dataprop1', 'dataprop2']});
      // const workBook: XLSX.WorkBook = XLSX.utils.book_new();
      // XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
      // XLSX.writeFile(workBook, 'filename.xlsx');
  

  }
downloadReportSecondDose(){
  this.service.downloadAppointmentreports("report_type=Second Dose").subscribe((res)=>{
    this.handle_download(res);
  })
}

downloadReportCompleted(){
  this.service.downloadAppointmentreports("report_type=Completed").subscribe((res)=>{
    this.handle_download(res);
  })
}

downloadReportMonthly(){
  this.service.downloadAppointmentreports("report_type=Monthly&month="+this.month+"&year="+this.year).subscribe((res)=>{
    this.handle_download(res);
  })
}
downloadReportDaily(){
  this.service.downloadAppointmentreports("report_type=Daily&date="+this.date).subscribe((res)=>{
    this.handle_download(res);
  })

}
handle_download(data){
  let pwa = window.open(this.service.getendpoint()+data.url);
  if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert( 'Please disable your Pop-up blocker and try again.');
  }
}

  rowClick(item){
    this.router.navigate(['/dashboard/appointment-details/',item.id])
  }

}




