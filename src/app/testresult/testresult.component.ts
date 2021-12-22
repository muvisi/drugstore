import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-testresult',
  templateUrl: './testresult.component.html',
  styleUrls: ['./testresult.component.scss']
})
export class TestresultComponent implements OnInit {

  dataSource;
  appointmentsList;
  loading=false;
  idnumber;
  phonenumber;
  appointmentdate;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  Columns: string[] = ['sn','date','time','Client','phone','national_id','status','action']
  constructor(public service:ServiceService,public toastr: ToastrService,public router:Router) { }
  ngOnInit() {
    this.idnumber="";
    this.phonenumber="";
    this.getRecords();

  }
  deleteAppointment(item,row){
    this.loading=true;
    console.log(item);
    this.service.deleteAppointment(item.id).subscribe((res)=>{
    this.loading=false;
      this.appointmentsList.splice(row,1)
      this.dataSource = new MatTableDataSource(this.appointmentsList); 
      this.toastr.success("Appointment Deleted");
      this.dataSource._updateChangeSubscription() 
      this.dataSource.paginator = this.paginator;
      
    })
  }
  getRecords(){
    // this.loading=true;
    this.service.getAppointments().subscribe((res)=>{
      this.loading=false;
      this.appointmentsList=res.results
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    })
  }
  applyFilter(filterValue: string) {
    this.service.searchAppointments(filterValue).subscribe((res)=>{
      console.log("RESP",res);
      this.dataSource = new MatTableDataSource(res);
      this.appointmentsList=res.results
      this.dataSource.paginator = this.paginator;
    })
  }
  rowClick(item){
    this.router.navigate(['/dashboard/appointment-details/',item.id])
  }
}
