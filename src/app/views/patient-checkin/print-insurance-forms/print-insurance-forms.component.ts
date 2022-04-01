import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../../service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable, OperatorFunction } from 'rxjs';
@Component({
  selector: 'app-print-insurance-forms',
  templateUrl: './print-insurance-forms.component.html',
  styleUrls: ['./print-insurance-forms.component.scss']
})
export class PrintInsuranceFormsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  dataSource;

  todays_DATA;
  loading;
  selected;
  idnumber;
  searchText;
  searchTextToday;
  encounterText;
  phonenumber;
  Claims_DATA;
  Columns: string[] = ['sn','visit_no','phone','name','insurancecompany','member_sign','doctor_sign','print']
  
  constructor(public service:ServiceService,public toastr:ToastrService,public router:Router) { }
  doctors=[];
  doctors_search
  doctors_search_today;
  public insurance_s: any;

  formatter = (result: string) => result.toUpperCase();

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.doctors.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  
  ngOnInit() {
    this.idnumber="";
    this.phonenumber="";
    this.getTodays_data();
    this.getPatientData();
    this.getInsuranceDoctor();

  }

  getInsuranceDoctor(){
    this.service.getInsuranceDoctors().subscribe(
      data=>{
          
          for (var i=0;i<data.length;i++){
            this.doctors.push(data[i]['doctor']);
          }
          console.log('doctors',this.doctors);
          

      },
      err=>{

      }
    )
  }
  getPatientData(){
    this.loading=true;
    this.service.getPatientInfo().subscribe(
      
        data => {
          this.loading=false;
          this.Claims_DATA = new MatTableDataSource <[]>(data);
          
          this.Claims_DATA.paginator = this.paginator;
        
         
          
     
    },(err)=>{
      this.loading=false;

    })}


    getTodays_data(){
      this.loading=true;
      this.service.getTodaysInsuranceDetails().subscribe(
        
          data => {
            this.loading=false;
            this.todays_DATA = new MatTableDataSource <[]>(data);
            
            this.todays_DATA.paginator = this.paginator;
          
           
            
       
      },(err)=>{
        this.loading=false;
  
      })}
  
    
    clickSearch(){
      
      
    }


    clickSearchTodays(){
      this.loading=true;
      console.log(this.searchTextToday);
      var query="?search="
      if(this.searchTextToday!='' && this.searchTextToday!=null && this.searchTextToday!=undefined){
        query+=this.searchTextToday;
      }

      if(this.doctors_search_today!=''&& this.doctors_search_today!=null && this.doctors_search_today!=undefined){
        query+="&insuranceVisit__doctor="+this.doctors_search_today
      }
      this.service.getTodayInsuranceVisitSearch(query).subscribe((res)=>{
      this.loading=false;
      this.todays_DATA = new MatTableDataSource <[]>(res);
          
      this.todays_DATA.paginator = this.paginator;
      },(err)=>{
        this.loading=false;

      })
    }
    clickRequest(){
      this.loading=true;
      this.service.getRequestEncounter(this.encounterText).subscribe((res)=>{
      this.loading=false;
      this.todays_DATA = new MatTableDataSource <[]>(res);
          
      this.todays_DATA.paginator = this.paginator;
      },(err)=>{
        this.loading=false;
      })
      
    }


  
  rowSelectedView(item){
    this.router.navigate(['/dashboard/booking-details/',item.id])
  }


clickRow(item){
  console.log(item)
  console.log("Insurance",this.selected.insurance_company)
  
  if (this.selected.insurance_company=='CIGNA INTERNATIONAL') 
     {
 
  this.router.navigate(['/dashboard/cignainsurance/',item.id])
   }
  //  if (this.selected.insurance_company=='	SANLAM INSURANCE COMPANY LTD') 
  //    {
 
  // this.router.navigate(['/dashboard/insurance-forms/',item.id])
  //  }
//    if (this.selected.insurance_company=='SANLAM INSURANCE COMPANY LTD') 
//    {

// this.router.navigate(['/dashboard/insurance-forms/',item.id])
//  }
   if (this.selected.insurance_company=='AAR INSURANCE') 
     {
  
  this.router.navigate(['/dashboard/AAR/Claimform/',item.id])
   }
  //  if (this.selected.insurance_company=='Sedgwick Kenya Insurance Brokers Limited') 
  //    {
  
  // this.router.navigate(['/dashboard/sedgrick/',item.id])
  //  }
//    if (this.selected.insurance_company=='THE CO-OPERATIVE BANK OF KENYA') 
//    {

// this.router.navigate(['/dashboard/cooperative-claimform/',item.id])
//  }
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
// if (this.selected.insurance_company=='BUPA INTERNATIONAL') 
//  {

// this.router.navigate(['/dashboard/bupaglobal/',item.id])
// }
// if (this.selected.insurance_company=='Bupa International') 
//  {

// this.router.navigate(['/dashboard/bupaglobal/',item.id])
// }
// // if (this.selected.insurance_company=='CIC INSURANCE') 
//  {

// this.router.navigate(['/dashboard/cicinsurance/',item.id])
// }
// if (this.selected.insurance_company=='CO-PERATIVE KENYA LTD') 
//  {

// this.router.navigate(['/dashboard/cooperative-claimform/',item.id])
// }
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
// if (this.selected.insurance_company=='Heritage Insurance') 
//  {

// this.router.navigate(['/dashboard/heritageinsurance/',item.id])
// }
// if (this.selected.insurance_company=='JUBILEE INSURANCE') 
//  {

// this.router.navigate(['/dashboard/jubileeinsurance/',item.id])
// }
// if (this.selected.insurance_company=='Jubilee Insurance') 
//  {

// this.router.navigate(['/dashboard/jubileeinsurance/',item.id])
// }
if (this.selected.insurance_company=='MINET KENYA INSURANCE BROKERS LTD') 
 {

this.router.navigate(['/dashboard/minetinsurance/',item.id])
}
// if (this.selected.insurance_company=='MTN INSURANCE') 
// {

//   this.router.navigate(['/dashboard/mtninsurance/',item.id])
//   }
if (false) {
  this.toastr.warning('Payment not Insurance!')
  
}
}
}