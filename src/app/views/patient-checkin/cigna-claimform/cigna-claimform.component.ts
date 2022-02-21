import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../../service.service';
import { SignatureService } from '../../../signature.service';

@Component({
  selector: 'app-cigna-claimform',
  templateUrl: './cigna-claimform.component.html',
  styleUrls: ['./cigna-claimform.component.scss']
})
export class CignaClaimformComponent implements OnInit {


  patient:any={}
  hospital='AAR HOSPITAL'
  specialist='Yes'
  employer='Employer Name'
  condition='No Underlying Condition'
  employee='Employee Name'
  details='No Records'
  state='Congenital'
  normal='Bacterial'
  amount='000.0'
 
  Aartelephone='Emergency:+254 725 225 225 | +254 734 225 225'
  today1;
  member;
  scheme;
  diagnoses;
  email;
  Tamount;
  doctor;
  membernumber;
  description;
  today2;
   signature1_src;
   signature1_show;
   signature2_show;
   signature2_src;
   signature_type;
  constructor(private route: ActivatedRoute,public service:ServiceService,private signatureService:SignatureService) { }

  ngOnInit() {
    this.service.getSinglePatientData_Hospserver(this.route.snapshot.params.id).subscribe((res)=>{
      console.log("HEALTHIX",res);
      this.patient = res;
      this.email=this.patient[0].email
      this.Tamount=this.patient[0].amount
      this.doctor=this.patient[0].doctor_name
      this.diagnoses=this.patient[0].diagnoses
      this.scheme=this.patient[0].scheme_name
      this.description=this.patient[0].description
      this.member=this.patient[0].member
      this.membernumber=this.patient[0].member_number
    })
  
   
  }  
 
printPage() {
console.log("Resp", this.patient)
document.title=this.patient[0].visit_number.concat("-01")


  window.print();
 
}


  
 
}

