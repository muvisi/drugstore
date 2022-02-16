import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../../service.service';
import { SignatureService } from '../../../signature.service';

@Component({
  selector: 'app-cigna-claimform',
  templateUrl: './cigna-claimform.component.html',
  styleUrls: ['./cigna-claimform.component.scss']
})
export class CignaClaimformComponent implements OnInit {

  patient:any={}
  hospital='AAR HOSPITAL'
  today1;
  today2;
   signature1_src;
   signature1_show;
   signature2_show;
   signature2_src;
   signature_type;
  constructor(private route: ActivatedRoute,public service:ServiceService,private signatureService:SignatureService) { }

  ngOnInit() {
    this.service.getInsurance(this.route.snapshot.params.id).subscribe((res)=>{
      console.log(res);
      this.patient = res;
    })

    this.signatureService.socket().subscribe((res)=>{
      console.log("images",res);
      if (this.signature_type=="staff"){
      
     
        this.signature2_src=this.service.getSignatureUrl()+res;
        if(this.signature_type=="staff" && this.signature2_src.search("png")>-1){
          this.signature2_show=true;
          this.today2=new Date();
        }
      }else if(this.signature_type=="member"){
        this.signature1_src=this.service.getSignatureUrl()+res;
        if(this.signature_type=="member" && this.signature1_src.search("png")>-1){
        this.signature1_show=true;
        this.today1=new Date();
        }
     
      }
  });
  }

  printPage() {
  document.title=this.patient.patient.phone.concat('-01')
    window.print();
  }


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
}
