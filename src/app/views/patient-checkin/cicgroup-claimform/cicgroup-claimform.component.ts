import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../../service.service';

@Component({
  selector: 'app-cicgroup-claimform',
  templateUrl: './cicgroup-claimform.component.html',
  styleUrls: ['./cicgroup-claimform.component.scss']
})
export class CicgroupClaimformComponent implements OnInit {

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
