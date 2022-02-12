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
