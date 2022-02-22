import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../../service.service';

@Component({
  selector: 'app-minet-claimforms',
  templateUrl: './minet-claimforms.component.html',
  styleUrls: ['./minet-claimforms.component.scss']
})
export class MinetClaimformsComponent implements OnInit {

  patient:any={}
  hospital='AAR HOSPITAL'
  specialist='Yes'
  employer='AAR Hospital Ltd'
  condition='No Underlying Condition'
  employee='Employee Name'
  today1;
  member;
  scheme;
  diagnoses;
  email;
  doctor;
  membernumber;
  description;
  visit;
  
  constructor(private route: ActivatedRoute,public service:ServiceService) { }

  ngOnInit() {
    this.service.getSinglePatientData_Hospserver(this.route.snapshot.params.id).subscribe((res)=>{
      this.patient = res;
    this.email=this.patient[0].email
    this.doctor=this.patient[0].doctor_name
    // this.diagnoses=this.patient[0].diagnoses
    this.scheme=this.patient[0].scheme_name
    // this.description=this.patient[0].description
    this.member=this.patient[0].member
    this.membernumber=this.patient[0].member_number
    this.visit=this.patient[0].visit_number
    })
   
  }  
 
 printPage() {
console.log("Resp", this.patient)
document.title=this.visit.concat('-01')


  window.print();
 
}

}

