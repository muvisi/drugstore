import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClaimformService } from '../../../claimform.service';
import { ServiceService } from '../../../service.service';

@Component({
  selector: 'app-heritage-claimform',
  templateUrl: './heritage-claimform.component.html',
  styleUrls: ['./heritage-claimform.component.scss']
})
export class HeritageClaimformComponent implements OnInit {
  loading;
  patient_data
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




  form_data={
    visit_number:"",
    invoice_number:"",
    first_name:"",
    surname:"",
    member_number:"",
    phone:"",
    dep_code:"",
    dob:"",
    gender:"",
    member_first_name:"",
    member_surname:"",
    employer:"",
    hospital:"",
    practitioner:"",
    treatment_date:"",
    heritage_provider_number:"",
    diagnosis:"",
    consutation_cost:"",
    is_maternity:false,
    laboratory:"",
    laboratory_cost:"",
    procedures:"",
    procedures_cost:"",
    optical:"",
    optical_cost:"",
    dental:"",
    dental_cost:"",
    drugs:"",
    drugs_cost:"",
    total_costs:"",
    member_signature:"",
    member_signature_date:"",
    practitioner_signature:"",
    practitioner_signature_date:"",
    official_stamp:""

  }
  relationship='Self'
  Aartelephone='Emergency:+254 725 225 225 | +254 734 225 225'
  constructor(private route: ActivatedRoute,public service:ServiceService,private claimService: ClaimformService,private datePipe: DatePipe) { }

  ngOnInit() {
    this.service.getSinglePatientData_Hospserver(this.route.snapshot.params.id).subscribe((res)=>{
      console.log("HEALTHIX",res);
      this.patient = res;
      this.form_data.visit_number= res.insuranceVisit.visit_number;
      this.form_data.invoice_number= res.insuranceVisit.invoice_number;
      this.form_data.first_name= res.patient.first_name;
      this.form_data.surname= res.patient.other_names;
      this.form_data.member_number= res.member_number;
      this.form_data.phone= res.patient.phone;
      this.form_data.employer= res.scheme_name;
      this.form_data.hospital= "AAR HOSPITAL"
      this.form_data.practitioner= res.insuranceVisit.doctor;
      this.form_data.treatment_date=this.datePipe.transform(new Date(),"dd/MM/yyyy");
      this.form_data.diagnosis= res.insuranceVisit.diagnoses +" "+ res.insuranceVisit.description;
      this.form_data.practitioner= res.insuranceVisit.doctor;
    })
   
  }  
  edit(){}
 
 printPage() {
console.log("Resp", this.patient)
document.title=this.patient[0].visit_number.concat("-01")


  window.print();
 
}
maternityClicked(event){
  this.form_data.is_maternity=event.checked
}
maternityUnClicked(event){
  if(event.checked)this.form_data.is_maternity=false;
  else this.form_data.is_maternity=true;
}
}

