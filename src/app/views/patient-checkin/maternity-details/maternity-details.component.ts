import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../../service.service';
import dateFormat, { masks } from "dateformat";
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-maternity-details',
  templateUrl: './maternity-details.component.html',
  styleUrls: ['./maternity-details.component.scss']
})
export class MaternityDetailsComponent implements OnInit {
  clientForm: FormGroup;
  paymentForm: FormGroup;
  otherInfoForm:FormGroup;
  patient_info;
  other_info;
  payment_type;
  payment_info;
  insurances;
  department;
  speciality=[];
  symptoms=[];
  payment_mode;
  submitted;
  nextofKin={
    name:"",
    phone:"",
    residence:"",
    relationship:""
  
  }
  customer= {
    id:'',
    gender:'male',
    phone :'',
    email:'',
    first_name:'',
    last_name:'',
    other_names:'',
    dob:'',

  };
  insurance_company_suggestions=[];
  show_insurance;
  loading: boolean;


  formatter = (result: string) => result.toUpperCase();
search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term === '' ? []
      : this.insurance_company_suggestions.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )
  constructor(private formBuilder:FormBuilder,private route: ActivatedRoute, private service:ServiceService,private toast:ToastrService) { }

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      phone: ['',[Validators.required,Validators.minLength(9)]],
      last_name: ['',Validators.required],
      first_name: ['',Validators.required],
      other_names:['', Validators.required],
      residence: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      religion: ['', Validators.required],
      marital_status:[''],
      patient_number:[''],
      occupation:[''],
      nationality:[''],
      national_id: [''],
      brought_in_by: [''],
  });

    this.paymentForm=this.formBuilder.group({
      cash:['',[Validators.required]],
      mpesa:['',[Validators.required]],
      creditcard:['',[Validators.required]],
      insurance:['',[Validators.required]],
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

    this.otherInfoForm=this.formBuilder.group({
      date:[''],
      time:[''],
      package:[''],
      edd:[''],
      referral:[''],
      current_doctor:['']
    });
    this.service.getMaternityBookingDetail(this.route.snapshot.params.id).subscribe((res)=>{
      this.customer=res.patient;
      // console.log(this.date,"kimmmm")
      // console.log("",this.date)
      this.patient_info={    
          'dob': res.patient.dob,
          'email': res.patient.email != null ? res.patient.email : '',
          'first_name': res.patient.first_name != null ? res.patient.first_name : '',
          'gender':  res.patient.gender != null ?  res.patient.gender : '',
          'last_name':res.patient.last_name != null ? res.patient.last_name : '',
          'national_id': res.patient.national_id != null ? res.patient.national_id : '' ,
          'phone':res.patient.phone != null ? res.patient.phone : '',
          'residence': res.patient.residence != null ? res.patient.residence : '',
          'other_names': res.patient.other_names != null ? res.patient.other_names : '',
          'occupation': res.patient.occupation !=null ? res.patient.occupation : '',
          'marital_status': res.patient.marital_status !=null ? res.patient.marital_status : '',
          'nationality': res.patient.nationality !=null ? res.patient.nationality : '',
          'religion': res.patient.religion !=null ? res.patient.religion : '',
          'patient_number': res.patient.patient_number !=null ? res.patient.patient_number : ''
          
          
      }
      this.other_info={
        date:res.date,
        time:res.time,
        package:res.package,
        edd:res.edd,
        referral:res.referral,
        current_doctor:res.current_doctor
      }
      this.otherInfoForm.patchValue(this.other_info);
      console.log(this.other_info);
      this.nextofKin=res.nextofKin !=null ? res.nextofKin :{ name :'',relationship:'', phone:'',residence:''}
   
      this.payment_mode=res.payment;

      console.log("pateint",this.patient_info);
      
     

      // console.log("DOB",this.date)
      if(res.payment=="Insurance"){
        this.show_insurance=true;
        this.service.getMaternityInsuranceDetails(res.patient.id).subscribe((res2)=>{
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
      // this.paymentForm.patchValue(this.payment_type);
    })
   

    this.service.getInsuranceCompany().subscribe((res)=>{
      console.log("company", res.results[0]);
      for(var i=0;i < res.results.length;i++){
        if (res.results[i].type=="Insurance"){
         this.insurance_company_suggestions.push(res.results[i].name);
        }   
    
    }});
  }

  updateClientData(){
    this.loading=true;
    var client_data=this.clientForm.getRawValue();
    var dob_data=client_data.dob.split("/")
    client_data.dob=dob_data[2]+"-"+dob_data[1]+"-"+dob_data[0]
    let data=Object.assign(client_data,{id:this.customer.id})
    this.service.updateClient(data).subscribe((res)=>{
      this.toast.success("Update was Successful")
      this.loading=false;

    },(err)=>{
      this.toast.error("Update Failed")
      this.loading=false;
    });

  }

  updateNextOfKinData(){
    let data=Object.assign(this.nextofKin,{id:this.customer.id})
    this.service.updateNextofKinData(data).subscribe((res)=>{
      this.loading=false
      this.toast.success("Update was Successful")
    },(error)=>{
      this.loading=false;
      this.toast.error("Update Failed");
    });
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
  cashClicked(event){
    this.show_insurance=false;
    if(event.checked){
    this.payment_mode="Cash";
    }else{
      this.payment_mode="";
    }
  }
  mpesaClicked(event){
    this.show_insurance=false;
    if(event.checked){
      this.payment_mode="Mpesa";
      }else{
        this.payment_mode="";
      }
  }
  creditCardClicked(event){
    this.show_insurance=false;
    if(event.checked){
          
      this.payment_mode="Credit Card";
      }else{
        this.payment_mode="";
      }
  }
  insuranceClicked(event){
    if(event.checked){
      this.show_insurance=true;
      this.payment_mode="Insurance";
      }else{
        this.show_insurance=false;
        this.payment_mode="";
      }
  }
  ngAfterViewInit(){
    if(this.clientForm!=null){
      this.clientForm.patchValue(this.patient_info);
      this.otherInfoForm.patchValue(this.other_info);
      console.log(this.other_info);
      this.paymentForm.patchValue(this.payment_type);
    }
  }
  get c() { return this.clientForm.controls; }
  get p() { return this.paymentForm.controls; }
  get m() { return this.otherInfoForm.controls; }


  updatePaymentDetails(){
    let data=Object.assign(this.paymentForm.getRawValue(),{payment:this.payment_mode})
    this.service.updatePaymentDetails(this.route.snapshot.params.id,'').subscribe((res)=>{
      this.loading=false;
      this.toast.success("Update was successful")
    },(err)=>{
      this.loading=false;
      this.toast.error("Update Failed")
    })
  }
}