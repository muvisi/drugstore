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
    
}

