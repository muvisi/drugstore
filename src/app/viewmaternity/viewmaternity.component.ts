import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../service.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-viewmaternity',
  templateUrl: './viewmaternity.component.html',
  styleUrls: ['./viewmaternity.component.scss']
})
export class ViewmaternityComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;

  loading;
  dataSourceMaternity;
  dataSourcenormalMaternity;
  dataSourceMaternityadmitted;
  dataSourceMaternityadded;
  dataSourceMaternitycompleted;
  dataSourcecsMaternity;
  MaternityColumnsone:string[] = ['sn','created','client','phone','payment','date','time','action','view']
  MaternityColumns: string[] = ['sn','created','client','phone','payment','date','time','action']
  maternity_mobile;
  MaternityColumns2: string[] = ['sn','created','client','phone','payment','date','time','action','calendar']


  constructor(public service:ServiceService,public toastr:ToastrService,public router:Router) { }


  ngOnInit() {
  this.getMaternitybooking();
  this.getCSectionDelivery();
  this.getNormalDelivery();
  this. getAdmittedPatients();
  this.getCompletedmaternityPatients();
  this.AddedMaternittyBooking()
  }






  getMaternitybooking() {
    try{
      if(localStorage.getItem('maternity_booking2')!=null){
      this.dataSourceMaternity = new MatTableDataSource(JSON.parse(localStorage.getItem('maternity_booking2')));
       this.dataSourceMaternity.paginator = this.paginator;
      }else{
        this.loading=true;
      }
   }catch(err){}
    
   
    this.service.getMaternityBookingList().subscribe(
      data => {
        console.log("maternity",data)
        this.dataSourceMaternity = new MatTableDataSource(data);
        this.dataSourceMaternity.paginator = this.paginator;
        this.loading = false;
        try{
          localStorage.setItem('maternity_booking2',JSON.stringify(data))
        }catch(error){} 

        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }
  getAdmittedPatients(){
    this.service.alladmittedmaternitypatients().subscribe(
      data => {
        console.log("admittedcompletedmaternity",data)
        this.dataSourceMaternityadmitted = new MatTableDataSource(data);
        this.dataSourceMaternityadmitted.paginator = this.paginator;
        this.loading = false;
        try{
          localStorage.setItem('maternity_booking3',JSON.stringify(data))
        }catch(error){} 

        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );

  }
  getCompletedmaternityPatients(){
    this.service.alladmittedmaternitycompletedpatients().subscribe(
      data => {
        console.log("aditedmaternity",data)
        this.dataSourceMaternitycompleted = new MatTableDataSource(data);
        this.dataSourceMaternitycompleted.paginator = this.paginator;
        this.loading = false;
        try{
          localStorage.setItem('maternity_booking5',JSON.stringify(data))
        }catch(error){} 

        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );

  }
  getCSectionDelivery(){
    this.service.gecstMaternityBookingList().subscribe(
      data => {
        console.log("csmaternity",data)
        this.dataSourcecsMaternity = new MatTableDataSource(data);
        this.dataSourcecsMaternity.paginator = this.paginator;
        this.loading = false;
        try{
          localStorage.setItem('maternity_booking2',JSON.stringify(data))
        }catch(error){} 

        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );

  }
  getNormalDelivery(){
    this.service.getnormalMaternityBookingList().subscribe(
      data => {
        console.log("normalmaternity",data)
        this.dataSourcenormalMaternity = new MatTableDataSource(data);
        this.dataSourcenormalMaternity.paginator = this.paginator;
        this.loading = false;
        try{
          localStorage.setItem('maternity_booking2',JSON.stringify(data))
        }catch(error){} 

        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );

  }
  AddedMaternittyBooking() {
    this.service.getAddedmaternity().subscribe((data)=>{
      console.log(" AddedMaternittyBooking",data);
      this.dataSourceMaternityadded = new MatTableDataSource(data);
    
      this.dataSourceMaternityadded.paginator = this.paginator;
    })
  }
  
  applyMaternityFilter() {
    this.service.searchMaternityBooking(this.maternity_mobile).subscribe((data)=>{
      console.log("tyrtyr",data);
      this.dataSourceMaternity = new MatTableDataSource(data);
    
      this.dataSourceMaternity.paginator = this.paginator;
    })
  }
  
  rowMaternitySelectedView(item){
    this.router.navigate(['/dashboard/maternity-details/',item.id])
  }

  downloadMaternityExcel(){
    window.open(this.service.geMaternityDownloadUrl(), "_blank")
  }
  MaternityDownloadDischargeDownloadUrl(){
    window.open(this.service.MaternityDownloadDischargeDownloadUrl(), "_blank")
  }

MaternityDownloadAdmittedDownloadUrl(){
  window.open(this.service.MaternityDownloadAdmittedDownloadUrl(), "_blank")
}
MaternityDownloadNormalDelivery(){
  window.open(this.service.MaternityDownloadNormalDelivery(), "_blank")
}
MaternityDownloadCsection(){
  window.open(this.service.MaternityDownloadCsection(), "_blank")
}
ViewMaternityCalendar(){

  this.router.navigate(['/dashboard/view-maternity-calendar/'])
}


}
