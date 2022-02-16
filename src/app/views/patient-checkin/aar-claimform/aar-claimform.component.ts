import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Script } from 'vm';
import { ServiceService } from '../../../service.service';
import { SignatureService } from '../../../signature.service';

@Component({
  selector: 'app-aar-claimform',
  templateUrl: './aar-claimform.component.html',
  styleUrls: ['./aar-claimform.component.scss']
})
export class AarClaimformComponent implements OnInit {
<<<<<<< HEAD

  patient:any={}
  hospital='AAR HOSPITAL'
  constructor(private route: ActivatedRoute,public service:ServiceService) { }

  ngOnInit() {
    this.service.getSinglePatientData_Hospserver(this.route.snapshot.params.id).subscribe((res)=>{
      console.log("HEALTHIX",res);
=======
  patient:any={
    patient:{}
   };
   today;
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
        
       
          this.signature2_src=this.service.getSignatureUrl()+res;
          if(this.signature_type=="staff" && this.signature2_src.search("png")>-1){
            this.signature2_show=true;
          }
        }else if(this.signature_type=="member"){
          this.signature1_src=this.service.getSignatureUrl()+res;
          if(this.signature_type=="member" && this.signature1_src.search("png")>-1){
          this.signature1_show=true;
          this.today=new Date();
          }
       
        }
    });
    this.service.getInsurance(this.route.snapshot.params.id).subscribe((res)=>{
      console.log(res);
>>>>>>> e290ed969881c6ae3c840ba02b8aac8de9c04253
      this.patient = res;
    })
   
  }  
 
 printPage() {
console.log("Resp", this.patient)
document.title=this.patient[0].visit_number


  window.print();
 
}

<<<<<<< HEAD
=======
activateMemberSignature(){
  this.signature_type="member"
  this.signature1_show=false;
  
  let data={
    'status':'activate',
    'type':'member'
  }
  this.signatureService.send(JSON.stringify(data))
}

activateStaffSignature(){
  this.signature_type="staff";
  this.signature2_show=false;
  let data={
    'status':'activate',
    'type':'staff'
  }
  this.signatureService.send(JSON.stringify(data))
}
>>>>>>> e290ed969881c6ae3c840ba02b8aac8de9c04253
}

