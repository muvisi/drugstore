import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ClaimformService } from '../../../claimform.service';
import { ServiceService } from '../../../service.service';
import { SignatureService } from '../../../signature.service';

@Component({
  selector: 'app-minet-claimforms',
  templateUrl: './minet-claimforms.component.html',
  styleUrls: ['./minet-claimforms.component.scss']
})
export class MinetClaimformsComponent implements OnInit {
loading;
editable;
  form_data={
    visit_number:"",
    patient:"",
    member:"",
    dob:"",
    member_number:"",
    employer:"",
    phone:"",
    nature_of_illness:"",
    congenital:false,
    chronic:false,
    recurrent:false,
    work_occupation_related:"",
    first_diagnosed_date:"",
    previous_treatment_date:"",
    current_treatment_date:"",
    underlying_condition :"",
    specialist_referral:false,
    specialist_services_name:"",
    consultation:false,
    laboratory:false,
    dental_optical:false,
    drugs:false,
    total_treatment:"",
    member_signature:"",
    member_signature_date :"",
    practitioner:"",
    practitioner_qualification:"",
    practitioner_signature :"",
    practitioner_signature_date:"", 
    official_stamp:"",
    amount_payable:""
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
    "employee_number": null,
    "department": null,
    "member_number": "",
    "member_name": null,
    "relation": null,
    "card_number": null,
    "id_number": null,
    "nhif_number": null,
    "created": ""
    }
  hospital='AAR HOSPITAL'
  specialist='Yes'
  employer='AAR Hospital Ltd'
  condition='No Underlying Condition'
  employee='Employee Name'
  today1;
  member;
  scheme;
  maxDate;
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
  clientForm: FormGroup;
  @ViewChild('staticModal', { static: false }) staticModal: ModalDirective;
  @ViewChild('clientModal', { static: false }) clientModal: ModalDirective;
  constructor(private route: ActivatedRoute,public service:ServiceService,private formBuilder: FormBuilder,private signatureService:SignatureService,private datePipe: DatePipe,private toast: ToastrService,private claimformService: ClaimformService) { }

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      surname: [''],
      lastname: [''],
      firstname: [''],
      
      email: [''],
      dob: [''],
      phone: [''],
      occupation: [''],
      memberno: [''],
      doctor: [''],
      date: [''],
      specialty: [''],
      employee: [''],
      cardno: [''],
    });
    this.signatureService.connect();
    
    this.today1=new Date();

    this.signatureService.socket().subscribe((res)=>{
      console.log("images",res);
      if (this.signature_type=="staff"){    
     
        this.signature2_src=this.service.getSignatureUrl()+res;
        if(this.signature_type=="staff" && this.signature2_src.search("png")>-1){
         
          this.signature2_show=false;
              
          this.loading=true;
          this.claimformService.signatureMinetOutpatient({visit_number:this.form_data.visit_number,signature:this.signature2_src,type:"PRACTITIONER"}).subscribe((res)=>{
            this.loading=false;
            this.signature2_show=true;
            this.form_data.practitioner_signature_date=this.datePipe.transform(new Date(),'medium')
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
          this.claimformService.signatureMinetOutpatient({visit_number:this.form_data.visit_number,signature:this.signature1_src,type:"MEMBER"}).subscribe((res)=>{
            this.loading=false;
            this.signature1_show=true;
            this.form_data.member_signature_date=this.datePipe.transform(new Date(),'medium')
          },(err)=>{
            this.loading=false;
            this.toast.error("Failed")
          })
        }
     
      }
  });
  this.service.getInsurance(this.route.snapshot.params.id).subscribe((res: any)=>{
    console.log("HEALTHIX",res);
    this.patient = res;
    this.form_data.visit_number=res.insuranceVisit.visit_number;
    this.form_data.patient=res.patient.first_name + " " +res.patient.last_name + " "+res.patient.other_names;
    this.form_data.member =res.patient.first_name + " " +res.patient.last_name + " "+res.patient.other_names;
    this.form_data.dob=res.patient.dob;
    this.form_data.employer=res.scheme_name;
    this.form_data.member_number=res.member_number;
    this.form_data.practitioner=res.insuranceVisit.doctor;
    this.form_data.phone=res.patient.phone;
    this.form_data.current_treatment_date=this.datePipe.transform(new Date(),"MM/dd/yyyy")
    this.form_data.underlying_condition=res.insuranceVisit.diagnoses+" "+res.insuranceVisit.description
    
    try{
    this.form_data.drugs=res.insuranceVisit.services.pharmacy.length >0 ? true : false; 
    }catch(error){}
    var total=0;
    try{
      
      for( var i=0;i<res.insuranceVisit.services.procedure.length;i++){
        total+=Number(res.insuranceVisit.services.procedure[i].amount)
        if (res.insuranceVisit.services.procedure[i].name.includes("Consultation") || res.insuranceVisit.services.procedure[i].name.includes("consultation")){
            this.form_data.consultation=true;
        }else{
          this.form_data.laboratory=true;
        }

      } 
    }catch(error){}
    try{
      for( var i=0;i<res.insuranceVisit.services.pharmacy.length;i++){
        total+=Number(res.insuranceVisit.services.pharmacy[i].amount)
      }
    }catch(error){}
    try{
      for( var i=0;i<res.insuranceVisit.services.others.length;i++){
        total+=Number(res.insuranceVisit.services.others[i].amount)
      }
    }catch(error){}
    this.form_data.total_treatment=total.toString()
    this.form_data.amount_payable=total.toString()


    if(res.insuranceVisit.visit_number!="" && res.insuranceVisit.visit_number!=null){
      this.getInsuranceForm(res.insuranceVisit.visit_number);
    }

  })







}  
getInsuranceForm(no){
  this.claimformService.getMinetOutpatient(no).subscribe(
    (res: any)=>{
      if(res.phone!=null && res.phone!=''){
        this.form_data=res;
        }
        this.editable=res.status;
        if(res.member_signature!=null){
          this.signature1_src=res.member_signature;
          this.signature1_show=true;
        }
        if(res.practitioner_signature!=null){
          this.signature2_src=res.practitioner_signature;  
          this.signature2_show=true;
        }
    },
    (err)=>{}
  )
}

consultationCheckboxChange(event){
  this.form_data.consultation=event.checked

}
labCheckboxChange(event){
  this.form_data.laboratory=event.checked
}
dentalCheckboxChange(event){
  this.form_data.dental_optical=event.checked
}

drugsCheckboxChange(event){
  this.form_data.drugs=event.checked
}

referralCheckboxChange(event,type){
  if(type=='yes'){
    this.form_data.specialist_referral=event.checked;

  }
  if(type=="no")if(event.checked){
    this.form_data.specialist_referral=false;
    
  }else{
    this.form_data.specialist_referral=true;
    
  }
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
    this.loading=true;
    console.log("DATA",this.clientForm.value)
    this.claimformService.updateMinetOutpatient(this.form_data).subscribe((res)=>{
      this.loading=false;
      this.toast.success("Update was Successful")
    },(err)=>{
      this.loading=false;
      this.toast.error("Failed")
    });
   
    
  }
}

