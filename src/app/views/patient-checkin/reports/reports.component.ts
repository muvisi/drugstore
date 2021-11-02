import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ServiceService } from '../../../service.service';
import { ExcelGeneratorService } from '../../../excel-generator.service'
import { FormControl } from '@angular/forms';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common'
import { element } from 'protractor';

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
  constructor(public service:ServiceService,public excelGeneratorService: ExcelGeneratorService,public datepipe: DatePipe,public toastr: ToastrService,public router:Router) { }
  ngOnInit() {
    this.month=new Date().getMonth()
    this.year=new Date().getFullYear()
    this.date= new Date(Date.now()-((new Date().getDay())+1)*24*60*60*1000)
    this.getFirstDose();
    this.getSecondDose();
    this.getCompleted();
    this.getMonthly();
    this.getDaily();


  }

  dateFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day == 6;
  }
  getFirstDose(){
    // this.loading=true;
    this.service.getAppointmentreports("report_type=First Dose").subscribe((res)=>{
      this.loading=false;
      this.firstDoseAppointMentList=res
      this.firstDoseAppointMent = new MatTableDataSource(this.formatData1(res));
      this.firstDoseAppointMent.paginator = this.paginator;
    })
  }
  getSecondDose(){
    // this.loading=true;
    this.service.getAppointmentreports("report_type=Second Dose").subscribe((res)=>{
      this.loading=false;
      this.secondDoseAppointMentList=res
      this.secondDoseAppointMent = new MatTableDataSource(this.formatData1(res));
      this.secondDoseAppointMent.paginator = this.paginator;
    })
  }
  getCompleted(){
    // this.loading=true;
    this.service.getAppointmentreports("report_type=Completed").subscribe((res)=>{
      this.loading=false;
      this.completedAppointMentList=res
      this.completedAppointMent = new MatTableDataSource(this.formatData2(res));
      this.completedAppointMent.paginator = this.paginator;
    })
  }

  getMonthly(){
    // this.loading=true;
    this.service.getAppointmentreports("report_type=Monthly&month="+this.month+"&year="+this.year).subscribe((res)=>{
      this.loading=false;
      this.monthlyAppointMentList=res
      this.monthlyAppointMent = new MatTableDataSource(this.formatData1(res));
      this.monthlyAppointMent.paginator = this.paginator;
    })
  }


  getDaily(){
    // this.loading=true;
    this.service.getAppointmentreports("report_type=Daily&date="+this.date).subscribe((res)=>{
      this.loading=false;
      this.dailyAppointMentList=res
      this.dailyAppointMent = new MatTableDataSource(this.formatData1(res));
      this.dailyAppointMent.paginator = this.paginator;
    })
  }


downloadReportFirstDose(){
    // this.service.downloadAppointmentreports("report_type=First Dose").subscribe((res)=>{
    //   // const blob = new Blob([res], { type: 'text/csv' });
    //   // const url= window.URL.createObjectURL(blob);
    //   this.handle_download(res);
    // })
  
      // const workSheet = XLSX.utils.json_to_sheet(this.firstDoseAppointMent.data);
      // const workBook: XLSX.WorkBook = XLSX.utils.book_new();
      // let titleRow = workSheet.addRow(["First Dose Vaccination As At "+ this.datepipe.transform(new Date(),"MMM d, y,")]);
      
      // titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
      // workSheet.addRow([]);
      // XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
      // XLSX.writeFile(workBook, 'First Dose.xlsx');
      this.excelGeneratorService.generate("First Dose Vaccination As At "+ this.datepipe.transform(new Date(),"MMM d, y,"),
      ["Date","Time","Client","Mobile Number","National ID","Dose","Status"],
      this.formatData1(this.firstDoseAppointMentList)   
      )
  

  }
downloadReportSecondDose(){
  // this.service.downloadAppointmentreports("report_type=Second Dose").subscribe((res)=>{
  //   this.handle_download(res);
  // })
  const workSheet = XLSX.utils.json_to_sheet(this.secondDoseAppointMent.data);
  const workBook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
  XLSX.writeFile(workBook, 'First Dose.xlsx');
}

downloadReportCompleted(){
  // this.service.downloadAppointmentreports("report_type=Completed").subscribe((res)=>{
  //   this.handle_download(res);
  // })
  const workSheet = XLSX.utils.json_to_sheet(this.completedAppointMent.data);
  const workBook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
  XLSX.writeFile(workBook, 'First Dose.xlsx');
}

downloadReportMonthly(){
  // this.service.downloadAppointmentreports("report_type=Monthly&month="+this.month+"&year="+this.year).subscribe((res)=>{
  //   this.handle_download(res);
  // })
  const workSheet = XLSX.utils.json_to_sheet(this.monthlyAppointMent.data);
  const workBook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
  XLSX.writeFile(workBook, 'First Dose.xlsx');
}
downloadReportDaily(){
  // this.service.downloadAppointmentreports("report_type=Daily&date="+this.date).subscribe((res)=>{
  //   this.handle_download(res);
  // })
  const workSheet = XLSX.utils.json_to_sheet(this.dailyAppointMent.data);
  const workBook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
  XLSX.writeFile(workBook, 'First Dose.xlsx');

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
  formatData1(elements){
    console.log(elements);
      var return_data=[];
      for (var i=0;i<elements.length;i++) {
        var element=elements[i];
        return_data.push(
          {
            date:element.date,
            time:element.time,
            client:element.patient.first_name + " " +element.patient.last_name,
            phone:element.patient.phone,
            national_id:element.patient.national_id,
            dose:element.dose,            
            status: (element.status) ? "Vaccinated" : "Pending", 

          }
        ) 
        
      }
      return return_data;
  }
  formatData2(elements){
    var return_data=[];
    for (var i=0;i<elements.length;i++) {
      var element=elements[i];
      return_data.push(
        {
          date:this.datepipe.transform(element.date, 'dd/MM/yyyy'),
          time:element.time,
          client:element.patient.first_name + " " +element.patient.last_name,
          phone:element.patient.phone,
          national_id:element.patient.national_id
        }
      ) 
      
    }
  return return_data;
}

}




