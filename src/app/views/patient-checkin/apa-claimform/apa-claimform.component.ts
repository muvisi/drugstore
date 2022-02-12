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
    constructor(private route: ActivatedRoute,public service:ServiceService) { }
  
    ngOnInit() {
      this.service.getInsurance(this.route.snapshot.params.id).subscribe((res)=>{
        console.log(res);
        this.patient = res;
      })
    }  
   printPage() {
   document.title=this.patient.patient.phone
    window.print();
  }
  
}
