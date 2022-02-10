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
  dataSource;
  loading;
  selected;
  idnumber;
  phonenumber;
  Columns: string[] = ['sn','created','First','gender','payment','residence','phone','insurancecompany','symptoms','print']
  constructor(public service:ServiceService,public toastr:ToastrService,public router:Router) { }

  ngOnInit() {
    this.idnumber="";
    this.phonenumber="";
    this.getbooking();
    this.loading=true

  }
  getbooking() {
   
    this.service.list().subscribe(
      data => {
        this.dataSource = new MatTableDataSource <[]>(data.booking);
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      //  this.toastr.success('finished loading Bookings');
       
        
      
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
  
//   sanlamInsuranceClicked(item){
//     this.router.navigate(['/dashboard/insurance-forms/',item.id])
//   }
//   apaInsuranceClicked(item){
//     this.router.navigate(['/dashboard/APA/',item.id])
//   }
//   sedgrickInsuranceClicked(item){
//     this.router.navigate(['/dashboard/sedgrick/',item.id])

//   }
//   aarInsuranceClicked(item){
//     // console.log(this.selected.specialist);
//     console.log("RESP",this.selected.insurance_company)
//     this.router.navigate(['/dashboard/AAR/Claimform/',item.id])

//   }
  
//   coopInsuranceClicked(item){
//     this.router.navigate(['/dashboard/cooperative-claimform/',item.id])
//   }
// medInsuranceClicked(item){
//   this.router.navigate(['/dashboard/FirstAssurance/',item.id])

// }
// uapInsuranceClicked(item){
//   this.router.navigate(['/dashboard/uapoldmutual/',item.id])

// }
// mtnInsuranceClicked(item){

//   this.router.navigate(['/dashboard/mtninsurance/',item.id])
// }

// heritageInsuranceClicked(item){
//   this.router.navigate(['/dashboard/heritageinsurance/',item.id])
// }
// minetInsuranceClicked(item){
//   this.router.navigate(['/dashboard/minetinsurance/',item.id])
// }
// jubileeInsuranceClicked(item){
//   this.router.navigate(['/dashboard/jubileeinsurance/',item.id])

// }
// cignaInsuranceClicked(item){
//   this.router.navigate(['/dashboard/cignainsurance/',item.id])

// }
// cicInsuranceClicked(item){
//   this.router.navigate(['/dashboard/cicinsurance/',item.id])

// }
// bupaInsuranceClicked(item){
//   this.router.navigate(['/dashboard/bupaglobal/',item.id])

// }
clickRow(item){
  console.log("Insurance",this.selected.insurance_company)
  
  if (this.selected.insurance_company=='Cigna insurance') 
     {
 
  this.router.navigate(['/dashboard/cignainsurance/',item.id])
   }
   if (this.selected.insurance_company=='AAR INSURANCE') 
     {
  
  this.router.navigate(['/dashboard/AAR/Claimform/',item.id])
   }

if (false) {
  console.log('This will never executed.');
}
  // this.router.navigate(['/dashboard/',this.selected.insurance_company])
}
}