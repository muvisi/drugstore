import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../../service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-print-insurance-forms',
  templateUrl: './print-insurance-forms.component.html',
  styleUrls: ['./print-insurance-forms.component.scss']
})
export class PrintInsuranceFormsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  dataSource;
  loading;
  selected;
  idnumber;
  phonenumber;
  Claims_DATA;
  Columns: string[] = ['sn','visit_no','First','memberno','phone','insurancecompany','print']
  constructor(public service:ServiceService,public toastr:ToastrService,public router:Router) { }

  ngOnInit() {
    this.idnumber="";
    this.phonenumber="";
    this.getbooking();
    this.loading=true
    this.getPatientData();

  }
  getPatientData(){
    this.service.getPatientInfo().subscribe(
      
        data => {
          this.Claims_DATA = new MatTableDataSource <[]>(data);
          
          this.Claims_DATA.paginator = this.paginator;
          this.loading = false;
        
         
          
     
    },(err)=>{

    })}
  getbooking() {
   
    this.service.list().subscribe(
      data => {
        this.dataSource = new MatTableDataSource <[]>(data.booking);
        this.dataSource.paginator = this.paginator;
        this.loading = false;
     
       
        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }
  
  applyFilter(filterValue: string) {
    this.service.searchbooking(filterValue).subscribe((data)=>{
      console.log("RESP",data);
      this.dataSource = new MatTableDataSource(data);
    
      this.dataSource.paginator = this.paginator;
    })
  }
  
  rowSelectedView(item){
    this.router.navigate(['/dashboard/booking-details/',item.id])
  }


clickRow(item){
  console.log("Insurance",this.selected.insurance_company)
  
  if (this.selected.insurance_company=='CIGNA INTERNATIONAL') 
     {
 
  this.router.navigate(['/dashboard/cignainsurance/',item.id])
   }
   if (this.selected.insurance_company=='	SANLAM INSURANCE COMPANY LTD') 
     {
 
  this.router.navigate(['/dashboard/insurance-forms/',item.id])
   }
   if (this.selected.insurance_company=='SANLAM INSURANCE COMPANY LTD') 
   {

this.router.navigate(['/dashboard/insurance-forms/',item.id])
 }
   if (this.selected.insurance_company=='AAR INSURANCE') 
     {
  
  this.router.navigate(['/dashboard/AAR/Claimform/',item.id])
   }
   if (this.selected.insurance_company=='Sedgwick Kenya Insurance Brokers Limited') 
     {
  
  this.router.navigate(['/dashboard/sedgrick/',item.id])
   }
   if (this.selected.insurance_company=='THE CO-OPERATIVE BANK OF KENYA') 
   {

this.router.navigate(['/dashboard/cooperative-claimform/',item.id])
 }
 if (this.selected.insurance_company=='UAP OLD MUTUAL INSURANCE') 
 {

this.router.navigate(['/dashboard/uapoldmutual/',item.id])
}
if (this.selected.insurance_company=='UAP Old Mutual Insurance') 
 {

this.router.navigate(['/dashboard/uapoldmutual/',item.id])
}
if (this.selected.insurance_company=='APA INSURANCE') 
 {

this.router.navigate(['/dashboard/APA/',item.id])
}
if (this.selected.insurance_company=='BUPA INTERNATIONAL') 
 {

this.router.navigate(['/dashboard/bupaglobal/',item.id])
}
if (this.selected.insurance_company=='Bupa International') 
 {

this.router.navigate(['/dashboard/bupaglobal/',item.id])
}
if (this.selected.insurance_company=='CIC INSURANCE') 
 {

this.router.navigate(['/dashboard/cicinsurance/',item.id])
}
if (this.selected.insurance_company=='CO-PERATIVE KENYA LTD') 
 {

this.router.navigate(['/dashboard/cooperative-claimform/',item.id])
}
if (this.selected.insurance_company=='FIRST ASSURANCE') 
 {

this.router.navigate(['/dashboard/FirstAssurance/',item.id])
}
if (this.selected.insurance_company=='First Assurance') 
 {

this.router.navigate(['/dashboard/FirstAssurance/',item.id])
}
if (this.selected.insurance_company=='HERITAGE INSURANCE') 
 {

this.router.navigate(['/dashboard/heritageinsurance/',item.id])
}
if (this.selected.insurance_company=='Heritage Insurance') 
 {

this.router.navigate(['/dashboard/heritageinsurance/',item.id])
}
if (this.selected.insurance_company=='JUBILEE INSURANCE') 
 {

this.router.navigate(['/dashboard/jubileeinsurance/',item.id])
}
if (this.selected.insurance_company=='Jubilee Insurance') 
 {

this.router.navigate(['/dashboard/jubileeinsurance/',item.id])
}
if (this.selected.insurance_company=='MINET KENYA INSURANCE BROKERS LTD') 
 {

this.router.navigate(['/dashboard/minetinsurance/',item.id])
}
if (this.selected.insurance_company=='MTN INSURANCE') 
{

  this.router.navigate(['/dashboard/mtninsurance/',item.id])
  }
if (false) {
  this.toastr.warning('Payment not Insurance!')
  
}
}
}