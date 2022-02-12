import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../../service.service';

@Component({
  selector: 'app-jubilee-claimform',
  templateUrl: './jubilee-claimform.component.html',
  styleUrls: ['./jubilee-claimform.component.scss']
})
export class JubileeClaimformComponent implements OnInit {

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
