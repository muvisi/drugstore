import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../../service.service';
import { ToastrService } from 'ngx-toastr';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { ModalDirective } from 'ngx-bootstrap';
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
  @ViewChild('userModal', { static: false }) userModal: ModalDirective;
  @ViewChild('serviceModal', { static: false }) serviceModal: ModalDirective;
  @ViewChild('drugModal', { static: false }) drugModal: ModalDirective;
  @ViewChild('drugUpdateModal', { static: false }) drugUpdateModal: ModalDirective;
  @ViewChild('profileModal', { static: false }) profileModal: ModalDirective;
  @ViewChild('branchModal', { static: false }) branchModal: ModalDirective;
  selected = 'doctor';
  user;
  hospital: any ={};
  branch: any ={};
  employee: any ={};
  employees:any;
  prescription =[];
  drugs = [];
  hospitalId;
  selectedPrescription: any ={};
  provider_list;
  drugsSelected;
  hospitalList;
  providerServices:any;
  services;
  name;
  text;
  selectedUser: any = {};
  selectedService:any = {};
  selectedServices = [];
  displayedColumns: string[] = ['name', 'username', 'phone', 'email','role','department','speciality','profile','status','delete'];
  hospitalColumns: string[] = ['name', 'provider_type','reg_no','contact_number', 'email','country','county','location','physical_address','postal_code'];
  columns: string[] = ['name', 'category', 'code', 'cost','delete'];
  drugColumns: string[] = ['name', 'generic_name', 'code', 'form','strength','quantity','cost','pack_cost','edit','delete'];

  constructor(public service: ServiceService , private toastr: ToastrService, public navCtrl: NgxNavigationWithDataComponent) {
  }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    console.log('user details', this.user);
    this.service.getHospital(this.user.hospital).subscribe((res) => {
    this.hospital = res;
    });
    this.service.providerDetails(this.user.hospital).subscribe((res) => {
      this.provider_list = res;
      this.hospitalList = new MatTableDataSource(res);
    });
    this.employeesList();
    this.prescriptionList();
    this.getServices();
    this.getService();
    this.hospitalDrugs();
  }
  hospitalDrugs(){
    this.service.getProviderDrugs(this.user.hospital).subscribe((res) => {
      this.drugsSelected = new MatTableDataSource(res.results);

    });
  }
  setHospital(item) {
    this.employee.hospital = item.item.id;
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
deleteDrug(obj) {
  const index: number = this.drugs.indexOf(obj);
  if (index !== -1) {
    this.drugs.splice(index, 1);
  }
}
updateDrug(){
  this.addPrescriptions();
  this.saveDrugs();
  this.drugUpdateModal.hide();
  }
dropDrug(item) {
 const id = item.id;

 this.service.deletePrescription(id).subscribe((res) => {
this.toastr.success('Successfully deleted');
this.hospitalDrugs();
 },
 (error) => {
   this.toastr.error('Delete Failed');
 }
 );
}
dropService(item) {
    const id = item.id;

    this.service.deleteService(id).subscribe((res) => {
      this.toastr.success('Successfully Service with Code'+' '+ item.code);
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
this.service.getProviderServices(this.user.hospital).subscribe((res) => {
  this.providerServices = new MatTableDataSource(res.results);
  this.providerServices.sort = this.sSort;
});
}
addPrescriptions() {
  this.drugs.push(this.selectedPrescription);
  this.selectedPrescription = {};

}

saveDrugs() {
const data = {
'id': this.user.hospital,
'drugs': this.drugs
};
this.service.saveDrugs(data).subscribe((res) => {
  this.toastr.success('Successfully Submitted Drugs');
  this.drugModal.hide();
  this.hospitalDrugs();
  this.drugs = [];
});
}
  getServices() {
    this.service.getServices().subscribe((res) => {
      this.services = res.results;
    });
  }
  serviceSearch(text){
    if(text != null){
      this.service.serviceSearch(text).subscribe((res)=> {
       this.service =res.results;
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
      console.log('calllddd');
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
   console.log(this.branch);
   this.service.createHospitalBranch(this.branch).subscribe((res)=>{
     console.log(res);
     this.toastr.success('Successfully created a Branch');
     this.branchModal.hide();
   },(error) => {
        this.toastr.error('Branch creation Failed');
   });
 }
  
}
