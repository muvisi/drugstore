import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../../service.service';
// import { endpoint, ServiceService } from '../../../service.service';
// import { SignatureService } from '../../../signature.service';
@Component({
  selector: 'app-insurance-forms',
  templateUrl: './insurance-forms.component.html',
  styleUrls: ['./insurance-forms.component.scss']
})
export class InsuranceFormsComponent implements OnInit {
  patient:any={}
  hospital='AAR HOSPITAL'
  specialist='Yes'
  employer='AAR Hospital Ltd'
  condition='No Underlying Condition'
  employee='Employee Name'
  relation='Self'
  constructor(private route: ActivatedRoute,public service:ServiceService) { }

  ngOnInit() {
    this.service.getSinglePatientData_Hospserver(this.route.snapshot.params.id).subscribe((res)=>{
      console.log("HEALTHIX",res);
      this.patient = res;
    })
   
  }  
 
 printPage() {
console.log("Resp", this.patient)
document.title=this.patient[0].visit_number


  window.print();
 
}

}

