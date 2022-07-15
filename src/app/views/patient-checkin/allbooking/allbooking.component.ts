import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../../service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allbooking',
  templateUrl: './allbooking.component.html',
  styleUrls: ['./allbooking.component.scss']
})
export class AllbookingComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  patient:any={}
  dataSource;

  loading;
  selected;
  idnumber;
  mobile;
  insurance_company;
  phonenumber;
  insurance;
  insurance_companys;
  Columns: string[] = ['sn','created','First','payment','phone','insurancecompany','action']
  constructor(public service:ServiceService,public toastr:ToastrService,public router:Router) { }

  ngOnInit() {
    this.idnumber="";
    this.phonenumber="";
    this.getbooking();
    this.loading=true

  }
  getbooking() {
   
    this.service.list('').subscribe(
      data => {
        this.dataSource = new MatTableDataSource <[]>(data.booking);
        this.dataSource.paginator = this.paginator;
        this.loading = false;
        console.log("HEALTHIX",data);
        this.patient = data;
      this.insurance=this.patient.insurance_company
      // this.insurance_companys=this.insurance.toUpperCase( )
      console.log("resp",this.insurance_companys)
       
        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }
  
  applyFilter() {
    this.service.searchbooking(this.mobile).subscribe((data)=>{
      console.log("RESP",data);
      this.dataSource = new MatTableDataSource(data);
    
      this.dataSource.paginator = this.paginator;
    })
  }
  
  rowSelectedView(item){
    this.router.navigate(['/dashboard/booking-details/',item.id])
  }


  clickRow(item){
    console.log("Insurance",(this.selected.insurance_company).toUpperCase())
    
    if ((this.selected.insurance_company).toUpperCase()=='CIGNA INSURANCE') 
       {
   
    this.router.navigate(['/dashboard/cignainsurance/',item.id])
     }
     if ((this.selected.insurance_company).toUpperCase()=='	SANLAM INSURANCE COMPANY LTD') 
       {
   
    this.router.navigate(['/dashboard/insurance-forms/',item.id])
     }
  //    if (this.selected.insurance_company=='SANLAM INSURANCE COMPANY LTD') 
  //    {
  
  // this.router.navigate(['/dashboard/insurance-forms/',item.id])
  //  }
     if ((this.selected.insurance_company).toUpperCase()=='AAR INSURANCE') 
       {
    
    this.router.navigate(['/dashboard/AAR/Claimform/',item.id])
     }
     if ((this.selected.insurance_company).toUpperCase()=='SEDGWICK KENYA INSURANCE BROKERS LIMITED') 
       {
    
    this.router.navigate(['/dashboard/sedgrick/',item.id])
     }
     if ((this.selected.insurance_company).toUpperCase()=='THE CO-OPERATIVE BANK OF KENYA') 
     {
  
  this.router.navigate(['/dashboard/cooperative-claimform/',item.id])
   }
   if ((this.selected.insurance_company).toUpperCase()=='UAP OLD MUTUAL INSURANCE') 
   {
  
  this.router.navigate(['/dashboard/uapoldmutual/',item.id])
  }
  // if (this.selected.insurance_company=='UAP Old Mutual Insurance') 
  //  {
  
  // this.router.navigate(['/dashboard/uapoldmutual/',item.id])
  // }
  if ((this.selected.insurance_company).toUpperCase()=='APA INSURANCE') 
   {
  
  this.router.navigate(['/dashboard/APA/',item.id])
  }
  if ((this.selected.insurance_company).toUpperCase()=='BUPA INTERNATIONAL') 
   {
  
  this.router.navigate(['/dashboard/bupaglobal/',item.id])
  }
  // if (this.selected.insurance_company=='Bupa International') 
  //  {
  
  // this.router.navigate(['/dashboard/bupaglobal/',item.id])
  // }
  if ((this.selected.insurance_company).toUpperCase()=='CIC INSURANCE') 
   {
  
  this.router.navigate(['/dashboard/cicinsurance/',item.id])
  }
  if ((this.selected.insurance_company).toUpperCase()=='CO-PERATIVE KENYA LTD') 
   {
  
  this.router.navigate(['/dashboard/cooperative-claimform/',item.id])
  }
  if ((this.selected.insurance_company).toUpperCase()=='FIRST ASSURANCE') 
   {
  
  this.router.navigate(['/dashboard/FirstAssurance/',item.id])
  }
  // if (this.selected.insurance_company=='First Assurance') 
  //  {
  
  // this.router.navigate(['/dashboard/FirstAssurance/',item.id])
  // }
  if ((this.selected.insurance_company).toUpperCase()=='HERITAGE INSURANCE') 
   {
  
  this.router.navigate(['/dashboard/heritageinsurance/',item.id])
  }
  // if ((this.selected.insurance_company).toUpperCase()=='Heritage Insurance') 
  //  {
  
  // this.router.navigate(['/dashboard/heritageinsurance/',item.id])
  // }
  if ((this.selected.insurance_company).toUpperCase()=='JUBILEE INSURANCE') 
   {
  
  this.router.navigate(['/dashboard/jubileeinsurance/',item.id])
  }
  // if (this.selected.insurance_company=='Jubilee Insurance') 
  //  {
  
  // this.router.navigate(['/dashboard/jubileeinsurance/',item.id])
  // }
  if ((this.selected.insurance_company).toUpperCase()=='MINET KENYA INSURANCE BROKERS LTD') 
   {
  
  this.router.navigate(['/dashboard/minetinsurance/',item.id])
  }
  if ((this.selected.insurance_company).toUpperCase()=='MTN INSURANCE') 
  {
  
    this.router.navigate(['/dashboard/mtninsurance/',item.id])
    }
 else {
    this.toastr.warning('The Payment Mode May Not Be Insurance!')
    
  }
  }
  }