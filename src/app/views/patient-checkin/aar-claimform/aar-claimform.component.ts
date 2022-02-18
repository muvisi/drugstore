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

  patient:any={}
  hospital='AAR HOSPITAL'
  specialist='Yes'
  employer='Employer Name'
  condition='No Underlying Condition'
  employee='Employee Name'
  details='No Records'
  state='Congenital'
  normal='Bacterial'
  amount='000.0'
  // member=this.patient[0].member
  Aartelephone='Emergency:+254 725 225 225 | +254 734 225 225'
  // constructor(private route: ActivatedRoute,public service:ServiceService) { }
  today1;
  member;
  scheme;
  diagnoses;
  email;
  doctor;
  membernumber;
  description;
  today2;
   signature1_src;
   signature1_show;
   signature2_show;
   signature2_src;
   signature_type;
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
  this.service.getSinglePatientData_Hospserver(this.route.snapshot.params.id).subscribe((res)=>{
    console.log("HEALTHIX",res);
    this.patient = res;
    this.email=this.patient[0].email
    this.doctor=this.patient[0].doctor_name
    this.diagnoses=this.patient[0].diagnoses
    this.scheme=this.patient[0].scheme_name
    this.description=this.patient[0].description
    this.member=this.patient[0].member
    this.membernumber=this.patient[0].member_number
  })
  }  
 
 printPage() {
console.log("Resp", this.patient)
// this.member=this.patient[0].member
// console.log("member",this.member)
document.title=this.patient[0].visit_number.concat("-01")


  window.print();
 
}

// mmm(){
//     this.signatureService.socket().subscribe((res)=>{
//       console.log("images",res);
//       if (this.signature_type=="staff"){
      
     
//         this.signature2_src=this.service.getSignatureUrl()+res;
//         if(this.signature_type=="staff" && this.signature2_src.search("png")>-1){
//           this.signature2_show=true;
//           this.today2=new Date();
//         }
//       }else if(this.signature_type=="member"){
//         this.signature1_src=this.service.getSignatureUrl()+res;
//         if(this.signature_type=="member" && this.signature1_src.search("png")>-1){
//         this.signature1_show=true;
//         this.today1=new Date();
//         }
     
//       }
//   });
//   }

  // printPagew() {
  // document.title=this.patient.patient.phone.concat('-01')
  //   window.print();
  // }


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

