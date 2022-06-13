import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-birthdaymessenges',
  templateUrl: './birthdaymessenges.component.html',
  styleUrls: ['./birthdaymessenges.component.scss']
})
export class BirthdaymessengesComponent implements OnInit {
  AllColumns: string[] = ['sn','date','patient','service','phone','rating','comments',"visit_type","status","type"]
  dataSourceCall;
  dataSource;
  mypatient_id;
  phone;
  patient_info;
  clientForm: FormGroup;
  nextofKin={
    name:"",
    phone:"",
    residence:"",
    relationship:""
  
  }
  constructor(public service:ServiceService,private route: ActivatedRoute,private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      phone: ['',[Validators.required,Validators.minLength(9)]],
      last_name: ['',Validators.required],
      first_name: ['',Validators.required],
      other_names:['', Validators.required],
      residence: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      religion: ['', Validators.required],
      marital_status:[''],
      patient_number:[''],
      occupation:[''],
      nationality:[''],
      national_id: [''],
      brought_in_by: [''],
  });
  
  }

}
