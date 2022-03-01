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
  selected;
  event;
  filter_data;
  loading;
  // idnumber;
  phonenumber;
  Columns: string[] = ['sn','department','specialist','calendar',]

  constructor(public service:ServiceService,private toastr:ToastrService, public router:Router,public http:HttpClient) { }
 
 ngOnInit() {
 
 
    this.getdepartments();
   
  }
  getdepartments() {
    this.service.getdepartment().subscribe(
      data => {
        this.dataSource = new MatTableDataSource <[]>(data);
        this.dataSource.paginator = this.paginator;
        
      
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

  }
   
  

  

