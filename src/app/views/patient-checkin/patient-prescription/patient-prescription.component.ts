import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { ServiceService } from '../../../service.service';
import {MatPaginator} from '@angular/material/paginator';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-patient-prescription',
  templateUrl: './patient-prescription.component.html',
  styleUrls: ['./patient-prescription.component.scss']
})
export class PatientPrescriptionComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('staticModal', { static: false }) staticModal: ModalDirective;
  @ViewChild('paymentModal', { static: false }) paymentModal: ModalDirective;
  displayedColumns: string[] = ['service', 'generic_name','dosage','strength','form','cost','quantity','status','label','edit'];
  serviceColumns: string[] = ['service', 'category', 'bill_number', 'invoice__no', 'rate','status','edit'];
  dataSource;
  id;
  data;
  patient: any = {};
  drugs: any;
  selectedDrug: any = {};
  dosage: any;
  amount=0;
  paymentAmount =0;
  label:any ={};
  payments = [];
  constructor(private service: ServiceService, private navCtrl: NgxNavigationWithDataComponent,public toastr: ToastrService) { 
    this.data = this.navCtrl.get('data');
    console.log('gcfycc',this.data)
    
    if(this.data != null){
      this.id = this.data.visit;
    } else{
      this.navCtrl.navigate('/dashboard/pharmacy');
    }
    
  }

  ngOnInit() {
  this.patientPrescriptions();
  this.getPrescription();
  this.getDosage();
  }
  setLabel(item){
     this.label = item;
     console.log('dddd',this.label)
  }
  back(){
    this.navCtrl.navigate('/dashboard/pharmacy')
  }
  pay(){
    this.paymentModal.show();
    let cost = 0;
    this.paymentAmount =0;
    console.log(this.payments);
    this.payments.forEach(element => {
      cost += element.rate * element.quantity;
    });
    this.paymentAmount = cost
    console.log(this.paymentAmount);
  }
  patientPrescriptions(){
    this.service.patientPrescription({visit_no: this.data.visit_no}).subscribe((res)=>{
      this.patient = res;
      this.dataSource = this.patient.prescriptions;
      let cost = 0;
      this.patient.prescriptions.forEach(element => {
        cost += element.rate * element.quantity;
      });
      this.amount = cost;
    })

  }
  getPrescription() {
    this.service.prescriptions().subscribe((res) => {
    this.drugs = res.results;
    });
    }
  searchDrug(data){
    this.service.searchPrescriptions(data).subscribe((res)=>{
      this.drugs = res.results;
    })
  }  
  onDrug(item){
    this.selectedDrug = item.item;
  }
  getDosage() {
    this.service.getDosage().subscribe((res) => {
      this.dosage = res.results;

    });
  }
  savePrescription(){
    this.selectedDrug.visit_no = this.patient.visit_no;
    this.selectedDrug.category = 'PRESCRIPTION';
    this.service.generateBill(this.selectedDrug).subscribe((res)=>{
      console.log(res);
      this.toastr.success('Successfully Added prescription');
      this.selectedDrug = {};
      this.ngOnInit();
      this.staticModal.hide();
    })
  }
  makePayments(item){
    const index: number = this.payments.findIndex(obj=>obj.bill_number == item.bill_number);
    if (index !== -1) {
      this.payments.splice(index,1)
    }else{
      this.payments.push(item);
    }
  }
  submit(){
    this.service.pay(this.payments).subscribe((res)=>{
      this.toastr.success("Successfully Submitted Payments");
      this.paymentModal.hide();
      this.payments =[];
      this.paymentAmount =0;
      this.patientPrescriptions();
    })
  }
}
