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
  services = [];
  procedures = [];
  diagnosis =[];
  displayedColumns: string[] = ['sn', 'name', 'code', 'cost'];
  constructor(public service: ServiceService,public toastr: ToastrService, public navCtrl: NgxNavigationWithDataComponent) { 
    // this.patient = this.navCtrl.get('data');
  }

  ngOnInit() {
    var d = new Date();
    this.gurdianMin = new Date(d.getFullYear() - 18,d.getMonth()+1,d.getDate());
    this.getServices();
    this.getDiagnoses();
  }
 submit(){
   const data = {
     patient:this.patient,
     guardian:this.guardian,
     kin:this.kin
   }
   
   this.service.createRecord(data).subscribe((res)=>{
     console.log('www',res);
     this.patient ={};
     this.isGuardian = false;
     this.guardian ={};
     this.kin ={};
     this.toastr.success('Successfully created a record');
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
