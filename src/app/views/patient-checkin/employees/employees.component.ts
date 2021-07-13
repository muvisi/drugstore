import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../../service.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  selectedUser:any={};
  dataSource;
  displayedColumns: string[] = ['sn','name', 'username', 'phone', 'email','role','view','edit','deactivate','activate'];
  employee: any={};
  @ViewChild('userModal', { static: false }) userModal: ModalDirective;
  @ViewChild('uSort', {static: true}) uSort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  hospital: any ={};
  edit: boolean;
  provider_list: any=[];
  user: any;

  constructor(public  service:ServiceService,public toastr:ToastrService,public router:Router) { }

  ngOnInit() {
    this.employeesList();
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }
  addUser() {
    console.log(this.employee);
    this.service.createUser(this.employee).subscribe((res) => {
      this.ngOnInit();
      this.toastr.success('Successfully Added Employee');
      this.employee = {};
      this.userModal.hide();
    },
    (error)=>{
      this.toastr.error('Adding Employee Failed');
    }
    );
  }
  
  updateUser() {
    console.log(this.employee);
    this.service.updateUser(this.employee).subscribe((res) => {
      this.ngOnInit();
      this.toastr.success('Successfully Updated User');
      this.userModal.hide();
      this.employee = {};
      this.edit = true;
    },
    (error)=>{
      this.toastr.error('Update request failed');
    }
    );
  }
  employeesList() {
  this.service.getDoctors().subscribe((res) => {
  this.dataSource = new MatTableDataSource<[]>(res.results)
  this.dataSource.sort = this.uSort;
  this.dataSource.paginator = this.paginator;

  });
  }
  deactivate(item){
    
    if(item.is_active){
      const data={
        "is_active":false,
        "email":item.email
      }
      this.service.deactivateUser(data,item.id).subscribe((res)=>{
        this.toastr.error('Successfully deactivated user' + ' '+ item.name);
        this.selectedUser = res;
        this.employeesList();
      })
    } else{
      const data={
        "is_active":true,
        "email":item.email
      }
      this.service.deactivateUser(data,item.id).subscribe((res)=>{
      this.selectedUser = res;
      this.toastr.info('Successfully activated user' + ' '+ item.name);
        this.employeesList();
      })
    }
   
  }
  view(item){
    this.router.navigate(['/dashboard/user-account',item.id])
  }
  searchUser(filterValue){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getHospitals(){
    this.service.providerDetails(this.user.hospital).subscribe((res) => {
      this.provider_list = res;
    });
  }
}
