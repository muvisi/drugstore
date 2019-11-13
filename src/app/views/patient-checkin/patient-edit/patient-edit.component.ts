import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup,FormControl,FormArray } from '@angular/forms';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { ServiceService } from '../../../service.service';
@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss']
})
export class PatientEditComponent implements OnInit {
  registerForm: FormGroup;
  patient:any ={};
  maxDate: Date;
  constructor(private formBuilder: FormBuilder,public navCtrl: NgxNavigationWithDataComponent,public service: ServiceService) { 
    this.patient = this.navCtrl.get('data');
  }

  ngOnInit() {
    this.maxDate = new Date();
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      other_names: ['', Validators.required],
      last_name: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['',Validators.email],
      phone: [''],
      dob: ['', Validators.required],
      residence: [''],
      national_id: ['',Validators.required],
      county: [''],
      occupation: [''],
      nhif_number: [''],
    });
    this.setForm(this.patient);
  }
  get f() { return this.registerForm.controls; }
  setForm(item){
    console.log(this.patient);
      if(item != null){
        this.registerForm.patchValue({first_name:item.first_name,other_names:item.other_names,last_name:item.last_name,national_id:item.national_id,email:item.email,phone:item.phone,county:item.county,
          gender:item.gender,dob:new Date(item.dob),residence:item.residence,occupation: item.occupation,nhif_number:item.nhif_number ? item.nhif_number : ''});
      }
  }
  onSubmit(){
    console.log(this.registerForm.value);
    const data ={
      id:this.patient.id,
      patient: this.registerForm.value
    };
    this.service.updatePatient(data).subscribe((res)=>{
      console.log(res);
      this.navCtrl.navigate('dashboard/patients/records/');
    })
  }
}
