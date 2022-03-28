import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../../service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-maternity-list',
  templateUrl: './maternity-list.component.html',
  styleUrls: ['./maternity-list.component.scss']
})
export class MaternityListComponent implements OnInit {

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
  Columns: string[] = ['sn','created','client','phone','payment','date','time','action']
  constructor(public service:ServiceService,public toastr:ToastrService,public router:Router) { }
  ngOnInit() {
    this.idnumber="";
    this.phonenumber="";
    this.getbooking();


  }

  getbooking() {
    this.loading=true;
   
    this.service.getMaternityBookingList().subscribe(
      data => {
        this.dataSource = new MatTableDataSource <[]>(data);
        this.dataSource.paginator = this.paginator;
        this.loading = false;
 

        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }
  
  applyFilter() {
    this.service.searchMaternityBooking(this.mobile).subscribe((data)=>{
      console.log("RESP",data);
      this.dataSource = new MatTableDataSource(data);
    
      this.dataSource.paginator = this.paginator;
    })
  }
  
  rowSelectedView(item){
    this.router.navigate(['/dashboard/maternity-details/',item.id])
  }

  downloadExcel(){
    window.open(this.service.geMaternityDownloadUrl(), "_blank")
  }
}


