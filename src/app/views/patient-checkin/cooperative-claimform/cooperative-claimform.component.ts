import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../../service.service';

@Component({
  selector: 'app-cooperative-claimform',
  templateUrl: './cooperative-claimform.component.html',
  styleUrls: ['./cooperative-claimform.component.scss']
})
export class CooperativeClaimformComponent implements OnInit {


 
   
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
  window.print();
}

}
