import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../../service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { ThrowStmt } from '@angular/compiler';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal'
@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  patient :any = {};
  guardian:any ={};
  kin:any = {};
  age: number;
  isGuardian =false;
  isKin=false;
  maxDate = new Date()
  addKin=false;
  gurdianMin: Date;
  diagnosesList = [];
  selectedOption: any ={};
  selectedDiagnosis: any ={};
  selectedDrug: any ={};
  services = [];
  procedures = [];
  diagnosis =[];
  drugsList = [];
  drugs = [];
  data: any = {};
  registerForm: FormGroup;
  displayedColumns: string[] = ['sn', 'name', 'code', 'cost'];
  @ViewChild('staticModal', { static: false }) staticModal: ModalDirective;
  constructor(public service: ServiceService,public toastr: ToastrService, public navCtrl: NgxNavigationWithDataComponent,private formBuilder: FormBuilder) { 
    this.data = this.navCtrl.get('data');
    console.log(this.data);
    if(this.data ==null){
      this.navCtrl.navigate('dashboard/records-list')
    }
  }

  ngOnInit() {
    var d = new Date();
    
    this.gurdianMin = new Date(d.getFullYear() - 18,d.getMonth()+1,d.getDate());
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      other_names: [''],
      last_name: ['', Validators.required],
      gender: ['Female', Validators.required],
      email: ['',Validators.email],
      phone: ['',Validators.required],
      dob: ['', Validators.required],
      visit_date: ['', Validators.required],
      residence: [''],
      national_id: ['',Validators.required],
      occupation: [''],
      county: ['']
    });
    if(this.data !=null){
      this.registerForm.patchValue({first_name:this.data.first_name,other_names:this.data.other_names,last_name:this.data.last_name,phone:this.data.phone})
    }
    this.getServices();
    this.getDiagnoses();
    this.getDrugList();


  }
get f() { return this.registerForm.controls; }
 submit(){
  if (this.registerForm.invalid) {
    this.toastr.error('Fill in All the Fields Marked with *');
      return;
  }
  this.patient =  this.registerForm.value;
  this.patient.id = this.data.id;
   const data = {
     patient:this.patient,
     procedures:this.procedures,
     diagnosis:this.diagnosis,
     drugs:this.drugs
   }
   
   this.service.createRecord(data).subscribe((res)=>{
  
     this.toastr.success('Successfully created a record');
     this.staticModal.show();
    //  this.navCtrl.navigate('dashboard/records-list')
   })
 }
 addVisit(){
  this.drugs =[];
  this.diagnosis=[];
  this.procedures =[];
  this.registerForm.patchValue({visit_date:''});
  this.staticModal.hide();
 }
 closeVisit(){
  this.staticModal.hide();
   this.drugs =[];
   this.diagnosis=[];
   this.procedures =[];
   this.patient ={}

  this.navCtrl.navigate('dashboard/records-list')

 }
 deleteDrug(obj) {
  const index: number = this.drugs.indexOf(obj);
  if (index !== -1) {
    this.drugs.splice(index, 1);
  }
}
deleteDiagnosis(obj) {
  const index: number = this.diagnosis.indexOf(obj);
  if (index !== -1) {
    this.diagnosis.splice(index, 1);
  }
}
deleteProcedure(obj) {
  const index: number = this.procedures.indexOf(obj);
  if (index !== -1) {
    this.procedures.splice(index, 1);
  }
}
getDiagnoses() {
  this.service.allDiagnoses().subscribe((res) => {
  this.diagnosesList = res.results;
  });
  }
  
  searchDiagnosis(text){
    this.service.searchDiagnosis(text).subscribe((res) => {
      this.diagnosesList = res.results;
      });
  }
  getDrugList(){
    this.service.getProviderDrugs().subscribe((res)=>{
      this.drugsList = res.results;
    })
  }
  searchPrescription(text){
    this.service.searchDrugs(text).subscribe((res)=>{
      this.drugsList = res.results;
    })
  }
  onDiagnosis(item) {
    const index: number = this.diagnosis.findIndex(obj=>obj.code = item.item.id);
      if (index !== -1) {
        this.toastr.info('Diagnosis has   already been added')
        this.selectedDiagnosis = {};
      }else{
        this.diagnosis.push(item.item);
        this.selectedDiagnosis = {};
        console.log(this.diagnosis);
      }
  }
  onDrug(item) {
    const index: number = this.drugs.findIndex(obj=>obj.code = item.item.id);
    console.log(index)
      if (index !== -1) {
        this.toastr.info('Drug has   already been added')
        this.selectedDrug = {};
      }else{
        this.drugs.push(item.item);
        this.selectedDrug = {};
        console.log(this.drugs);
      }
  }
    getServices() {
      this.service.getProcedures().subscribe((res) => {
        this.services = res.results;
      });
    }
    searchProcedure(text) {
      console.log(text);
        this.service.searchProcedure(text).subscribe((res) => {
        this.services = res.results;
      });
      }
    onSelect(item){
      const index: number = this.procedures.indexOf(item.item);
      if (index !== -1) {
        this.toastr.info('Procedure is already added')
        this.selectedOption = {};
      }else{
        this.procedures.push(item.item);
        this.selectedOption = {};
        console.log(this.procedures);
      }
    }    

   
}
