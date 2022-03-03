import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../../service.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Console } from 'console';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.scss']
})
export class UsermanagementComponent implements OnInit {
  selectedUser:any={};
  dataSource;
  departments =[];
  displayedColumns: string[] = ['sn','name', 'phone','department', 'email','role','edit','deactivate','activate','reset','delete'];
  employee: any={};
  @ViewChild('staticModal', { static: false }) staticModal: ModalDirective;
  @ViewChild('resetModal', { static: false }) resetModal: ModalDirective;
  @ViewChild('userModal', { static: false }) userModal: ModalDirective;
  @ViewChild('addModal', { static: false }) addModal: ModalDirective;
  @ViewChild('uSort', {static: true}) uSort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  hospital: any ={};
  edit: boolean;
  provider_list: any=[];
  user: any;
  loading = false;
  selected;
  registerForm: FormGroup;
  resetForm: FormGroup;
  constructor(public  service:ServiceService,public toastr:ToastrService,public router:Router,public formBuilder:FormBuilder) { }
  ngOnInit() {
    this.AccountUsers();
    
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      department:['',Validators.required],
      phone:['',Validators.required],
      role:[''],
      gender:['',Validators.required]

  });
  this.resetForm = this.formBuilder.group({
    password: ['', Validators.required],
   
    confirmpassword: ['', Validators.required],
    email: ['', Validators.required],
   

});

  
   
    
  
  }
  AccountUsers(){
    this.service.getAllUsers().subscribe((res) => {
      this.dataSource = new MatTableDataSource<[]>(res)
      console.log("RESP DATA",this.dataSource)
     
      this.dataSource.paginator = this.paginator;
    
      });
  }
  employeeEdit(item){
    this.employee = item;
    console.log('employees',item);
    this.userModal.show();
  }
  updateUser() {
    console.log("resp",this.employee)
    this.service.updateuser(this.employee).subscribe((res) => {
      
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
  addUser() {
    if(this.registerForm.valid){
    console.log("DATA",this.registerForm.value)
      this.loading = true;
    this.service.createUser(this.registerForm.value).subscribe((res) => {
      this.ngOnInit();
      this.toastr.success('Successfully Added User');
      this.addModal.hide();
      this.loading = false;
    },
    (error)=>{
      this.toastr.error(error.error.error);
      this.loading = false;
    }
    );
    }
  }
  reset(){
    console.log("RESETDATA",this.selected.email)
   
    this.resetModal.show()
  }

resetUser(){
  this.service.resetUser(this.resetForm.value).subscribe((res) => {
      
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
delete(){
  console.log(this.selected);
  this.service.deleteUSER(this.selected.id).subscribe((res)=>{
  this.ngOnInit();
  this.toastr.success('Successfully deleted','Success');
  this.staticModal.hide();
  })
}
deactivate(item){
  if(item.is_active){
    const data={
      "is_active":false,
      "email":item.email
    }
    this.service.deactivateUser(data,item.id).subscribe((res)=>{
      this.toastr.error('Successfully Deactivated user' + ' '+ item.first_name +' '+item.last_name);
      this.selectedUser = res;
      this. AccountUsers();
    })
  } else{
    const data={
      "is_active":true,
      "email":item.email
    }
    this.service.deactivateUser(data,item.id).subscribe((res)=>{
    this.selectedUser = res;
    this.toastr.info('Successfully activated user' + ' '+ item.first_name +' '+item.last_name);
    this. AccountUsers();
    })
  }
 
}
searchUser(filterValue){
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


  
  



}
