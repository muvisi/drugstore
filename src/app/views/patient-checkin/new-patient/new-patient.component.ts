import { Component, OnInit, ViewChild , Input} from '@angular/core';

import { ServiceService } from '../../../service.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.scss']
})
export class NewPatientComponent  implements OnInit {
  @ViewChild('succesModal', {static: true}) succesModal: ModalDirective;
  @ViewChild('visitModal', {static: true}) visitModal: ModalDirective;
  @ViewChild('staticModal', {static: true}) staticModal: ModalDirective;
  @ViewChild('cashModal', {static: true}) cashModal: ModalDirective;
  @ViewChild('paymentModal', {static: true}) paymentModal: ModalDirective;
  @ViewChild('paymentModal1', {static: true}) paymentModal1: ModalDirective;
  @ViewChild('patientDetails', {static: true}) patientDetails: ModalDirective;
  @ViewChild('revisitModal', {static: true}) revisitModal: ModalDirective;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('paginator', {static: true}) paginator: MatPaginator;
  @ViewChild('paginator3', {static: true}) paginator3: MatPaginator;
  @ViewChild('paginator2', {static: true}) paginator2: MatPaginator;
  @ViewChild('paginator1', {static: true}) paginator1: MatPaginator;
  exclusionColumns: string[] = ['benefit', 'category', 'updated', 'Time'];
  benefitColumns: string[] = ['benefit', 'category', 'balance'];
  displayedColumns: string[] = ['service', 'bill_number', 'invoice__no', 'rate', 'delete'];
  loading;
  dataSource;
  dataSource1;
  patient_no;
  searchText;
  visit_no;
  benefits: any = [];
  schemes = [];
  covered_benefits: any = [];
  memberId;
  names;
  schemeId;
  payerId;
  members: any = [];
  payers;
  mpesa: any = {};
  cash = 0;
  show;
  age;
  insure = false;
  isCash = false;
  isMpesa = false;
  isInsurance = false;
  selectedPatient: any = {};
  visits: any = [];
  guardian: any = {};
  patient: any = {};
  kin: any = {};
  record;
  valid = false;
  isGuardian = false;
  isKin = false;
  view = false;
  doctor;
  doctorId;
  doctors;
  services;
  name;
  total = 0;
  amount = 0;
  member_number;
  memberInfo: any = {};
  selectedMember: any = {};
  patientInfo: any = {};
  selectedOption: any = {};
  savedPatient: any = {};
  memberData: any = {};
  patientRevisit: any;
  registerForm: FormGroup;
  constructor(public service: ServiceService, private toastr: ToastrService, public router: Router,
    public navCtrl: NgxNavigationWithDataComponent,private formBuilder: FormBuilder) {
      this.patientRevisit = this.navCtrl.get('revisit');
      if(this.patientRevisit != null) {
        this.patient = this.patientRevisit;
        const dob = new Date(this.patient['dob']);
        this.patient['dob'] = dob;
        this.calculateAge(dob);
        if(this.patient.kin){
          this.kin = this.patient.kin[0];
        } else{
          this.guardian = this.patient.guardian[0];
        }
        delete this.patient.kin;
        delete this.patient.guardian;
        console.log('bbb',this.patient);
      };
    this.memberInfo = this.navCtrl.get('patient');
    if (this.memberInfo != null ) {

      if (this.memberInfo.member_data) {
        this.covered_benefits = new MatTableDataSource<[]>(JSON.parse(this.memberInfo.member_data.benefits));
        this.covered_benefits.paginator = this.paginator3;
        this.covered_benefits.sort = this.sort;
        this.isInsurance = true;
        this.memberData = this.memberInfo.member_data;
        this.member_number = this.memberData['member_number'];
        const dob = new Date(this.memberData['dob']);
        this.patient['dob'] = dob;
        this.calculateAge(dob);
        this.patient.gender = this.memberData.gender;
        this.patient.visit_type = this.memberInfo.visit_type;
        this.names = this.memberData.name.split(/\s+/);
        this.patient.first_name = this.names[0];
        this.patient.other_names = this.names[1];
        this.patient.last_name = this.names[2];
        console.log(this.patient.name);

      } else {
        this.isInsurance = true;
        this.memberData = this.memberInfo;
        this.patient.visit_type = this.memberData.visit_type;
        this.member_number = this.memberData['member_number'];
        const dob = new Date(this.memberData['dob']);
        this.patient['dob'] = dob;
        this.calculateAge(dob);
        this.patient.gender = this.memberData.gender;
        this.names = this.memberData.name.split(/\s+/);
        this.patient.first_name = this.names[0];
        this.patient.other_names = this.names[1];
        this.patient.last_name = this.names[2];
        console.log(this.patient.name);
      }
    }
    
    }

