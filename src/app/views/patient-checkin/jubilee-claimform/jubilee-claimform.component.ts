import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../../service.service';
import { SignatureService } from '../../../signature.service';

@Component({
  selector: 'app-jubilee-claimform',
  templateUrl: './jubilee-claimform.component.html',
  styleUrls: ['./jubilee-claimform.component.scss']
})
export class JubileeClaimformComponent implements OnInit {

  patient:any={}
  form_data={
    visit_number:"",
    patient:"",
    member:"",
    dob:"",
    member_number :"",
    employer : "",
    department : "",
    phone :"",
    sickness_firsttime:false,
    when_frequency:"",
    member_signature:"",
    member_signature_date:"",
    prescription:false,
    injection:false,
    dispensed:false,
    none:false,
    xray:false,
    mri :false,
    other:false,
    haematology:false,
    microbiology:false,
    biochemistry:false,
    histology:false,
    hospital:"",
    consultant:"",
    speciality:"",
    medication:"",
    practitioner:"",
    practitioner_postal_address:"",
    practitioner_phone:"",
    practitioner_email:"",
    practitioner_tel_no:"",
    practitioner_signature:"",
    practitioner_signature_date:"",
    official_stamp:""
  }
  today1;
  
  today2;
   signature1_src;
   signature1_show;
   signature2_show;
   signature2_src;
   signature_type;
  hospital='AAR HOSPITAL'
  constructor(private route: ActivatedRoute,public service:ServiceService,private signatureService:SignatureService) { }

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
    // if(this.patient_data.visit_number=='' || this.patient_data.visit_number==null ){
    //   this.toast.warning(" Diagnosis is Empty")
    //   return;
    // }
    // this.signatureService.send(JSON.stringify(data))
  }
  checkBoxsickness_firsttime(event,ty){
    if (ty=="yes"){
      this.patient.patient.gender=event.checked
    }
    // this.Update()
  }
}
