import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { startOfDay } from '@fullcalendar/core/datelib/marker';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { ToastrService } from 'ngx-toastr';
import { endpoint, ServiceService } from '../../../service.service';
// import { MbscEventcalendarOptions, Notifications, MbscCalendarEvent } from '@mobiscroll/angular';
import { HttpClient } from '@angular/common/http';
import { element } from 'protractor';

@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.scss']
})
export class SpecialtyComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;

  dataSource;
  dataSourcetoday;
  selected;
  event;
  filter_data;
  loading;
  appointment_count
  cal_data
  // idnumber;
  phonenumber;
  calendar=''
  events: any[];
  Columns: string[] = ['specialist','count','calendar',]

  constructor(public service:ServiceService,private toastr:ToastrService, public router:Router,public http:HttpClient) { }
 
 ngOnInit() {
 
 
    this.getdepartments();
    this.getdepartmentstoday()
   
  }
  getdepartments() {
    this.service.getdepartment().subscribe(
      data => {
        this.appointment_count=data.total
        console.log("TOTALS HERE",this.appointment_count)
        console.log("ALL DATA",this.dataSource)
        this.dataSource = new MatTableDataSource <[]>(data.data);
        this.dataSource.paginator = this.paginator;
        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }
  getdepartmentstoday() {
    this.service.getdepartment().subscribe(
      data => {
        console.log("TODAY DATA",this.dataSourcetoday)
        this.dataSourcetoday = new MatTableDataSource <[]>(data.today);
        this.dataSourcetoday.paginator = this.paginator;
        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }
  
  clickRow(){
    console.log(this.selected.specialist);
    this.service.filtercalendar({specialist:this.selected.specialist}).subscribe((res)=>{
   
      console.log("RESP",res)
      
      // this.toastr.success('Successfully selected','Success');
     

      
      })
      this.router.navigate(['/dashboard/calendar/',this.selected.specialist])
     
    }
  ViewAllBookings(){
   ;
    this.service.filtercalendar({specialist:this.selected.specialist}).subscribe((res)=>{
   
      console.log("RESP",res)
      
      // this.toastr.success('Successfully selected','Success');
     

      
      })
      this.router.navigate(['/dashboard/calendar/',this.selected.specialist])
     
    }
    ViewAll(){
     
      
       this.service.filtercalendarr().subscribe((res)=>{
        // if(res[0].Description=='Vaccination Second Dose')
        // {
        //   ('background-color', '#000');
        // }


        
         console.log("OUR DESCRIPTION",res[0].Description)
        
         })
         console.log("tumeanza sasa")

         this.router.navigate(['/dashboard/calendar/',this.calendar])
        
       }

  }
   
  

  

