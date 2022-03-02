import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../../service.service';
import { SignatureService } from '../../../signature.service';
// import { endpoint, ServiceService } from '../../../service.service';
// import { SignatureService } from '../../../signature.service';
@Component({
  selector: 'app-insurance-forms',
  templateUrl: './insurance-forms.component.html',
  styleUrls: ['./insurance-forms.component.scss']
})
export class InsuranceFormsComponent implements OnInit {
  patient:any={}
  hospital='AAR HOSPITAL'
  specialist='Yes'
  employer='AAR Hospital Ltd'
  condition='No Underlying Condition'
  employee='Employee Name'
  relation='Self'
  signature1_src;
   signature1_show;
   signature2_show;
   signature2_src;
   signature_type;
   today1;
  
  constructor(private route: ActivatedRoute,public service:ServiceService,private signatureService:SignatureService) { }

  ngOnInit() {
    
    this.signatureService.connect();
    
    this.today1=new Date();

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
        this.today1=new Date();
        }
     
      }
  });
  this.service.getInsurance(this.route.snapshot.params.id).subscribe((res)=>{
    console.log("HEALTHIX",res);
    this.patient = res;
    
  })
  




}  
 
 printPage() {
console.log("Resp", this.patient)

document.title=this.patient.insuranceVisit.visit_number.concat("-01")


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

