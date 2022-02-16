import { DataSource } from '@angular/cdk/collections';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../../service.service';

@Component({
  selector: 'app-apa-claimform',
  templateUrl: './apa-claimform.component.html',
  styleUrls: ['./apa-claimform.component.scss']
})
export class ApaClaimformComponent implements OnInit {

  patient:any={}
  hospital='AAR HOSPITAL'
  specialist='Yes'
  employer='Employer Name'
  condition='No Underlying Condition'
  employee='Employee Name'
  details='No Records'
  state='Congenital'
  normal='Bacterial'
  Aartelephone='Emergency:+254 725 225 225 | +254 734 225 225'
  constructor(private route: ActivatedRoute,public service:ServiceService) { }

  ngOnInit() {
    this.service.getSinglePatientData_Hospserver(this.route.snapshot.params.id).subscribe((res)=>{
      console.log("HEALTHIX",res);
      this.patient = res;
    })
   
  }  
 
 printPage() {
console.log("Resp", this.patient)
document.title=this.patient[0].visit_number.concat("-01")


  window.print();
 
}

}

