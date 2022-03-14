import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RSA_NO_PADDING } from 'constants';
import { ModalDirective } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { execPath } from 'process';
import { ClaimformService } from '../../../claimform.service';
import { ServiceService } from '../../../service.service';
import { SignatureService } from '../../../signature.service';

@Component({
  selector: 'app-oldmutual-claimform',
  templateUrl: './oldmutual-claimform.component.html',
  styleUrls: ['./oldmutual-claimform.component.scss']
})
export class OldmutualClaimformComponent implements OnInit {

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
  
  patient:any={
    "id": "",
    "patient": {
    "id": "",
    "first_name": "",
    "last_name": "",
    "age": null,
    "other_names": "",
    "dob": null,
    "email": "",
    "phone": "",
    "occupation": null,
    "gender": "",
    "county": null,
    "residence": null,
    "national_id": null,
    "created": ""
    },
    "booking": {},
    "insuranceVisit": {
    "id": "",
    "visit_number": "",
    "copay": "0.00",
    "claimed_amount": "",
    "doctor": " ",
    "diagnoses": "",
    "description": "",
    "check_in": "",
    "check_out": null,
    "visit_type": "",
    "services": {
    "others": [],
    "pharmacy": [
    {
    "name": "",
    "amount": "603.40"
    },
    {
    "name": "ZINCAT-OD 20MG5ML 60ML",
    "amount": "143.640"
    },
    {
    "name": "CYCLOPAM SUSP 30ML(DICYCLOMINE + SIMETHICONE)",
    "amount": "173.60"
    },
    {
    "name": "PAROL 250MG/5ML SYRUP 100ML(PARACETAMOL)",
    "amount": "220.0"
    },
    {
    "name": "EMITOSS SUSPENSION 2MG/5ML 30ML(ONDANSETRON)",
    "amount": "322.0"
    }
    ],
    "procedure": [
    {
    "name": "Outpatient Consultation Charges",
    "amount": "1750.000"
    },
    {
    "name": "TOTAL BLOOD COUNT (TBC,FBC,QBC)",
    "amount": "1300.000"
    },
    {
    "name": "URINE ROUTINE(URINALYSIS)",
    "amount": "900.000"
    }
    ]
    },
    "services_status": "",
    "status": "",
    "patient": ""
    },
    "insurance_company": "",
    "scheme_name": "",
    "scheme_number": "",
    "employee": null,
    "doctoremail": null,
    "telno": null,
    "doctorphone": null,
    "address": null,
    "employee_number": null,
    "department": null,
    "member_number": "",
    "member_name": null,
    "relation": null,
    "specialty": null,
    "onset": null,
    "member_sigdate": "",
    "doctor_sigdate":"",
    "card_number": null,
    "id_number": null,
    "nhif_number": null,
    "created": ""
    }
  hospital='AAR HOSPITAL LTD'
  specialist='Yes'
  employer='AAR Hospital Ltd'
  condition='No Underlying Condition'
  employee='Employee Name'
  today1;
  maxDate;
  
  member;
  scheme;
  diagnoses;
  email;
  doctor;
  membernumber;
  description;
  visit;
  signature1_src;
  signature1_show;
  signature2_show;
  signature2_src;
  signature_type;
  @ViewChild('staticModal', { static: false }) staticModal: ModalDirective;
  @ViewChild('clientModal', { static: false }) clientModal: ModalDirective;
  loading: boolean;
  constructor(private route: ActivatedRoute,public service:ServiceService,private formBuilder: FormBuilder, private signatureService:SignatureService,private claimformService: ClaimformService,private toast: ToastrService,private datepipe: DatePipe) { }

