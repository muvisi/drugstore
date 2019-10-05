import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../../service.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
@Component({
  selector: 'app-authorization-letter',
  templateUrl: './authorization-letter.component.html',
  styleUrls: ['./authorization-letter.component.scss'],
  providers: [DatePipe]
})
export class AuthorizationLetterComponent implements OnInit {
  @ViewChild('xrayModal', { static: false }) xrayModal: ModalDirective;
  @ViewChild('scanModal', { static: false }) scanModal: ModalDirective;
  panelOpenState = false;
  xray;
  text
  authorization: string = '';
  procedure;
  procedures = [];
  diagnosis = [];
  laboratory = [];
  lab;
  xrays = [];
  ctScans =[];
  selectedServices = [];
  name;
  data: any = {};
  total = 0;
  services = [];
  wards =['Exercutive','Normal'];
  diagnosesList: string[];
  member: any ={};
  constructor( public service: ServiceService, public navCtrl: NgxNavigationWithDataComponent, private datePipe: DatePipe) {
    this.member = this.navCtrl.get('data');
    console.log(this.member);
   }

  ngOnInit() {
    this.getDiagnoses();
    this.getXrays();
    this.getScans();
  }
  calculate(){
  let amount =0;
   this.selectedServices.forEach(element => {
     amount+= parseInt(element.cost);
  });
  this.total = amount;
  }
  get seletcedProcedures(){
      return this.selectedServices.filter((res)=> res.category == 'PROCEDURES');
  }
  get seletcedLaboratory(){
    return this.selectedServices.filter((res)=> res.category == 'LABORATORY');
}
  onDiagnosis(item){
    console.log(item.item);
    const index  = this.diagnosis.findIndex(obj => obj === item.item);
    if(index< 0){
      this.diagnosis.push(item.item);
    } 
    this.name = '';
  }
  onXray(item){
    const index  = this.selectedServices.findIndex(obj => obj === item.item);
    if(index< 0){
      this.selectedServices.push(item.item);
    } 
    this.xray = '';
    this.xrayModal.hide();
   this.calculate();
  }
  onScan(item){
    const index  = this.selectedServices.findIndex(obj => obj === item.item);
    if(index< 0){
      this.selectedServices.push(item.item);
    } 
    this.xray = '';
    this.scanModal.hide();
    console.log(this.selectedServices);
    this.calculate();
  }
  addService(item){
    const index  = this.selectedServices.findIndex(obj => obj === item.item);
    if(index< 0){
      this.selectedServices.push(item.item);
    } 
    this.text= '';
    this.calculate();
  }
  onProcedure(item){
    const index  = this.selectedServices.findIndex(obj => obj === item.item);
    if(index< 0){
      this.selectedServices.push(item.item);
    } 
    this.procedure= '';
    this.calculate();
  }
  onLab(item){
    const index  = this.selectedServices.findIndex(obj => obj === item.item);
    if(index< 0){
      this.selectedServices.push(item.item);
    } 
    this.lab= '';
    this.calculate();
  }
  deleteDiagnosis(item){
    const index  = this.diagnosis.findIndex(obj => obj === item);
    this.diagnosis.splice(index,1);
  }
   deleteService(item){
    const index  = this.selectedServices.findIndex(obj => obj === item);
    this.selectedServices.splice(index,1);
    this.calculate();
  }
  getDiagnoses() {
    this.service.allDiagnoses().subscribe((res) => {
      console.log(res);
    this.diagnosesList = res.results;
    });
    }
  getXrays(){
    this.service.getXray().subscribe((res)=>{
      this.xrays = res.results;
      console.log(this.xrays);
    })
  }  
  getScans(){
    this.service.getCtscan().subscribe((res)=>{
      this.ctScans = res.results;
      
    })
  } 
  searchProcedures(data){
    this.service.searchProcedure(data).subscribe((res)=>{
      this.procedures= res.results;
    })
  } 
  searchLaboratory(data){
    this.service.searchTest(data).subscribe((res)=>{
      this.laboratory = res.results;
    })
  }
  search(data){
    this.service.searchService(data).subscribe((res)=>{
      this.services = res.results;
    })
  }
  send(){
    this.data.id = this.member.member_data.member_id;
    this.data.payer = this.member.payer.id;
    this.data.member_name = this.member.member_data.name;
    this.data.member_number = this.member.member_data.member_number;
    this.data.services = this.selectedServices;
    this.data.diagnosis = this.diagnosis;
    this.data.insure_check_code = this.member.trx;
    this.data.total_requested_amount = this.total;
    this.data.sysmptoms_onset = this.datePipe.transform(this.data.sysmptoms_onset,'yyyy-MM-dd');
    this.data.diagnosis_date = this.datePipe.transform(this.data.diagnosis_date,'yyyy-MM-dd');
    this.data.last_treatment_date =this.datePipe.transform(this.data.last_treatment_date ,'yyyy-MM-dd');
    this.data.admission_date = this.datePipe.transform(this.data.admission_date ,'yyyy-MM-dd');
    console.log(this.data);
    this.service.createAuthletter(this.data).subscribe((res)=>{
      console.log(res);
    });
  }
}
