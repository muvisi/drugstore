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
import { dataBinding } from '@syncfusion/ej2-schedule';
import { listenerCount } from 'process';

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
  date1;
  date2;
  date3;
  date_b;
  testing;
  selected_date;
  loading=false;

  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  Columns: string[] = ['sn','date','time','Client','phone','national_id','dose','status']
  Columns1: string[] = ['sn','date','time','Client','phone','national_id','status']
  Columns3: string[] = ['sn','names','patient_no','email','phone','national_id','status','dob','date','Time']
  Columns2: string[] = ['sn','date','time','Client','phone','national_id']
  constructor(public service:ServiceService,public excelGeneratorService: ExcelGeneratorService,public datepipe: DatePipe,public toastr: ToastrService,public router:Router) { }
  ngOnInit() {
    this.month=new Date().getMonth()
    this.year=new Date().getFullYear()
    this.date= new Date(Date.now()-((new Date().getDay())+1)*24*60*60*1000);
    this.getFirstDose();
    this.getSecondDose();
    this.getCompleted();
    this.getMonthly();
    this.getDaily();
    this.getAlltest();


  }

  dateFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day == 6;
  }
  getFirstDose(){
    // this.loading=true;
    this.service.getAppointmentreports("report_type=First Dose&date="+this.date1).subscribe((res)=>{
      this.loading=false;
      this.firstDoseAppointMentList=res
      this.firstDoseAppointMent = new MatTableDataSource(this.formatData1(res));
      this.firstDoseAppointMent.paginator = this.paginator;
    })
  }
  getSecondDose(){
    // this.loading=true;
    this.service.getAppointmentreports("report_type=Second Dose&date="+this.date2).subscribe((res)=>{
      this.loading=false;
      this.secondDoseAppointMentList=res
      this.secondDoseAppointMent = new MatTableDataSource(this.formatData1(res));
      this.secondDoseAppointMent.paginator = this.paginator;
    })
  }
  getAlltest(){
    this.service.getAlltesting().subscribe((res)=>{
      // this.loading=false;
      this.testing=res
      this.testing = new MatTableDataSource(res);
      this.testing.paginator = this.paginator;
    })
  
  }
  
  getCompleted(){
    // this.loading=true;
    this.service.getAppointmentreports("report_type=Completed&date="+this.date3).subscribe((res)=>{
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
jsonToLIST1(elements){
  var li=[]
  for (var i =0;i<elements.length;i++){
    li.push([
    elements[i].no,
    elements[i].date,
    elements[i].time,
    elements[i].client,
    elements[i].phone,
    elements[i].national_id,
    elements[i].dose,            
    elements[i].status
    ]);
 
}
return li;  
}
jsonToLIST2(elements){
  var li=[]
  for (var i =0;i<elements.length;i++){
    li.push([
    elements[i].no,
    elements[i].date,
    elements[i].time,
    elements[i].client,
    elements[i].phone,
    elements[i].national_id,
    ]);
    
}
return li;  
}


downloadReportFirstDose(){
  
      this.excelGeneratorService.generate("First Dose Vaccination As At "+ this.datepipe.transform(new Date(),"MMM d, y,"),
      ["Appointment No","Date","Time","Client","Mobile Number","National ID","Dose","Status"],
      this.jsonToLIST1(this.formatData1(this.firstDoseAppointMentList) )  
      )
  

  }
downloadReportSecondDose(){
  
  this.excelGeneratorService.generate("Second Dose Vaccination As At "+ this.datepipe.transform(new Date(),"MMM d, y,"),
  ["Appointment No","Date","Time","Client","Mobile Number","National ID","Dose","Status"],
  this.jsonToLIST1(this.formatData1(this.secondDoseAppointMentList) )  
  )
}

downloadReportCompleted(){
  
  this.excelGeneratorService.generate("Full Vaccination As At "+ this.datepipe.transform(new Date(),"MMM d, y,"),
  ["Appointment No","Date","Time","Client","Mobile Number","National ID"],
  this.jsonToLIST2(this.formatData2(this.completedAppointMentList) )  
  )
}

downloadReportMonthly(){
  
  this.excelGeneratorService.generate("Monthly Vaccination At  "+ this.datepipe.transform(new Date(),"MMM y,"),
  ["Appointment No","Date","Time","Client","Mobile Number","National ID","Dose","Status"],
  this.jsonToLIST1(this.formatData1(this.monthlyAppointMentList) )  
  )
}
downloadReportDaily(){
  
  this.excelGeneratorService.generate("Daily Vaccination  At "+ this.datepipe.transform(new Date(),"MMM d, y,"),
  ["Appointment No","Date","Time","Client","Mobile Number","National ID","Dose","Status"],
  this.jsonToLIST1(this.formatData1(this.firstDoseAppointMentList) )  
  )

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
            no:element.no,
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
          no:element.no,
          date:element.date,
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