  ngOnInit() {
    
    this.signatureService.connect();
    
    this.today1=new Date();

    this.signatureService.socket().subscribe((res)=>{
      console.log("images",res);
      if (this.signature_type=="staff"){    
     
        this.signature2_src=this.service.getSignatureUrl()+res;
        if(this.signature_type=="staff" && this.signature2_src.search("png")>-1){
          this.signature2_show=false;
              
          this.loading=true;
          this.claimformService.signatureUapOutpatient({visit_number:this.form_data.visit_number,signature:this.signature2_src,type:"PRACTITIONER"}).subscribe((res)=>{
            this.loading=false;
            this.signature2_show=true;
            this.form_data.practitioner_signature_date=this.datepipe.transform(new Date(),'medium')
          },(err)=>{
            this.loading=false;
            this.toast.error("Failed")
          })
         
        }
      }else if(this.signature_type=="member"){
        this.signature1_src=this.service.getSignatureUrl()+res;
        if(this.signature_type=="member" && this.signature1_src.search("png")>-1){
          this.signature1_show=false;       
          this.loading=true;
          this.claimformService.signatureUapOutpatient({visit_number:this.form_data.visit_number,signature:this.signature1_src,type:"MEMBER"}).subscribe((res)=>{
            this.loading=false;
            this.signature1_show=true;
            this.form_data.member_signature_date=this.datepipe.transform(new Date(),'medium')
          },(err)=>{
            this.loading=false;
            this.toast.error("Failed")
          })
       
       
        }
     
      }
  });
  this.service.getInsurance(this.route.snapshot.params.id).subscribe((res)=>{
    console.log("HEALTHIX",res);

    this.patient = res;
    this.form_data.visit_number=res.insuranceVisit.visit_number;
    this.form_data.patient=res.patient.first_name +" "+res.patient.last_name+" "+res.patient.other_names;
    this.form_data.member=res.patient.first_name +" "+res.patient.last_name+" "+res.patient.other_names;
    this.form_data.dob=res.patient.dob;
    this.form_data.phone=res.patient.phone;
    this.form_data.employer=res.scheme_name!=null? res.scheme_name: '';
    this.form_data.hospital='AAR HOSPITAL';
    this.form_data.speciality=res.specialty!= null ? res.specialty : '';
    this.form_data.member_number= res.member_number !=null ? res.member_number : '';
    this.form_data.practitioner= res.insuranceVisit.doctor != null ? res.insuranceVisit.doctor :''; 
  
  

  
      this.form_data.visit_number=res.insuranceVisit.visit_number;
  
  
  
    var str_serv=""
   
   try{
   
      for(var i=0;i<res.insuranceVisit.services.pharmacy.length;i++){
        try{
        str_serv=str_serv.concat(res.insuranceVisit.services.pharmacy[i].name).concat("  ")
      }catch(error){
      }
      }    
   }catch(error){}
    
  
  
   try{ 
      for(var i=0;i<res.insuranceVisit.services.procedure.length;i++){
        try{
        str_serv=str_serv.concat(res.insuranceVisit.services.procedure[i].name).concat("   ")
      }catch(error){
      }
      }
    }catch(error){}
       
  
  
    this.form_data.medication=str_serv;
    try{
      this.form_data.prescription= res.insuranceVisit.pharmacy.length >0? true :false;
    }catch(error){
    }
  
    if(res.insuranceVisit.visit_number!="" && res.insuranceVisit.visit_number!=null){
      this.getInsuranceForm(res.insuranceVisit.visit_number);
    }
    
    
  })
  




}  

getInsuranceForm(no){
  this.claimformService.getUapOutpatient(no).subscribe((res: any)=>{
    if(res.phone!=null && res.phone!=''){
    this.form_data=res;
    }
    if(res.member_signature!=null){
      this.signature1_src=res.member_signature;
      this.signature1_show=true;
    }
    if(res.practitioner_signature!=null){
      this.signature2_src=res.practitioner_signature;    
      this.signature2_show=true;
    }
  },(err)=>{

  })

}
checkBoxsickness_firsttime(event,ty){
  if (ty=="yes"){
    this.form_data.sickness_firsttime=event.checked
  }
  this.Update()
}
checkBoxPrescription(event){
  this.form_data.prescription=event.checked;
  this.Update()
}
checkBoxInjection(event){
this.form_data.injection=event.checked;
this.Update()
}
checkBoxDispensed(event){
this.form_data.dispensed=event.checked;
this.Update()
}
checkBoxNone(event){
this.form_data.none=event.checked;
this.Update()
}

checkBoxXray(event){
this.form_data.xray=event.checked;
this.Update()
}
checkBoxMri(event){
this.form_data.mri=event.checked;
this.Update()
}
checkBoxOther(event){
this.form_data.other=event.checked;
this.Update()
}
checkBoxHaematology(event){
  this.form_data.haematology=event.checked;
  this.Update()
  
}
checkBoxMicrobiology(event){
this.form_data.microbiology=event.checked;
this.Update()
}
checkBoxBiochemistry(event){
this.form_data.biochemistry=event.checked;
this.Update()
}
checkBoxHistology(event){
this.form_data.histology=event.checked;
this.Update()
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
  edit(){
    
    this.clientModal.show();
  }
  Update(){    
    this.clientModal.hide();
    this.claimformService.updateUapOutpatient(this.form_data).subscribe((res)=>{

    },
    (err)=>{

    })
    
  }
}

