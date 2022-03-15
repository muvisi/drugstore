import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Script } from 'vm';
import { ServiceService } from '../../../service.service';
import { SignatureService } from '../../../signature.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup } from '@angular/forms';
import {FormBuilder, Validators} from '@angular/forms';
import { ClaimformService } from '../../../claimform.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-aar-claimform',
  templateUrl: './aar-claimform.component.html',
  styleUrls: ['./aar-claimform.component.scss']
})
export class AarClaimformComponent implements OnInit {
  editable;
  clinics_data={
    first_visit:false,
    complaints:"",
    physical_findings:"",
    laboratory_radiology_findings:"",
    diagnosis:"",
    management_plan:""
  }

  speciality_data={
    practitioner:"",
    speciality:""
  }

  patient_data={
    visit_number:'',
    member:'',
    dob:'',
    member_number:'',
    employer:'',
    phone:'',
    email:'',
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
    "employer":"",
    "employee": null,
    "employee_number": null,
    "department": null,
    "member_number": "",
    "member_name": null,
    "relation": null,
    "card_number": null,
    "id_number": null,
    "nhif_number": null,
    "doctor_specialty": null,
    "created": ""
    }
  hospital='AAR HOSPITAL'
  maxDate
  specialist='Yes'
  employer='Employer Name'
  condition='No Underlying Condition'
  employee='Employee Name'
  details='No Records'
  state='Congenital'
  normal='Bacterial'
  amount='000.0'

  loading;

  @ViewChild('staticModal', { static: false }) staticModal: ModalDirective;
  @ViewChild('clientModal', { static: false }) clientModal: ModalDirective;
 
  Aartelephone='Emergency:+254 725 225 225 | +254 734 225 225'
 
  today1;
  
  today2;
   signature1_src;
   signature1_show;
   signature2_show;
   signature2_src;
   signature_type;
   clientForm: FormGroup;
  constructor(private route: ActivatedRoute,public service:ServiceService,private formBuilder: FormBuilder,private signatureService:SignatureService,private claimformService: ClaimformService,private toast: ToastrService) { }

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      surname: [''],
      lastname: [''],
      firstname: [''],
      
      email: [''],
      dob: [''],
      phone: [''],
      employer: [''],
      memberno: [''],
      doctor: [''],
      specialty: [''],
      diagnosis:[''],
      description:['']
    });

    
    this.signatureService.connect();
    


    this.signatureService.socket().subscribe((res)=>{
      console.log("images",res);
      if (this.signature_type=="staff"){       
        this.signature2_src=this.service.getSignatureUrl()+res;
        if(this.signature_type=="staff" && this.signature2_src.search("png")>-1){
          this.signature2_show=false;
         
          this.loading=true;
          this.claimformService.signatureAARForm({visit_number:this.patient_data.visit_number,signature:this.signature2_src,type:"PRACTITIONER"}).subscribe((res)=>{
            this.loading=false;
            this.signature2_show=true;
            this.today2=new Date();
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
        this.claimformService.signatureAARForm({visit_number:this.patient_data.visit_number,signature:this.signature1_src,type:"MEMBER"}).subscribe((res)=>{
          this.loading=false;
          this.signature1_show=true;
          this.today1=new Date();
        },(err)=>{
          this.loading=false;
          this.toast.error("Failed")
        })
        }
     
      }
  });
  this.service.getInsurance(this.route.snapshot.params.id).subscribe((res)=>{
    console.log("HEALTHIX",res);
    this.patient =res;
    this.patient_data.visit_number=res.insuranceVisit.visit_number;
   
   
   
    this.patient_data.member=res.patient.first_name+" "+res.patient.last_name+" "+res.patient.other_names;
    this.patient_data.dob=res.patient.dob;
    this.patient_data.member_number=res.member_number;
    this.patient_data.employer=res.scheme_name;
    this.patient_data.phone=res.patient.phone;
    this.patient_data.email=res.patient.email;
    var diagnosis= res.insuranceVisit.diagnoses != null? res.insuranceVisit.diagnoses : " " 
    diagnosis=diagnosis.concat(" ").concat(res.insuranceVisit.description)
    this.clinics_data.diagnosis=diagnosis
    this.speciality_data.practitioner= res.insuranceVisit.doctor!=null ? res.insuranceVisit.doctor  : ""
    var costs=""
    try{
    for (var i=0;i<res.insuranceVisit.services.procedure.length;i++){
      try{
      costs=costs.concat(res.insuranceVisit.services.procedure[i].name+"("+ res.insuranceVisit.services.procedure[i].amount+")").concat(" ")
      }catch(error){}
    }}catch(error){}
    try{
    for (var i=0;i<res.insuranceVisit.services.pharmacy.length;i++){
      try{
      costs=costs.concat(res.insuranceVisit.services.pharmacy[i].name+"("+ res.insuranceVisit.services.pharmacy[i].amount+")").concat(" ")
      }catch(error){}
    }}catch(error){}
    console.log(costs)
    this.clinics_data.management_plan=costs;
    

    this.claimformService.getAARForm(this.patient_data.visit_number).subscribe((res)=>{

    },(err)=>{});


    if(res.insuranceVisit.visit_number!="" && res.insuranceVisit.visit_number!=null){
      this.getInsuranceForm(res.insuranceVisit.visit_number);
    }

  })
  




}  

first_visit_change(event,ty){
  if(event.checked && ty=="first"){
    this.clinics_data.first_visit=true;
  }else{
    this.clinics_data.first_visit=false;
  }
  this.Update()
}

getInsuranceForm(no){
  this.claimformService.getAARForm(no).subscribe((res: any)=>{

    console.log(">>",res.laboratory_radiology_findings);
    if(res.phone!=null&&res.phone!='')
    {
      this.clinics_data.first_visit=res.first_visit;
    this.clinics_data.complaints=res.complaints;
    this.clinics_data.physical_findings=res.physical_findings;
    this.clinics_data.laboratory_radiology_findings=res.laboratory_radiology_findings;
    this.clinics_data.diagnosis=res.diagnosis;
    this.clinics_data.management_plan=res.management_plan;
    this.speciality_data.practitioner=res.practitioner;
    this.speciality_data.speciality=res.speciality;        
    this.patient_data.visit_number=res.visit_number
    this.patient_data.member=res.member
    this.patient_data.dob=res.dob
    this.patient_data.member_number=res.member_number
    this.patient_data.employer=res.employer
    this.patient_data.phone=res.phone
    this.patient_data.email=res.email
  }
    
    if(res.member_signature!=null){
      this.signature1_src=res.member_signature;
      this.today1=res.member_signature_date;
      this.signature1_show=true;
    }
    if(res.practitioner_signature!=null){
      this.signature2_src=res.practitioner_signature;
      this.today2=res.practitioner_signature_date;
      this.signature2_show=true;
    }

    this.editable=res.status

    
    
  
    
    
    
    
    
    
    
  
  },(err)=>{

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
    if(this.patient_data.visit_number=='' || this.patient_data.visit_number==null ){
      this.toast.warning(" Diagnosis is Empty")
      return;
    }
    this.signatureService.send(JSON.stringify(data))
  }
  edit(){
    
    this.clientModal.show();
  }
  Update(){
    this.loading=true;
    // member_signature
    //practitioner_signature
    console.log(this.speciality_data)
    var data=Object.assign(this.patient_data,this.speciality_data);
    data=Object.assign(data,this.clinics_data);
    this.claimformService.updateAARForm(data).subscribe(
      (res)=>{
        this.loading=false;
        this.clientModal.hide();

      },(err)=>{
        this.loading=false;
      }
    );  
  
    
  }
}

