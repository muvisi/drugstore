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
  diagnosesList: any;
  selectedOption: any ={};
  selectedDiagnosis: any ={};
  services = [];
  procedures = [];
  constructor(public service: ServiceService,public toastr: ToastrService, public navCtrl: NgxNavigationWithDataComponent) { 
    // this.patient = this.navCtrl.get('data');
  }

  ngOnInit() {
    var d = new Date();
    this.gurdianMin = new Date(d.getFullYear() - 18,d.getMonth()+1,d.getDate());
    this.getServices();
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
 calculateAge(dob) {
   console.log(dob)
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
  } else if (this.age >= 18) {
    this.isKin = true;
    this.isGuardian = false;
  } else {
   this.toastr.error('Select a Valid Date');
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
  onDiagnosis(item) {
    this.selectedOption = item.item;
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
