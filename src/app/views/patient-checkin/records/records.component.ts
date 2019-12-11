import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
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
  data: any = {};
  displayedColumns: string[] = ['sn', 'name', 'code', 'cost'];
  constructor(public service: ServiceService,public toastr: ToastrService, public navCtrl: NgxNavigationWithDataComponent) { 
    this.data = this.navCtrl.get('data');
    console.log(this.data);
    if(this.data !=null){
      this.patient.first_name = this.data.first_name;
      this.patient.other_names = this.data.other_names;
      this.patient.last_name = this.data.last_name;
      this.patient.phone = this.data.phone;
      this.patient.id = this.data.id;
    }else{
      this.navCtrl.navigate('dashboard/records-list')
    }
  }

  ngOnInit() {
    var d = new Date();
    this.gurdianMin = new Date(d.getFullYear() - 18,d.getMonth()+1,d.getDate());
    this.getServices();
    this.getDiagnoses();
  }
 submit(){
   if(this.patient.visit_date == null){
     this.toastr.error('Visit date is required')
     return
   }
   const data = {
     patient:this.patient,
     procedures:this.procedures,
     diagnosis:this.diagnosis
   }
   
   this.service.createRecord(data).subscribe((res)=>{
     this.patient ={};
     this.toastr.success('Successfully created a record');
     this.navCtrl.navigate('dashboard/records-list')
   })
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
    this.service.getDrugs().subscribe((res)=>{
      this.drugsList = res.results;
    })
  }
  onDiagnosis(item) {
    this.diagnosis.push(item.item);
    this.selectedDiagnosis = {};
  }
    getServices() {
      this.service.getProviderServices().subscribe((res) => {
        this.services = res.results;
      });
    }
    onSelect(item){
      this.procedures.push(item.item);
      this.selectedOption = {};
      console.log(this.procedures);
    }    

   
}
