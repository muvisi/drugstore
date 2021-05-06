import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../../service.service';
import { ToastrService } from 'ngx-toastr';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { ModalDirective } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-set-up',
  templateUrl: './set-up.component.html',
  styleUrls: ['./set-up.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class SetUpComponent implements OnInit {
  dataSource;
  @ViewChild('uSort', {static: true}) uSort: MatSort;
  @ViewChild('sSort', {static: true}) sSort: MatSort;
  @ViewChild('editServiceModal', { static: false }) editServiceModal: ModalDirective;
  @ViewChild('serviceModal', { static: false }) serviceModal: ModalDirective;
  @ViewChild('floorModal', { static: false }) floorModal: ModalDirective;
  @ViewChild('roomModal', { static: false }) roomModal: ModalDirective;
  @ViewChild('typeModal', { static: false }) typeModal: ModalDirective;
  @ViewChild('profileModal', { static: false }) profileModal: ModalDirective;
  @ViewChild('branchModal', { static: false }) branchModal: ModalDirective;
  @ViewChild('checkModal', { static: false }) checkModal: ModalDirective;
  @ViewChild('roomEditModal', { static: false }) roomEditModal: ModalDirective;
  @ViewChild('userModal', { static: false }) userModal: ModalDirective;
  @ViewChild('providerModal', { static: false }) providerModal: ModalDirective;
  selected = 'doctor';
  user;
  edit = true;
  hospital: any ={};
  branch: any ={};
  employee: any ={};
  employees:any;
  prescription =[];
  rooms;
  hospitalId;
  selectedPrescription: any ={};
  provider_list;
  hospitalList;
  providerServices:any;
  services;
  name;
  text;
  selectedDepartment: any ={};
  department: any ={};
  selectedUser: any = {};
  selectedService:any = {};
  selectedServices = [];
  displayedColumns: string[] = ['sn','name', 'username', 'phone', 'email','role','view','edit','deactivate','activate'];
  insuranceColumns: string[] = ['sn','name','linked','phone', 'email'];
  hospitalColumns: string[] = ['sn','name', 'provider_type','reg_no','contact_number','view','delete'];
  columns: string[] = ['sn','name','code', 'cost','edit','delete'];
  departmentColumns: string[] = ['sn', 'name', 'edit', 'delete'];
  roomColumns: string[] = ['sn','name', 'type', 'floor','cost','status','edit','delete'];
  payers: any;
  departmentSource;
  typeForm: FormGroup;
  types =[];
  floorForm: FormGroup;
  floors=[];
  roomForm: FormGroup;
  editRoom: FormGroup;
  providerForm: FormGroup;

  constructor(public service: ServiceService , private toastr: ToastrService, public navCtrl: NgxNavigationWithDataComponent,private formBuilder: FormBuilder,public router:Router) {
  }

  ngOnInit() {
    this.roomForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      floor: ['', Validators.required],
      cost: ['', Validators.required],
      description:['',Validators.required]
  });
  this.providerForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    reg_no: ['', Validators.required],
    location: ['', Validators.required],
    building:['',Validators.required],
    contact_number:['',Validators.required],
    id: ['', Validators.required],
});



  this.editRoom = this.formBuilder.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    floor: ['', Validators.required],
    description:['',Validators.required],
    id:['',Validators.required]
});
    this.typeForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
  });
  this.floorForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(1)]]
});
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.service.getHospital(this.user.hospital).subscribe((res) => {
    this.hospital = res;
    });
    
    this.employeesList();
    this.prescriptionList();
    this.getServices();
    this.getService();
    this.getPayers();
    this.getHospitals();
    this.getFloor();
    this.getRoomTypes();
    this.getRoom();
  }
  get f() { return this.typeForm.controls; }
  get g() { return this.floorForm.controls; }

  getHospitals(){
    this.service.providerDetails(this.user.hospital).subscribe((res) => {
      this.provider_list = res;
      this.hospitalList = new MatTableDataSource(res);
    });
  }
  searchHospital(filterValue){
    this.hospitalList.filter = filterValue.trim().toLowerCase();
  }
  searchUser(filterValue){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  deleteHospital(item){
    if (window.confirm("Do you really want to Delete Hospital"+" "+item.name+" "+"?")) { 
      this.service.deleteHospital(item.id).subscribe(()=>{
        this.toastr.success('Successfully Deleted Hospital');
        this.getHospitals();
      })
    }
  }
  deleteDepartment(element){
    if (window.confirm("Do you really want to Delete?")) { 
    this.service.deleteDepartment(element.id).subscribe((res)=>{
      this.toastr.success('Successfully Deleted Department');
      this.checkModal.hide();
      this.ngOnInit();
    })
  }
  }
  editDepartment(){
    this.service.editDepartment(this.selectedDepartment.id,this.selectedDepartment).subscribe((res)=>{
      this.toastr.success('Successfully edited Department');

      this.checkModal.hide();
    })
  }
  getPayers(){
    this.service.getPayers().subscribe((res)=>{
      this.payers = res.results;
    })
  }
  getFloor(){
    this.service.getFloors().subscribe((res)=>{
      this.floors = res.results;
    })
  }

 
  hospitalDetails(item){
    this.navCtrl.navigate('/dashboard/set-up/hospital/',{data: item})
  }

addService() {
  console.log(this.selectedService);
  this.selectedServices.push(this.selectedService);
  this.selectedService = {};
  console.log(this.selectedServices)
}
deleteService(obj) {
const index: number = this.selectedServices.indexOf(obj);
  if (index !== -1) {
    this.selectedServices.splice(index, 1);
  }
}

dropService(item) {
    const id = item.id;

    this.service.deleteService(id).subscribe((res) => {
      this.toastr.success('Successfully deleted Service with Code'+' '+ item.code);
      this.getService();
    },
      (error) => {
        this.toastr.error('Delete For service'+' '+ item.code +''+'Failed');
      }
    );
  }
onSelect(item) {
  this.selectedService = item.item;
}
submitServices() {
const data = {
  'id': this.user.hospital,
  'services': this.selectedServices
};
this.service.saveServices(data).subscribe((res) => {
console.log('services response', res);
this.toastr.success('Successfuly saved Services');
this.selectedServices = [];
this.serviceModal.hide();
this.getService();
},
(error) => {
this.toastr.error('Failed to save services');
}
);
}
  onSelectPrescription(item) {
    this.selectedPrescription = item.item;
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
});
}
prescriptionList() {
  this.service.prescriptions().subscribe((res) => {
    this.prescription = res.results;
  });
}
getService() {
this.service.getProviderServices().subscribe((res) => {
  this.providerServices = new MatTableDataSource(res.results);
  this.providerServices.sort = this.sSort;
});
}

