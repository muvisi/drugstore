import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../../service.service';

@Component({
  selector: 'app-cigna-claimform',
  templateUrl: './cigna-claimform.component.html',
  styleUrls: ['./cigna-claimform.component.scss']
})
export class CignaClaimformComponent implements OnInit {

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
  document.title=this.patient.patient.phone.concat('-01')
    window.print();
  }
}
