import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../../service.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  loading;
  dataSourceMaternity;
  MaternityColumns: string[] = ['sn','created','client','phone','payment','date','time','action']
  maternity_mobile;
  bookingcount;

  TestingColumns: string[] = ['sn','created','date','time','Client','phone','national_id','status','action']
  dataSourceTesting;
  mobile_testing;


  VaccinationColumns: string[] = ['sn','created','date','time','Client','phone','national_id','dose','vaccine','status','action']
  dataSourceVaccination;
  mobile_vaccination;



  BookingColumns: string[] = ['sn','created','First','payment','phone','clinic','action']
  dataSourceBooking;
  mobile_booking;
  dataSourcenotcalled;
  clinics ;
  clinic_department;
  RegistrationColumns: string[] = ['sn','created','First','payment','phone','clinic','action']
  dataSourceRegistration;
  mobile_registrations;
  user = JSON.parse(sessionStorage.getItem('user'));
  constructor(public service:ServiceService,public toastr:ToastrService,public router:Router) { }
  ngOnInit() {

    this.getMaternitybooking();
    this.getTestingRecords();
    // this.getVaccinationRecords();
    this.getBookingRecords();
    this.applyFilterRegistrations();
    this.getRegistartionRecords();
     this.service.getclinicsdepartment().subscribe((data)=>{
      console.log("Departments",data);
      this.clinics = data
    
      // this.dataSourceBooking.paginator = this.paginator;
    })
  
    this.service.getcovidVaccinationdata().subscribe((res)=>{

      this.dataSourceVaccination = new MatTableDataSource((res));
      this.dataSourceVaccination.paginator = this.paginator;
    })
  }

  getMaternitybooking() {
    this.loading=true;
   
    this.service.getMaternityBookingList().subscribe(
      data => {
        console.log("maternity",data)
        this.dataSourceMaternity = new MatTableDataSource(data);
        this.dataSourceMaternity.paginator = this.paginator;
        this.loading = false;
 

        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
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



  getTestingRecords(){
    // this.loading=true;
    this.service.getAlltesting().subscribe((res)=>{
      this.loading=false;
 
      this.dataSourceTesting = new MatTableDataSource(res);
      this.dataSourceTesting.paginator = this.paginator;
    })
  }

  applyFilterTesting(filterValue: string) {
    this.service.searchtest(filterValue).subscribe((res)=>{
      console.log("RESP",res);
      this.dataSourceTesting = new MatTableDataSource(res);
      this.dataSourceTesting=res.results
      this.dataSourceTesting.paginator = this.paginator;
    })
  }
  rowClickTesting(item){
    this.router.navigate(['/dashboard/testing-details/',item.id])
  }


  getVaccinationRecords(){
    this.loading=true;
    this.service.getAppointments().subscribe((res)=>{
      this.loading=false;
      this.dataSourceVaccination = new MatTableDataSource(res);
      this.bookingcount=this.dataSourceVaccination.length;
      console.log('fnvfjvfjvfjv',this.bookingcount)
      this.dataSourceVaccination.paginator = this.paginator;
    },(err)=>{
      this.loading=false;
    })
  }
  applyFilterVaccination(filterValue: string) {
    this.service.searchAppointments(filterValue).subscribe((res)=>{
      console.log("RESP",res);
      this.dataSourceVaccination = new MatTableDataSource(res);

      this.dataSourceVaccination.paginator = this.paginator;
    })
  }
  rowClickVaccination(item){
    this.router.navigate(['/dashboard/appointment-details/',item.id])
  }


  getBookingRecords() {
   
    this.service.list2("").subscribe(
      data => {
        this.dataSourceBooking = new MatTableDataSource(data.booking);
        this.dataSourceBooking.paginator = this.paginator;
        this.loading = false;

        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }
  
  applyFilterBooking() {
    this.service.searchbooking(this.mobile_booking).subscribe((data)=>{
      console.log("RESP",data);
      this.dataSourceBooking = new MatTableDataSource(data);
    
      this.dataSourceBooking.paginator = this.paginator;
    })
  }
  
  rowSelectedBookingView(item){
    this.router.navigate(['/dashboard/booking-details/',item.id])
  }

  getRegistartionRecords() {
   
    this.service.registrations().subscribe(
      data => {
        console.log(data)
        this.dataSourceRegistration = new MatTableDataSource <[]>(data.booking);
        this.dataSourceRegistration.paginator = this.paginator;
        // this.dataSourceRegistration=data.booking
        // this.loading = false;

        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }


  applyFilterRegistrations() {
    this.service.searchregistrations(this.mobile_registrations).subscribe((data)=>{
      console.log("RESP",data);
      this.dataSourceRegistration = new MatTableDataSource(data);
    
      this.dataSourceRegistration.paginator = this.paginator;
    })
  }

  rowSelectedViewRegistrations(item){
    this.router.navigate(['/dashboard/booking-details/',item.id])
  }

FilterDepartment(){
  console.log('selected',this.clinic_department)
  this.service.list({department:this.clinic_department}).subscribe(
    data => {
      this.dataSourceBooking = new MatTableDataSource(data.booking);
      this.dataSourceBooking.paginator = this.paginator;
      this.loading = false;

      
    
    },
   
    err => console.error(err),
   
    () => console.log('There is an error')
  );




}



}
