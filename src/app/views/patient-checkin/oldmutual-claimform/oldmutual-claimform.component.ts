import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { ServiceService } from '../../../service.service';

@Component({
  selector: 'app-oldmutual-claimform',
  templateUrl: './oldmutual-claimform.component.html',
  styleUrls: ['./oldmutual-claimform.component.scss']
})
export class OldmutualClaimformComponent implements OnInit {
  
  patient:any={
    "id": "",
    "patient": {
    "id": "",
    "first_name": "",
    "last_name": "",
    "age": null,
    "other_names": "",
    "dob": null,
    "email": "",
    "phone": "",
    "occupation": null,
    "gender": "",
    "county": null,
    "residence": null,
    "national_id": null,
    "created": ""
    },
    "booking": {},
    "insuranceVisit": {
    "id": "",
    "visit_number": "",
    "copay": "0.00",
    "claimed_amount": "",
    "doctor": " ",
    "diagnoses": "",
    "description": "",
    "check_in": "",
    "check_out": null,
    "visit_type": "",
    "services": {
    "others": [],
    "pharmacy": [
    {
    "name": "",
    "amount": "603.40"
    },
    {
    "name": "ZINCAT-OD 20MG5ML 60ML",
    "amount": "143.640"
    },
    {
    "name": "CYCLOPAM SUSP 30ML(DICYCLOMINE + SIMETHICONE)",
    "amount": "173.60"
    },
    {
    "name": "PAROL 250MG/5ML SYRUP 100ML(PARACETAMOL)",
    "amount": "220.0"
    },
    {
    "name": "EMITOSS SUSPENSION 2MG/5ML 30ML(ONDANSETRON)",
    "amount": "322.0"
    }
    ],
    "procedure": [
    {
    "name": "Outpatient Consultation Charges",
    "amount": "1750.000"
    },
    {
    "name": "TOTAL BLOOD COUNT (TBC,FBC,QBC)",
    "amount": "1300.000"
    },
    {
    "name": "URINE ROUTINE(URINALYSIS)",
    "amount": "900.000"
    }
    ]
    },
    "services_status": "",
    "status": "",
    "patient": ""
    },
    "insurance_company": "",
    "scheme_name": "",
    "scheme_number": "",
    "employee": null,
    "doctoremail": null,
    "telno": null,
    "doctorphone": null,
    "address": null,
    "employee_number": null,
    "department": null,
    "member_number": "",
    "member_name": null,
    "relation": null,
    "card_number": null,
    "id_number": null,
    "nhif_number": null,
    "created": ""
    }
  hospital='AAR HOSPITAL'
  specialist='Yes'
  employer='AAR Hospital Ltd'
  condition='No Underlying Condition'
  employee='Employee Name'
  today1;
  maxDate;
  
  member;
  scheme;
  diagnoses;
  email;
  doctor;
  membernumber;
  description;
  visit;
  clientForm: FormGroup;
  @ViewChild('staticModal', { static: false }) staticModal: ModalDirective;
  @ViewChild('clientModal', { static: false }) clientModal: ModalDirective;
  constructor(private route: ActivatedRoute,public service:ServiceService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      surname: [''],
      lastname: [''],
      firstname: [''],
      
      email: [''],
      dob: [''],
      phone: [''],
      occupation: [''],
      memberno: [''],
      doctor: [''],
      doctoraddress:[''],
      // date: [''],
      specialty: [''],
      member: [''],
      cardno: [''],
    });
 
    this.service.getInsurance(this.route.snapshot.params.id).subscribe((res)=>{
      console.log("HEALTHIX",res);
      this.patient = res;
    })
   
  }  
 
  printPage() {
    console.log("Resp", this.patient)
    
    document.title=this.patient.insuranceVisit.visit_number.concat("-01")
    
    
      window.print();
     
    }
    edit(){
      // let item = this.customer;
      // this.clientForm.patchValue({first_name:item.first_name,last_name:item.last_name,other_names:item.other_names,phone:item.phone,
      //   dob:new Date(item.dob),gender:item.gender,email:item.email,residence:item.residence,national_id:item.national_id,occupation:item.occupation,id:item.id
      // })
      this.clientModal.show();
    }
    Update(){
      console.log("DATA",this.clientForm.value)
      
      this.clientModal.hide();
      
    }
    
}

