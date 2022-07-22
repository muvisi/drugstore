import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../service.service';
@Component({
  selector: 'app-viewmaternity',
  templateUrl: './viewmaternity.component.html',
  styleUrls: ['./viewmaternity.component.scss']
})
export class ViewmaternityComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  loading;
  dataSourceMaternity;
  MaternityColumns: string[] = ['sn','created','client','phone','payment','date','time','action']
  maternity_mobile;


  constructor(public service:ServiceService,public toastr:ToastrService,public router:Router) { }


  ngOnInit() {
  this.getMaternitybooking();
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


}
