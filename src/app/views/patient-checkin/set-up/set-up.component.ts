import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-set-up',
  templateUrl: './set-up.component.html',
  styleUrls: ['./set-up.component.scss']
})
export class SetUpComponent implements OnInit {
  selected = 'doctor';
  user;
  hospital;
  branch;
  employee;
  employees;
  prescription;
  drugs = [];
  hospitalId;
  drugName;
  selectedPrescription;
  provider_list;
  drugsSelected;
  providerServices;
  services;
  name;
  selectedService;
  selectedServices;
  constructor(public service: ServiceService , private toastr: ToastrService) {
    this.hospital = { };
    this.employee = { };
    this.selectedPrescription = { };
    this.drugs = [];
    this.drugsSelected = [];
    this.selectedService = {};
    this.selectedServices = [];
    this.providerServices = [];
  }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    console.log('user details', this.user);
    this.service.getHospital(this.user.hospital).subscribe((res) => {
    this.hospital = res;
    });
    this.service.providerDetails(this.user.hospital).subscribe((res) => {
      this.provider_list = res;

    });
    this.service.getProviderDrugs(this.user.hospital).subscribe((res) => {
      this.drugsSelected = res.results;

    });
    this.employeesList();
    this.prescriptionList();
    this.getServices();
    this.getService();
  }
  setHospital(item) {
    this.hospitalId = item.item.id;
  }
test() {
  console.log('glory to The Lord');
}
addService() {
  console.log(this.selectedService);
  this.selectedServices.push(this.selectedService);
  this.selectedService = {};
  this.name = '';
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
dropDrug(item) {
 const id = item.id;

 this.service.deletePrescription(id).subscribe((res) => {
this.toastr.success('Successfully deleted');
this.ngOnInit();
 },
 (error) => {
   this.toastr.error('Delete Failed');
 }
 );
}
  dropService(item) {
    const id = item.id;

    this.service.deleteService(id).subscribe((res) => {
      this.toastr.success('Successfully deleted');
      this.ngOnInit();
    },
      (error) => {
        this.toastr.error('Delete Failed');
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
this.ngOnInit();
},
(error) => {
this.toastr.error('Failed to save services');
}
);
}
mapTypeaheadField() {
    return 'propriet_name';
  }
  onSelectPrescription(item) {
    this.selectedPrescription = item.item;
  }
addUser() {
  this.employee.hospital = this.hospitalId;
  console.log(this.employee);
  this.service.createUser(this.employee).subscribe((res) => {
    console.log('wow', res);
    this.ngOnInit();
  });
}
employeesList() {
this.service.getDoctors().subscribe((res) => {
this.employees = res.results;
});
}
prescriptionList() {
  this.service.prescriptions().subscribe((res) => {
    this.prescription = res.results;
  });
}
getService() {
this.service.getProviderServices(this.user.hospital).subscribe((res) => {
  this.providerServices = res.results;
});
}
addPrescriptions() {
  this.drugs.push(this.selectedPrescription);
  console.log('Command', this.drugs);
  this.selectedPrescription = {};
  this.drugName = '';
}
saveDrugs() {
const data = {
'id': this.user.hospital,
'drugs': this.drugs
};
this.service.saveDrugs(data).subscribe((res) => {
  console.log(res);
  this.drugs = [];
  this.ngOnInit();
});
}
  getServices() {
    this.service.getServices().subscribe((res) => {
      console.log('service', res);
      this.services = res.results;
    });
  }
}