editService(){
console.log(this.selectedService);
this.service.updateService(this.selectedService.id,this.selectedService).subscribe((res)=>{
  this.toastr.success('Successfully Updated Service');
  this.editServiceModal.hide();
})
}
addRoom(){
  this.service.addRoom(this.roomForm.value).subscribe((res)=>{
    this.toastr.success('Successfully Added');
    this.roomForm.reset();
    this.roomModal.hide();
    this.getRoom();
  },(err)=>{
    this.toastr.error(err.error.name[0]);
  })
}
editUpdate(item){
  this.editRoom.patchValue({id:item.id,description:item.description,type:item.type,floor:item.floor,name:item.name})
  this.roomEditModal.show();
}
updateRoom(){
  console.log(this.editRoom.value)
  this.service.updateRoom(this.editRoom.value).subscribe((res)=>{
    this.toastr.success('Successfully Updated');
    this.roomEditModal.hide();
    this.editRoom.reset();
    this.getRoom();
  },(err)=>{
    this.toastr.error(err.error.name[0]);
  })
}

deleteRoom(id){
  if (window.confirm("Do you really want to delete?")) {
    this.service.deleteRoom(id).subscribe((res)=>{
      this.toastr.success('Successfully Deleted');
      this.getRoom();
    },(err)=>{
      this.toastr.error(err.error.name[0]);
    })
  }
  
}

  getServices() {
    this.service.getServices().subscribe((res) => {
      this.services = res.results;
    });
  }
  getRoomTypes() {
    this.service.roomTypes().subscribe((res) => {
      this.types = res.results;
    });
  }
 
  getRoom() {
    this.service.getRooms().subscribe((res) => {
      this.rooms = new MatTableDataSource(res.results);
    });
  }

  onSubmit(){
    this.service.addRoomType(this.typeForm.value).subscribe((res)=>{
      this.toastr.success('Successfully Added');
      this.typeForm.reset();
      this.getRoomTypes();
    },(err)=>{
      this.toastr.error(err.error.name[0]);

    })
  }

   
  onFloor(){
    this.service.addFloor(this.floorForm.value).subscribe((res)=>{
      this.toastr.success('Successfully Added');
      this.floorForm.reset();
      this.getFloor();
    },(err)=>{
      this.toastr.error(err.error.name[0]);
    })
  }

  view(item){
    this.router.navigate(['/dashboard/user-account',item.id])
  }
  
  serviceSearch(text){
    // if(text != null){
    //   this.service.serviceSearch(text).subscribe((res)=> {
    //    this.service =res.results;
    //   })
    // }
   
    console.log(text);
  }
  searchServices(text){
    if(text != null){
      this.service.searchService(text).subscribe((res)=> {
        this.services =res.results;
      })
    }
  }
  searchPrescription(text){
    if(text != null){
      this.service.searchPrescriptions(text).subscribe((res)=> {
        this.prescription =res.results;
      })
    }
  }
  deleteUser(item){
    console.log(item);
  }
  deactivate(item){
    
    if(item.is_active){
      const data={
        "is_active":false,
        "email":item.email
      }
      this.service.deactivateUser(data,item.id).subscribe((res)=>{
        console.log(res);
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
 addBranch(){
  
   this.service.createHospitalBranch(this.branch).subscribe((res)=>{
     console.log(res);
     this.toastr.success('Successfully created a Branch');
     this.branch = {};
     this.branchModal.hide();
     this.ngOnInit();
   },(error) => {
        this.toastr.error('Branch creation Failed');
   });
 }
 addDepartment(){
  
  this.service.createDepartment(this.department).subscribe((res)=>{
    console.log(res);
    this.toastr.success('Successfully created a Department');
    this.department = {};
    this.ngOnInit();
  },(error) => {
       this.toastr.error('Department creation Failed');
  });
}

search(filterValue: string) {
  this.providerServices.filter = filterValue.trim().toLowerCase();
}
searchRooms(filterValue: string){
  
}
editProvider(){
this.providerForm.patchValue({id:this.hospital.id,name:this.hospital.name,email:this.hospital.email,contact_number:this.hospital.contact_number,building:this.hospital.building,location:this.hospital.location,reg_no:this.hospital.reg_no})
this.providerModal.show();
}
onProvider(){
  this.service.updateHospital(this.providerForm.value).subscribe((res)=>{
    this.toastr.success('Successfully created a updated provider details');
    this.providerModal.hide();
    this.getHospitals();
  })
}
}
