import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../../service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-queuelist',
  templateUrl: './queuelist.component.html',
  styleUrls: ['./queuelist.component.scss']
})
export class QueuelistComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  dataSource;
  loading;
  phonenumber;
  Columns: string[] = ['sn','checkin','First','Last','Email','gender','residence','phone']

  constructor(public service:ServiceService, public toastr:ToastrService) { }

  ngOnInit() {
    this.phonenumber="";
    this.getqueue();
    this.loading=true
  }
  getqueue() {
    this.service.queuelist().subscribe(
      data => {
        this.dataSource = new MatTableDataSource <[]>(data.queuelist);
        this.dataSource.paginator = this.paginator;
        this.loading = false;
        this.toastr.success('finished loading Quelist');
        
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }
  applyFilter(filterValue: string) {
    this.service.searchpatient(filterValue).subscribe((data)=>{
      console.log("RESP",data);
      this.dataSource = new MatTableDataSource(data);
      // this.phonenumber=data.list
      this.dataSource.paginator = this.paginator;
    })
  }


}