  ngOnInit() {
    this.savedPatient = {};
    this.getServices();
    this.Payers();
    this.getBenefits();
  }
  get f() { return this.registerForm.controls; }
  getBenefits() {
    this.service.benefitsListing().subscribe((res) => {
      this.benefits = res.results;
      this.dataSource1 = new MatTableDataSource<[]>(this.benefits);
      this.dataSource1.paginator = this.paginator2;
      this.dataSource1.sort = this.sort;
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  rowClicked(row) {
    console.log(row);
    this.patient = row;
    const dob = new Date(this.patient['dob']);
    this.patient['dob'] = dob;
    this.calculateAge(dob);
    if (this.age < 18) {
      this.guardian = this.patient.guardian[0];
      delete this.patient.kin;
    }
    if (this.age >= 18) {
      this.kin = this.patient.kin[0];
      delete this.patient.kin;
      delete this.patient.guardian;
    }
    this.revisitModal.hide();
  }
  Payers() {
    this.service.getPayers().subscribe((res) => {
      this.payers = res.results;
    }
    );
  }
  OnPayer(item) {
    console.log(item.item);
    this.payerId = item.item.id;
    this.service.getSchemes(this.payerId).subscribe((res) => {
    this.schemes = res.results;
    });
  }
  OnScheme(item) {
    this.schemeId = item.item.id;
  }
  OnMember(item) {
    this.memberId = item.item.id;
  }
  payerSearch(text) {
    console.log(text);
    this.service.searchPayers(text).subscribe((res) => {
      console.log(res);
      this.payers = res.results;
    }
    );
  }
  schemeSearch(text) {
    console.log(text);
    this.service.searchScheme(this.payerId, text).subscribe((res) => {
      this.schemes = res.results;
    }
    );
  }
  search(text) {
    this.service.searchMember(this.schemeId, text).subscribe((res) => {
      console.log('jk', res);
      this.members = res.results;
    });
  }
  getServices() {
    this.service.getServices().subscribe((res) => {
      this.services = res.results;
    });
  }
  onSelect(event) {
    this.selectedOption = event.item;
    this.selectedOption.visit_no = this.visit_no;
  }
  showWindow() {
    this.succesModal.show();
  }

  hideWindow() {
    this.succesModal.hide();
  }
  Search() {
    if (this.searchText !== '') {
      this.visits = this.visits.filter(res => {
        return res.national_id.match(this.searchText);
      });
    } else {
      this.ngOnInit();
    }
  }
  searchID() {
    if (this.patient_no !== '') {
      this.visits = this.visits.filter(res => {
        return res.patient_no.match(this.patient_no);
      });
    } else {
      this.ngOnInit();
    }
  }
  calculateAge(dob) {
    console.log(this.patient);
    const year = dob.getFullYear();
    const month = dob.getMonth();
    const day = dob.getDate();
    const today = new Date();
    // console.log(this.datePipe.transform(today, "yyyy-MM-dd"));
    this.age = today.getFullYear() - year;
    if (today.getMonth() < month || (today.getMonth() === month && today.getDate() < day)) {
      this.age--;
    }
    if (this.age < 18) {
      this.isGuardian = true;
      this.isKin = false;
    } else if (this.age >= 18) {
      this.isKin = true;
      this.isGuardian = false;
    } else {
     this.toastr.error('Select a Valid Date');
   }
  }
status() {
  this.succesModal.show();
}
  savePatient() {
    this.loading = true;
      if (Object.keys(this.guardian).length === 0) {
        this.patient.doctor = this.doctorId;
        const data = {
          'patient': this.patient,
          'kin': this.kin,
          'record': this.record
        };
        if (this.memberInfo != null ) {
          data['insure_check'] = this.memberInfo.id;
         }
        this.service.registerPatient(data).subscribe((res) => {
          console.log(res);
          // this.toastr.success('successfully created the patient');
          this.savedPatient = res;
          this.loading = false;
          this.patient = {};
          this.kin = {};
          this.doctor = '';
          this.succesModal.hide();
          this.visit_no = res.visit_no;
          this.staticModal.show();
        }, (error) => {
          this.toastr.success(error);
        });
      } else {
        this.patient.doctor = this.doctorId;
        const data = {
          'patient': this.patient,
          'guardian': this.guardian,
          'record': this.record,
        };
        if (this.memberInfo != null ) {
         data['insure_check'] = this.memberInfo.id;
        }
        console.log(data);
        this.service.registerPatient(data).subscribe((res) => {
          this.toastr.success('successfully created the patient');
          console.log(res);
          this.savedPatient = res;
          this.loading = false;
          this.doctor = '';
          this.guardian = {};
          this.patient = {};
          this.visit_no = res.visit_no;
          this.succesModal.hide();
          this.staticModal.show();

        });
      }
  }

setVisit(visit) {
  this.selectedPatient = visit;
  this.visitModal.show();
}
 getVisitInfo() {
    const data = {
      'id': this.visit_no
    };
    this.service.getVisit(data).subscribe((res) => {
      this.patientInfo = res;
      let amount = 0;
      this.dataSource = new MatTableDataSource(this.patientInfo.bills);
      this.patientInfo.bills.forEach(element => {
        amount += element.rate;
      });
      this.total = amount;
    });
  }
  deleteProcedure(obj) {
    console.log(obj);
    this.service.deleteBillItem(obj.id).subscribe((res) => {
      this.toastr.info('Successfuly Deleted Service');
      this.getVisitInfo();
    });
  }
  saveService() {
    this.service.generateBill(this.selectedOption).subscribe((res) => {
      console.log(res);
      this.getVisitInfo();
      this.calculate();
      this.selectedOption = {};
      this.name = '';
    });
  }
revisit() {
 this.service.revisit(this.selectedPatient).subscribe((res) => {
   console.log(res);
   this.visit_no = res;
   this.patientDetails.hide();
   this.cashModal.show();
 });
}
searchProcedure(text) {
 console.log(text);
 this.service.searchService(text).subscribe((res) => {
   this.services = res.results;
 });
}
choosePayment() {
this.staticModal.hide();
this.paymentModal.show();
this.calculate();
}
  cashPayment() {
    this.cashModal.hide();
    this.paymentModal1.show();
  }
  onInsurance() {
    this.isInsurance = ! this.isInsurance;
  }
  onCash() {
    this.isCash = !this.isCash;
    if (this.cash > 0) {
      this.cash = 0;
    }
    this.calculate();
  }
  onMpesa() {
    this.isMpesa = !this.isMpesa;
    if (this.mpesa.amount > 0) {
      this.mpesa.amount = 0;
    }
    this.calculate();
  }
  calculate1() {
    console.log('ssss');
    if (Object.keys(this.mpesa).length === 0) {
      const sub = this.cash + this.amount;
      if (sub >= this.total) {
        this.show = true;
      } else {
        this.show = false;
      }
    } else {
      const sub = this.cash + this.mpesa.amount + this.amount;
      console.log(this.mpesa.amount);
      console.log(sub);
      if (sub >= this.total) {
        this.show = true;
      } else {
        this.show = false;
      }
    }
  }
  calculate() {
    if (this.isCash && !this.isInsurance && !this.isMpesa) {
      this.cash = this.total;
      this.show = true;
    } else if (!this.isCash && !this.isInsurance && this.isMpesa) {
      this.mpesa.amount = this.total;
      this.show = true;
    } else if (!this.isCash && this.isInsurance && !this.isMpesa) {
      this.amount = this.total;
      const sub = this.amount;
      if (sub >= this.total) {
        this.show = true;
      } else {
        this.show = false;
      }
    } else if (!this.isCash && !this.isInsurance && this.isMpesa) {
      this.mpesa.amount = this.total;
      const sub = this.mpesa.amount ;
      if (sub >= this.total) {
        this.show = true;
      } else {
        this.show = false;
      }
    } else if (this.isCash && !this.isInsurance && this.isMpesa) {
      const sub = this.mpesa.amount + this.cash;
      if (sub >= this.total) {
        this.show = true;
      } else {
        this.show = false;
      }
    } else {
      const sub = this.cash + this.mpesa.amount + this.amount;
      console.log(this.mpesa.amount);
      console.log(sub);
      if (sub >= this.total) {
        this.show = true;
      } else {
        this.show = false;
      }
    }

  }
  insureCheck() {
    if (this.isInsurance === false) {
      this.router.navigateByUrl('dashboard/patients/insure-check');
    }
  }

  submitPayment() {
    if (this.isMpesa && this.isCash && this.isInsurance) {
      const cash = {
        'amount': this.cash,
      };
      const data = {
        'copay': this.cash + this.mpesa.amount,
        'amount': this.amount,
        'id': this.visit_no,
        'member': this.member_number,
        'mpesa': this.mpesa,
        'cash': this.cash
      };
      console.log('mpesa,cash and insurance', data);
      this.service.saveClaim(data).subscribe((res) => {
        console.log(res);
        this.toastr.success('Successfully Submitted Payment');
        this.navCtrl.navigate('/dashboard/patients/bill-patient', { data: this.visit_no });
      });
    } else if (this.isCash && this.isInsurance) {
      const cash = {
        'amount': this.cash,
      };
      const data = {
        'copay': this.cash + this.mpesa.amount,
        'amount': this.amount,
        'id': this.visit_no,
        'member': this.member_number,
        'cash': this.cash
      };
      console.log('cash and insurance', data);
      this.service.saveClaim(data).subscribe((res) => {
        console.log(res);
        this.toastr.success('Successfully Submitted Payment');
        this.navCtrl.navigate('/dashboard/patients/bill-patient', { data: this.visit_no });
      });
    } else if (this.isMpesa && this.isInsurance) {
      const data = {
        'copay': this.cash + this.mpesa.amount,
        'amount': this.amount,
        'id': this.visit_no,
        'member': this.member_number,
        'mpesa': this.mpesa
      };
      console.log('mpesa and insurance', data);
      this.service.saveClaim(data).subscribe((res) => {
        console.log(res);
        this.toastr.success('Successfully Submitted Payment');
        this.navCtrl.navigate('/dashboard/patients/bill-patient', { data: this.visit_no });
      });
    } else if (this.isInsurance) {
      const data = {
        'copay': this.cash + this.mpesa.amount,
        'amount': this.amount,
        'id': this.visit_no,
        'member': this.member_number
      };
      console.log('insurance', data);
      this.service.saveClaim(data).subscribe((res) => {
        console.log(res);
        this.toastr.success('Successfully Submitted Payment');
        this.navCtrl.navigate('/dashboard/patients/bill-patient', { data: this.visit_no });
      });
    } else if (this.isCash && ! this.isMpesa) {
      const cash = {
        'cash': {
          'amount': this.cash,
          'id': this.visit_no
        }
      };
      this.service.payBill(cash).subscribe((res) => {
        console.log(res);
        this.toastr.success('Successfully Submitted Payment');
        this.navCtrl.navigate('/dashboard/patients/bill-patient', { data: this.visit_no });
      });
    } else if (this.isMpesa && this.isCash) {
      this.mpesa.id = this.patient.visit_no;
      const data = {
        'mpesa': this.mpesa,
        'cash': {
          'amount': this.cash
        },
        'id': this.visit_no
      };
      this.service.payBill(data).subscribe((res) => {
        console.log(res);
        this.toastr.success('Successfully Submitted Payment');
        this.navCtrl.navigate('/dashboard/patients/bill-patient', { data: this.visit_no });
      });
    } else {
      this.mpesa.id = this.patient.visit_no;
      const data = {
        'mpesa': this.mpesa,
        'id': this.visit_no
      };
      this.service.payBill(data).subscribe((res) => {
        console.log(res);
        this.toastr.success('Successfully Submitted Payment');
        this.navCtrl.navigate('/dashboard/patients/bill-patient', { data: this.visit_no });
      });
    }
  }
}
