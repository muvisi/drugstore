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
  displayedColumns: string[] = ['service', 'generic_name','dosage','strength','form','cost','quantity','status','edit'];
  dataSource;
  id;
  data;
  patient: any = {};
  drugs: any;
  selectedDrug: any = {};
  dosage: any;
  amount=0;
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
  back(){
    this.navCtrl.navigate('/dashboard/pharmacy')
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
      this.toastr.success('Successfully Added prescription')
      this.ngOnInit();
      this.staticModal.hide();
    })
  }
}
