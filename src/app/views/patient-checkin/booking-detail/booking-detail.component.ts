import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../../service.service';
// import { ServiceService } from '../../../service.service';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent implements OnInit {
  clientForm: FormGroup;
  paymentForm: FormGroup;
  patient_info;
  payment_type;
  payment_info;
  department;
  speciality=[];
  symptoms=[];
  submitted;
  customer;
  show_insurance;
  loading: boolean;
  constructor(private formBuilder:FormBuilder,private route: ActivatedRoute, private service:ServiceService,private toast:ToastrService) { }

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      phone: ['',Validators.required],
      first_name: ['', Validators.required],
      other_names: [''],
      last_name: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['',Validators.email],
      dob: ['', Validators.required],
      residence: [''],
      national_id: ['',Validators.required],
      occupation: [''],
      id: ['']
    });

    this.paymentForm=this.formBuilder.group({
      payment:['',[Validators.required]],
      insurance_company:[''],
      scheme_name:[''],
      scheme_number:[''],
      employee:[''],
      employee_number:[''],
      department:[''],
      member_number:[''],
      member_name:[''],
      relation:[''],
      card_number:[''],
      id_number:[''],
      nhif_number:['']
  
    });
    this.service.getbookingDetails(this.route.snapshot.params.id).subscribe((res)=>{
      this.customer=res.patient;
      this.patient_info={    
          'dob': res.patient.dob != null ? res.patient.dob : '' ,
          'email': res.patient.email != null ? res.patient.email : '',
          'first_name': res.patient.first_name != null ? res.patient.first_name : '',
          'gender':  res.patient.gender != null ?  res.patient.gender : '',
          'last_name':res.patient.last_name != null ? res.patient.last_name : '',
          'national_id': res.patient.national_id != null ? res.patient.national_id : '' ,
          'phone':res.patient.phone != null ? res.patient.phone : '',
          'residence': res.patient.residence != null ? res.patient.residence : '',
          'other_names': res.patient.other_names != null ? res.patient.other_names : '',
          'occupation': res.patient.occupation !=null ? res.patient.occupation : ''
      }
      this.speciality=res.specialist.split(",")
      this.symptoms=res.symptoms.split(",")
      this.department=res.department;
      this.payment_type={'payment':res.payment !=null ? res.payemnt : ''}
      

      console.log("pateint",this.patient_info);
      if(res.payment=="Insurance"){
        this.show_insurance=true;
        this.service.getInsurance(res.id).subscribe((res2)=>{
          console.log(res2);

          this.payment_info={
              "payment":this.payment_type.payment,
              "insurance_company": res2.insurance_company !=  null ? res2.insurance_company : '',
              "scheme_name":  res2.scheme_name !=  null ? res2.scheme_name : '',
              "scheme_number":  res2.scheme_number !=  null ? res2.scheme_number : '',
              "employee":  res2.employee !=  null ? res2.employee : '',
              "employee_number":  res2.employee_number !=  null ? res2.employee_number : '',
              "department": res2.department !=  null ? res2.department : '',
              "member_number":  res2.member_number !=  null ? res2.member_number : '',
              "member_name": res2.member_name !=  null ? res2.member_name : '',
              "relation":  res2.relation !=  null ? res2.relation : '',
              "card_number":  res2.card_number !=  null ? res2.card_number : '',
              "id_number":  res2.id_number !=  null ? res2.id_number : '',
              "nhif_number":  res2.nhif_number !=  null ? res2.nhif_number : ''
            }

            console.log("payement",this.payment_info);
        this.paymentForm.patchValue(this.payment_info);

        })
        


      }
      
      this.clientForm.patchValue(this.patient_info);
      this.paymentForm.patchValue(this.payment_type);
    })
   

  }
  feedbackClicked(){
    this.loading=true;
    this.service.getFeedbackLink({"phone":this.customer.phone}).subscribe((res)=>{
      this.toast.success("Successful")
      this.loading=false
    },(err)=>{
      this.toast.warning("Failed")
      this.loading=false
    });
  }
  ngAfterViewInit(){
    if(this.clientForm!=null)
      this.clientForm.patchValue(this.patient_info);
      this.paymentForm.patchValue(this.payment_type);
  }
  get c() { return this.clientForm.controls; }
  get p() { return this.paymentForm.controls; }
}