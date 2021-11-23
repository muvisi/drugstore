import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../../service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-allbooking',
  templateUrl: './allbooking.component.html',
  styleUrls: ['./allbooking.component.scss']
})
export class AllbookingComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  dataSource;
  loading;
  idnumber;
  phonenumber;
  Columns: string[] = ['sn','First','Last','Email','gender','residence','phone']
  constructor(public service:ServiceService,public toastr:ToastrService) { }

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
       this.toastr.success('finished loading Bookings');
       
        
      
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


}