import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../../service.service';
import { SignatureService } from '../../../signature.service';

@Component({
  selector: 'app-aar-claimform',
  templateUrl: './aar-claimform.component.html',
  styleUrls: ['./aar-claimform.component.scss']
})
export class AarClaimformComponent implements OnInit {
  patient:any={
    patient:{}
   };
   signature1_src;
   signature1_show;
   signature2_show;
   signature2_src;
   signature_type;
  hospital='AAR HOSPITAL'
  // title=this.patient.patient.phone
  constructor(private route: ActivatedRoute,public service:ServiceService,public signatureService:SignatureService) { 
    this.signatureService.connect();

  }

  ngOnInit() {
    
    this.signatureService.socket().subscribe((res)=>{
        console.log("images",res);
        if (this.signature_type=="staff"){
        
          this.signature2_show=true;
          this.signature2_src=this.service.getSignatureUrl()+res;
        }else if(this.signature_type=="member"){
          this.signature1_show=true;
       
        this.signature1_src=this.service.getSignatureUrl()+res;
        }
    });
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

activateMemberSignature(){
  this.signature_type="member"
  let data={
    'status':'activate',
    'type':'member'
  }
  this.signatureService.send(JSON.stringify(data))
}

activateStaffSignature(){
  this.signature_type="staff";
  let data={
    'status':'activate',
    'type':'staff'
  }
  this.signatureService.send(JSON.stringify(data))
}
}

