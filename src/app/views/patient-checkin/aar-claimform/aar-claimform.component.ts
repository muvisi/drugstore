import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Script } from 'vm';
import { ServiceService } from '../../../service.service';
import { SignatureService } from '../../../signature.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup } from '@angular/forms';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-aar-claimform',
  templateUrl: './aar-claimform.component.html',
  styleUrls: ['./aar-claimform.component.scss']
})
export class AarClaimformComponent implements OnInit {

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
    "employee_number": null,
    "department": null,
    "member_number": "",
    "member_name": null,
    "relation": null,
    "card_number": null,
    "id_number": null,
    "nhif_number": null,
    "doctor_specialty": null,
    "created": ""
    }
  hospital='AAR HOSPITAL'
  maxDate
  specialist='Yes'
  employer='Employer Name'
  condition='No Underlying Condition'
  employee='Employee Name'
  details='No Records'
  state='Congenital'
  normal='Bacterial'
  amount='000.0'
  @ViewChild('staticModal', { static: false }) staticModal: ModalDirective;
  @ViewChild('clientModal', { static: false }) clientModal: ModalDirective;
 
  Aartelephone='Emergency:+254 725 225 225 | +254 734 225 225'
 
  today1;
  
  today2;
   signature1_src;
   signature1_show;
   signature2_show;
   signature2_src;
   signature_type;
   clientForm: FormGroup;
  constructor(private route: ActivatedRoute,public service:ServiceService,private formBuilder: FormBuilder,private signatureService:SignatureService) { }

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
      specialty: [''],
      diagnosis:[''],
      description:['']
    });

    
    this.signatureService.connect();
    
    this.today1=new Date();

    this.signatureService.socket().subscribe((res)=>{
      console.log("images",res);
      if (this.signature_type=="staff"){    
     
        this.signature2_src=this.service.getSignatureUrl()+res;
        if(this.signature_type=="staff" && this.signature2_src.search("png")>-1){
          this.signature2_show=true;
          this.today2=new Date();
        }
      }else if(this.signature_type=="member"){
        this.signature1_src=this.service.getSignatureUrl()+res;
        if(this.signature_type=="member" && this.signature1_src.search("png")>-1){
        this.signature1_show=true;
        this.today1=new Date();
        }
     
      }
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





  activateMemberSignature(){
    this.signature_type="member"
    this.signature1_show=false;
    
    let data={
      'status':'activate',
      'type':'member'
    }
    this.signatureService.send(JSON.stringify(data))
  }
  
  activateStaffSignature(){
    this.signature_type="staff";
    this.signature2_show=false;
    let data={
      'status':'activate',
      'type':'staff'
    }
    this.signatureService.send(JSON.stringify(data))
  }
  edit(){
    
    this.clientModal.show();
  }
  Update(){
    console.log("DATA",this.clientForm.value)
    
    this.clientModal.hide();
    
  }
}

