import { Component, OnInit } from '@angular/core';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../../../service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-triage',
  templateUrl: './triage.component.html',
  styleUrls: ['./triage.component.scss']
})
export class TriageComponent implements OnInit {
  triageForm: FormGroup;
  submitted = false;
  allergies = [];
  selectedAllergy = [];
  patient: any = {};
  notes = '';
  bmi = 0;
  pressure = '';
  constructor(public navCtrl: NgxNavigationWithDataComponent, private formBuilder: FormBuilder, public service: ServiceService,
    public toastr: ToastrService) {
   this.patient = this.navCtrl.get('data');
   console.log('dddddd', this.patient);
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
  });
this.alleryList();
}
alleryList() {
  this.service.getAllergy().subscribe((res) => {
  console.log('allergy', res);
  this.allergies = res.results;
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
onSubmit() {
  this.submitted = true;
  if (this.triageForm.invalid) {
      return;
  }
const data = this.triageForm.value;
data.bmi = this.bmi;
data.blood_pressure = this.pressure;
data.notes = this.notes;
console.log(data);
const info = {
  triage : data,
  allergies: this.selectedAllergy,
  visit_number: this.patient.visit_no
};
this.service.triageDetail(info).subscribe((res) => {
  this.toastr.success('Successfully saved Triage details');
  this.navCtrl.navigate('/dashboard/patients/triage/');
});
  // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.triageForm.value));
}
}
