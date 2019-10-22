import { Component, OnInit } from '@angular/core';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../../../service.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-triage',
  templateUrl: './triage.component.html',
  styleUrls: ['./triage.component.scss'],
  providers:[DatePipe]
})
export class TriageComponent implements OnInit {
  triageForm: FormGroup;
  submitted = false;
  status=true;
  allergies = [];
  selectedAllergy = [];
  patient: any = {};
  bmi = 0;
  name;
  services = [];
  pressure = '';
  priority = 'Normal';
  observationList:any;
  observations:any = {};
  observations_points =[];
  selectedDrug: any ={};
  drugs =[];
  dosage =[];
  allergicDrugs = [];
  triageMedicine = [];
  displayedColumns: string[] = ['name','generic_name','strength', 'cost','quantity','form','delete'];
  dataSource;
  value;
  painlevel;
  procedures =[];
  selectedOption:any= {};


  formatLabel(value: number) {
    return value;
  }
  constructor(public navCtrl: NgxNavigationWithDataComponent, private formBuilder: FormBuilder, public service: ServiceService,
    public toastr: ToastrService, public datePipe: DatePipe) {
   this.patient = this.navCtrl.get('data');
  
  }

  ngOnInit() {
    this.triageForm = this.formBuilder.group({
      temperature: ['', Validators.required],
      weight: ['', Validators.required],
      systolic: ['', Validators.required],
      diastolic: ['', Validators.required],
      pulse: ['', Validators.required],
      height: ['', Validators.required],
      respiratory: [''],
      bmi: [''],
      blood_pressure: [''],
      head_circumfrence: [''],
      random_sugar:[''],
  });
this.alleryList();
this.getObservations();
this.getDosage();
}
alleryList() {
  this.service.getAllergy().subscribe((res) => {
  console.log('allergy', res);
  this.allergies = res.results;
  });
  }
get foodAllergies(){
  return this.allergies.filter(x => x.category ==='Foods')
}
get metalAllergies(){
  return this.allergies.filter(x => x.category ==='Metals')
}

get insectAllergies(){
  return this.allergies.filter(x => x.category ==='Insect stings or bites')
}
searchProcedure(text) {
  console.log(text);
    this.service.searchProcedure(text).subscribe((res) => {
    this.services = res.results;
  });
  }
get f() { return this.triageForm.controls; }

test() {
 const systolic = this.triageForm.get('systolic').value;
 const diastolic = this.triageForm.get('diastolic').value;
 if (systolic !== '' && diastolic !== '') {
   this.pressure = systolic + '/' + diastolic + 'mmHg';
 }
}
calculateBmi() {
  const weight = this.triageForm.get('weight').value;
  const height = this.triageForm.get('height').value;
  if (weight !== '' && height !== '') {
    console.log(weight);
    console.log(height);
    const data = (height / 100) * (height / 100);
    this. bmi = weight / data;
  }
 }
addAllergy(item) {
if ( this.selectedAllergy.indexOf(item) < 0) {
  this.selectedAllergy.push(item);
} else {
 const index = this.selectedAllergy.indexOf(item);
 this.selectedAllergy.splice(index, 1);
}

console.log(this.selectedAllergy);
}
addObservation(item){
  const index =this.observations_points.indexOf(item);
  if(index< 0){
    this.observations_points.push(item);
  }else{
    this.observations_points.splice(index,1)
  }
  console.log(this.observations_points);
}
onSubmit() {
  this.submitted = true;
  if (this.triageForm.invalid) {
      return;
  }
const data = this.triageForm.value;
data.bmi = this.bmi;
data.blood_pressure = this.pressure;
data.priority = this.priority;
data.risk_of_fall = this.value;
data.pain_level = this.painlevel;
this.observations.appointment_date = this.datePipe.transform(this.observations.appointment_date,'yyyy-MM-dd');
this.observations.symptoms_onset = this.datePipe.transform(this.observations.symptoms_onset,'yyyy-MM-dd')
console.log(data);
const info = {
  triage : data,
  observations:this.observations,
  observations_points: this.observations_points,
  allergies: this.selectedAllergy,
  status:this.status,
  visit_number: this.patient.visit_no,
  allergic_drugs: this.allergicDrugs,
  triage_medicine: this.triageMedicine
};
this.service.triageDetail(info).subscribe((res) => {
  this.toastr.success('Successfully saved Triage details');
  this.navCtrl.navigate('/dashboard/patients/triage/');
});
  // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.triageForm.value));
}
getObservations(){
  this.service.observationList().subscribe((res)=>{
    this.observationList = res.results;
  });
}
onDrug(item){
  const index = this.allergicDrugs.indexOf(item.item.name);
  if(index < 0){
    this.allergicDrugs.push(item.item.name);
  }else{
    this.allergicDrugs.splice(index,1)
  }
  this.name = '';
}
onSelect(item){
  this.selectedDrug = item.item;
}
onProcedure(item){
  this.selectedOption = item.item;
}
addTriageMedicine(){
  const index = this.triageMedicine.findIndex(obj=> obj.name == this.selectedDrug.name && obj.strength == this.selectedDrug.strength);
  if(index < 0){
  this.selectedDrug.dosage = '';
    this.triageMedicine.push(this.selectedDrug);
  }
  console.log(this.triageMedicine);
  this.dataSource = new MatTableDataSource(this.triageMedicine);
  this.selectedDrug = {};
}
deleteMedicine(item){
  const index = this.triageMedicine.findIndex(obj=>obj == item);
  this.triageMedicine.splice(index,1);
  this.dataSource = new MatTableDataSource(this.triageMedicine);
}
searchPrescription(text){
  this.service.searchPrescriptions(text).subscribe((res)=>{
  this.drugs = res.results;
  });
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
  })
}
}
