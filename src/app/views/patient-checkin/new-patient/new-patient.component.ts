import { Component, OnInit, ViewChild , Input} from '@angular/core';

import { ServiceService } from '../../../service.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { FormBuilder, FormGroup, Validators, FormControl,FormArray} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class NewPatientComponent  implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('paginator', {static: true}) paginator: MatPaginator;
  selected ='+254';
  exclusionColumns: string[] = ['benefit', 'category', 'updated', 'Time'];
  benefitColumns: string[] = ['benefit','balance'];
  loading;
  dataSource;
  searchText;
  benefits: any = [];
  schemes = [];
  covered_benefits: any = [];
  memberId;
  names;
  schemeId;
  payerId;
  members: any = [];
  payers;
  age;
  scheme;
  payer;
  member;
  addKin = false;
  insure = false;
  guardian: any = {};
  patient: any = {};
  kin: any = {};
  isGuardian = false;
  isKin = false;
  memberInfo: any = {};
  patientInfo: any = {};
  memberData: any = {};
  patientRevisit: any;
  registerForm: FormGroup;
  payment_methods=[];
  maxDate: Date;
  gurdianMin: Date;
  isInsurance: boolean;
  constructor(public service: ServiceService, private toastr: ToastrService, public router: Router,
    public navCtrl: NgxNavigationWithDataComponent,private formBuilder: FormBuilder) {
      this.patient = this.navCtrl.get('revisit');
      
    }

  ngOnInit() {
    this.maxDate = new Date();
    var d = new Date();
    this.gurdianMin = new Date(d.getFullYear() - 18,d.getMonth()+1,d.getDate());
    this.Payers();
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      other_names: [''],
      last_name: ['', Validators.required],
      gender: ['Female', Validators.required],
      email: ['',Validators.email],
      phone: ['',Validators.required],
      dob: ['', Validators.required],
      visit_type: ['NEW', Validators.required],
      priority: ['Normal', Validators.required],
      residence: [''],
      national_id: ['',Validators.required],
      passport_no: [''],
      occupation: [''],
      code:['+254',Validators.required]
    });

    if(this.patient != null) {
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
      this.registerForm.setValue({first_name:this.patient.first_name,other_names:this.patient.other_names,last_name:this.patient.last_name,dob: new Date(this.patient['dob']),
      national_id:this.patient.national_id,county: '',occupation: '',residence:'',email:this.patient.email || '',visit_type: 'OUTPATIENT',phone:this.patient.phone || '',priority:'Normal',gender: this.patient.gender,
    
  });
    };
   
  }
  setForm(){
  let first_name,last_name,other_names,gender;
  this.names = this.memberData.name.split(/\s+/);
  this.names[0]? first_name = this.names[0]:first_name = '';
  this.names[1]? other_names = this.names[1]:other_names = '';
  this.names[2]? last_name = this.names[2]:last_name = '';
  if(this.memberData.gender == 'Male' || this.memberData.gender == 'M' || this.memberData.gender == 'Male' || this.memberData.gender == 'male' || this.memberData.gender == 'MALE'){
    gender = 'Male'
  } else{
    gender="Female"
  }
    this.registerForm.setValue({first_name:first_name,other_names:other_names,last_name:last_name,dob: new Date(this.memberData['dob']),
    national_id:this.memberData.national_id,county: '',occupation: '',residence:'',email:'',visit_type: '',phone: '',priority:'Normal',gender: gender
    });
  }
  get f() { return this.registerForm.controls; }
  onSubmit() {
 
    if (this.registerForm.invalid) {
      this.toastr.error('Fill in All the Fields Marked with *');
        return;
    }
    var data = {}
    data['patient'] = this.registerForm.value;
    Object.keys(this.memberData).length != 0 !=null? data['insure_check'] =  this.memberData.trx_id : //pass
    Object.keys(this.guardian).length != 0? data['guardian'] = this.guardian : Object.keys(this.kin).length != 0?  data['kin'] = this.kin : console.log('no kin')
    this.service.registerPatient(data).subscribe((res) => {
      this.toastr.success('successfully created the patient');
      console.log(res);
      this.navCtrl.navigate('/dashboard/patients/bill-patient', { data:res.visit_no });
      this.loading = false;
    });
}
  addPayment(item){
    const index = this.payment_methods.indexOf(item);
    if(index < 0){
      this.payment_methods.push(item);
    }else{
      this.payment_methods.splice(index,1);
    }
   console.log(this.payment_methods)
  }

  Payers() {
    this.service.getPayers().subscribe((res) => {
      this.payers = res.results;
    }
    );
  }
  OnPayer(item) {
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
    console.log(this.memberId);
    this.service.insure_details({id:this.memberId}).subscribe((res)=>{
       this.memberData = res;
       this.payer = '';
       this.scheme = '';
       this.member = '';
      //  this.names = this.memberData.name.split(/\s+/);
      //  this.patient.first_name = this.names[0];
      //  this.patient.other_names = this.names[1];
      // this.patient.last_name = this.names[2];
    });
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
    this.service.searchScheme(this.payerId, text).subscribe((res) => {
      this.schemes = res.results;
    }
    );
  }
  search(text) {
    this.service.searchMember(this.schemeId, text).subscribe((res) => {
    
      this.members = res.results;
    });
  }
 
 


  calculateAge(dob) {
    const year = dob.getFullYear();
    const month = dob.getMonth();
    const day = dob.getDate();
    const today = new Date();
    this.age = today.getFullYear() - year;
    if (today.getMonth() < month || (today.getMonth() === month && today.getDate() < day)) {
      this.age--;
    }
    if (this.age < 18) {
      this.isGuardian = true;
      this.isKin = false;
      this.registerForm.patchValue({national_id:'MINOR'})
    } else if (this.age >= 18) {
      this.registerForm.patchValue({national_id:''})
      this.isKin = true;
      this.isGuardian = false;
    } else {
     this.toastr.error('Select a Valid Date');
   }
  }
  insureCheck() {
    if (this.isInsurance === false) {
      this.router.navigateByUrl('dashboard/patients/insure-check');
    }
  }

}
