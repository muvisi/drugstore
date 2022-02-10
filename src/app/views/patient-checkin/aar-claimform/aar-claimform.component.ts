import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../../service.service';

@Component({
  selector: 'app-aar-claimform',
  templateUrl: './aar-claimform.component.html',
  styleUrls: ['./aar-claimform.component.scss']
})
export class AarClaimformComponent implements OnInit {
  patient:any={}
  hospital='AAR HOSPITAL'
  // title=this.patient.patient.phone
  constructor(private route: ActivatedRoute,public service:ServiceService) { }

  ngOnInit() {
    this.service.getInsurance(this.route.snapshot.params.id).subscribe((res)=>{
      console.log(res);
      this.patient = res;
    })
  }  
 printPage() {
console.log("Resp", this.patient.patient.phone)
document.title=this.patient.patient.phone.concat('-01')
  window.print();
}
}

