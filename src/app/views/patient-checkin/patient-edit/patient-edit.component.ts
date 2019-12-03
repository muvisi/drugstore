import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup,FormControl,FormArray } from '@angular/forms';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { ServiceService } from '../../../service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss']
})
export class PatientEditComponent implements OnInit {
  registerForm: FormGroup;
  patient:any = {};
  maxDate: Date;
  guardian:any = {};
  gurdianMin: Date;
  selectedOption:any = {};
  services = [];
  procedures = [];
  constructor(private formBuilder: FormBuilder,public navCtrl: NgxNavigationWithDataComponent,public service: ServiceService,public toastr: ToastrService) { 
    this.patient = this.navCtrl.get('data');
    if(this.patient== null){
      this.navCtrl.navigate('/dashboard/patients/records');
    }
  }

  ngOnInit() {
    var d = new Date();
    this.gurdianMin = new Date(d.getFullYear() - 18,d.getMonth()+1,d.getDate());
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
      visit_date: ['',Validators.required],
      occupation: [''],
      nhif_number: [''],
    });
    this.setForm(this.patient);
    this.getServices();
  }
  get f() { return this.registerForm.controls; }
  setForm(item){
    
      if(item != null){
        this.registerForm.patchValue({first_name:item.first_name,other_names:item.other_names,last_name:item.last_name,national_id:item.national_id,email:item.email,phone:item.phone,county:item.county,
          gender:item.gender,dob:new Date(item.dob) ? item.dob!= null: null,residence:item.residence,occupation: item.occupation,nhif_number:item.nhif_number ? item.nhif_number : ''});
          
      }
  }
  getServices() {
    this.service.getProcedures().subscribe((res) => {
      this.services = res.results;
    });
  }
  onSelect(event) {
    this.selectedOption = event.item;
  }
  searchProcedure(text) {
    console.log(text);
      this.service.searchProcedure(text).subscribe((res) => {
      this.services = res.results;
    });
  }
  addService(){
    this.procedures.push(this.selectedOption);
    this.selectedOption ={};
  }
  onSubmit(){
    
    const data ={
      id:this.patient.id,
      patient: this.registerForm.value,
      guardian:this.guardian
    };
    this.service.updatePatient(data).subscribe((res)=>{
      console.log(res);
      this.navCtrl.navigate('dashboard/patients/records/');
    })
  }
}
