import { DataSource } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { loadavg } from 'os';
import { ClaimformService } from '../../../claimform.service';
import { ServiceService } from '../../../service.service';
import { SignatureService } from '../../../signature.service';

@Component({
  selector: 'app-apa-claimform',
  templateUrl: './apa-claimform.component.html',
  styleUrls: ['./apa-claimform.component.scss']
})
export class ApaClaimformComponent implements OnInit {

  form_data={
    visit_number:"",
    hospital:"",
    hospital_tel_no:"",
    employer:"",
    member_number:"",
    member:"",
    phone:"",
    patient:"",
    dob:"",
    relationship:"",
    idno:"",
    insured_scheme:"",
    final_diagnosis:"",
    when_first_diagnosis:"",
    previous_treatment:"",
    cause_of_illness:"",
    condition_type:"",
    nature_treatment:"",
    is_referral:false,
    consultant:"",
    specialist :"",
    date_accident:"",
    cause_accident:"",
    nature_injuries :"",
    doctors_fees:"",
    drugs_cost:"",
    specialist_cost:"",
    total_claims:"",
    member_signature:"",
    member_signature_date:"",
    practitioner:"",
    practice_phone:"",
    practitioner_signature:"",  
    practitioner_signature_date:"",

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
    "idnumber": null,
    "employer":"",
   "date":"",
    "doctor_specialty": null,
    "doctoraddress": "",
  
    }
  hospital='AAR HOSPITAL KENYA LTD'
  maxDate
  specialist='Yes'
  employer='Employer Name'
  condition='No Underlying Condition'
  employee='Employee Name'
  details='No Records'
  state='Congenital'
  normal='Bacterial'
  space='   '
  amount='000.0'
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
  loading: boolean;
  constructor(private route: ActivatedRoute,public service:ServiceService,private formBuilder: FormBuilder,private signatureService:SignatureService,private toast: ToastrService,private  claimFormService: ClaimformService,private datePipe:DatePipe) { }

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      surname: [''],
      age: [''],
      firstname: [''],
      
      email: [''],
      dob: [''],
      phone: [''],
      occupation: [''],
      memberno: [''],
      doctor: [''],
      specialty: [''],
      diagnosis:[''],
      description:[''],
      employer:[''],
      id:[''],
      address:[''],
      employee:[''],
      date:['']
   
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
            this.claimFormService.signatureApaInsurance({visit_number:this.form_data.visit_number,signature:this.signature2_src,type:"PRACTITIONER"}).subscribe((res)=>{
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
              this.claimFormService.signatureApaInsurance({visit_number:this.form_data.visit_number,signature:this.signature1_src,type:"MEMBER"}).subscribe((res)=>{
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
  this.service.getInsurance(this.route.snapshot.params.id).subscribe((res)=>{
    
   
    this.patient = res;
    this.form_data.hospital="AAR HOSPITAL"
    this.form_data.hospital_tel_no="0111049900"
    this.form_data.visit_number=res.insuranceVisit.visit_number;
    this.form_data.patient=res.patient.first_name + " " +res.patient.last_name + " "+res.patient.other_names;
    this.form_data.member =res.patient.first_name + " " +res.patient.last_name + " "+res.patient.other_names;
    this.form_data.dob=res.patient.dob;
    this.form_data.employer=res.scheme_name;
    this.form_data.member_number=res.member_number;
    this.form_data.practitioner=res.insuranceVisit.doctor;
    this.form_data.phone=res.patient.phone;
    this.form_data.final_diagnosis=res.insuranceVisit.diagnoses+" "+res.insuranceVisit.description
    
    try{
      var total_drugs=0;
      for( var i=0;i<res.insuranceVisit.services.pharmacy.length;i++){
        total_drugs+=Number(res.insuranceVisit.services.pharmacy[i].amount)
      }
      this.form_data.drugs_cost=total_drugs.toString();
    }catch(error){}
    try{
      var total_specialist=0;
      for( var i=0;i<res.insuranceVisit.services.procedure.length;i++){
        total_specialist+=Number(res.insuranceVisit.services.procedure[i].amount)
      }
      this.form_data.specialist_cost=total_specialist.toString();
    }catch(error){}
    var total=0;
    try{
      
      for( var i=0;i<res.insuranceVisit.services.procedure.length;i++){
        total+=Number(res.insuranceVisit.services.procedure[i].amount)
             
       
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
    this.form_data.total_claims=total.toString()
  
    if(res.insuranceVisit.visit_number!="" && res.insuranceVisit.visit_number!=null){
      this.getInsuranceForm(res.insuranceVisit.visit_number);
    }
    
  })
  




}  
getInsuranceForm(no){
  this.claimFormService.getApaInsurance(no).subscribe(
    (res: any)=>{
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
    },
    (err)=>{}
  )
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
    this.claimFormService.updateApaInsurance(this.form_data).subscribe(
      (res)=>{
        this.loading=false;
        this.toast.success("Update Successfully")
      },
      (err)=>{
        this.toast.error("Update Failed")
        this.loading=false;

      }
    )
    
  }
}

