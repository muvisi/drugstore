import { Component, OnInit,ViewChild } from '@angular/core';
import { ServiceService } from '../../../service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pexperience',
  templateUrl: './pexperience.component.html',
  styleUrls: ['./pexperience.component.scss']
})
export class PexperienceComponent implements OnInit {
@ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;

  dataSource;
  loading;
  // idnumber;
  phonenumber;
  Columns: string[] = ['sn','First','gender','residence','phone']

  constructor(public service:ServiceService,private toastr:ToastrService) { }
 
 ngOnInit() {
  // this.idnumber="";
  this.phonenumber="";
    this.getallp();
    this.loading=true
  }
  getallp() {
    this.service.alllist().subscribe(
      data => {
        this.dataSource = new MatTableDataSource <[]>(data.list);
        this.dataSource.paginator = this.paginator;
        this.loading = false;
        // this.toastr.success('finished loading Patients');
        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }
  applyFilter(filterValue: string) {
    this.service.searchFor(filterValue).subscribe((data)=>{
      console.log("RESP",data);
      this.dataSource = new MatTableDataSource(data);
      // this.phonenumber=data.list
      this.dataSource.paginator = this.paginator;
    })
  }

}