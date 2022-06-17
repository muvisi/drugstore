import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Button } from 'selenium-webdriver';
import { MatStepper } from '@angular/material/stepper';
import { Observable, of, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { CLINICS } from '../../../utils/constants';
import {EMPLOYEE_RELATIONSHIP}  from '../../../utils/constants';
import { DatePipe, DOCUMENT } from '@angular/common';
import { MatDialog } from '@angular/material';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ServiceService } from '../../../service.service';
@Component({
  selector: 'app-maternity',
  templateUrl: './book-maternity.component.html',
  styleUrls: ['./book-maternity.component.scss']
})
export class BookMaternityComponent implements OnInit {
  registerForm: FormGroup;
  todaysForm:FormGroup;
  dateTimeForm:FormGroup;
  patientMobileForm: FormGroup;
  pateintConfirmationForm:FormGroup;
  paymentForm:FormGroup;
  medicalForm: FormGroup;
  packageForm:FormGroup;
  maxDate=new Date();
  reffered_by=false;
  nextOfKinForm: FormGroup;
  loading=false;
  guardian=false;
  guardian_button=false;
  sysptoms=[];
  other_sysptoms=false;
  other_sysptoms_value;
  specialist_visible=false;
  insurance=false;
  checkboxs=[];
  future_booking=true;
  confirm_patient=false;
  patient_id;
  email_confirmation=false;
  email_confirmation_submitted=false;
  national_id_confirmation=false;
  national_id_confirmation_submitted=false;
  dob_confirmation=false;
  dob_confirmation_submitted=false;

  refferal_show=false;
  currect_doctor_show=false;




  insurance_company = new FormControl();
  searchPatient=new FormControl();


  insurance_comapny_suggestions=[]
  session_today=false;
  myAwesomeArrayOfAwesomeStuff = [{name: "Cyborg Duck", powerLevel: "Unlimited" }]


  registration_today;

  EMPLOYEE_RELATIONSHIP=EMPLOYEE_RELATIONSHIP;
  confirmation_insurance_details=false;

  confirm_data={
    id:'',
    patient:{
      email: '',
      phone: '',
      last_name: '',
      first_name: '',
      other_names: '',
      residence: '',
      dob: '',
      national_id: ''
    },
    nextofkin:{
      phone: '',
      name:'',
      residence: '',
      relationship: ''
    },
    date:'',
    time:'',
    edd:'',
    first_time:'',
    payment:'',
    referred_by:'',
    practitioner:'',
    maternity_package:'',
    package:'',
    referral:'',
    current_doctor:'',
    insurance:{
      insurance_company:'',
      file:'',
      scheme_name:'',
      scheme_number:'',
      employee:'',
      employee_number:'',
      department:'',
      member_number:'',
      member_name:'',
      relation:'',
      card_number:'',
      id_number:'',
      nhif_number:''
    }


  }

first_show=true;
second_show=true;
last_show=false;
secondlast_show=false;
thirdlast_show=false;



  @ViewChild('register',{static:true}) registerFormElement:NgForm;
  @ViewChild('guadian',{static:true}) nextOfKinFormElement:NgForm;
  @ViewChild('staticModal', { static: false }) staticModal: ModalDirective;
  @ViewChild('stepper',{static:true})  stepper: MatStepper;
  email_confirmation_txt: any;
  patient_show_email: boolean;
  patient_show_id: boolean;
  patient_show_phone: boolean;
  outfilled=false;
  next_of_kin_has_data=true;
  specialists =[];
  placeholder_reffered_by: string;
  maternitypackageForm: FormGroup;
  practitioner_show: boolean;
  maternity_id: any;
  show_cs_package_detail: boolean;
  show_normal_package_detail: boolean;
  show_bank_details: boolean;
  constructor(public dialog: MatDialog,private datePipe:DatePipe, private route: ActivatedRoute,private formBuilder: FormBuilder,public service: ServiceService,public router: Router,public toast:ToastrService,@Inject(DOCUMENT) private document: Document) { 

  }
  public insurance_s: any;

  formatter = (result: string) => result.toUpperCase();

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.insurance_comapny_suggestions.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  
  ngOnInit() {
    this.patientMobileForm=this.formBuilder.group({
      phone:['']
    })
 
  
      if(localStorage.getItem('TOKEN')==this.route.snapshot.params.token &&  localStorage.getItem('FEEDBACK')=='true'){
        this.router.navigateByUrl("/feedback/"+this.route.snapshot.params.token);
      }

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.email,Validators.required]],
      phone: ['', [Validators.minLength(9),Validators.required]],
      last_name: ['', Validators.required],
      first_name: ['', Validators.required],
      other_names: ['', Validators.required],
      residence: ['', Validators.required],
      dob: ['', Validators.required],
      national_id: [''],
  });
  this.todaysForm=this.formBuilder.group({
    is_today:['',[Validators.required]]
  });
  this.dateTimeForm=this.formBuilder.group({
    date:[''],
    time:[''],
  });
  
  this.pateintConfirmationForm=this.formBuilder.group({
    email:['',[Validators.email]],
    national_id:[''],
    dob:['']
  });
  this.paymentForm=this.formBuilder.group({
    payment:['',[Validators.required]],
    file:[''],
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
  this.packageForm=this.formBuilder.group({
    package:[''],
  });

  this.maternitypackageForm=this.formBuilder.group({
    maternity_package:['',Validators.required],
    practitioner:[''],

  });
  

  this.nextOfKinForm = this.formBuilder.group({
    phone: ['', [Validators.minLength(9),Validators.required]],
    first_name: ['', Validators.required],
    residence: ['', Validators.required],
    relationship: ['', Validators.required],
});
this.medicalForm =this.formBuilder.group({
  edd:[''],
  referral:[''],
  current_doctor:[''],
  first_time:['', Validators.required],
  referred_by:['']
}) 

// this.patientOptions = this.searchPatient.valueChanges.pipe(
//   startWith(''),
//   map(value => (typeof value === 'string' ? value : value.phone)),
//   map(phone => (phone ? this._filterPateint(phone) : this.patients.slice())),
// );



this.getSchemesandPayer();

if(this.route.snapshot.params.token){
  this.session_today=true;
}
 }









  get f() { return this.registerForm.controls; }
  get g() { return this.nextOfKinForm.controls; }
  get m() { return this.medicalForm.controls; }
  get p() { return this.paymentForm.controls; }
  get fs() { return this.todaysForm.controls; }
  get pc() { return this.pateintConfirmationForm.controls; }
  get ma() { return this.maternitypackageForm.controls; }
  

  addpatientdata(){
    // "patient":patient,
    let clinic_data={
      clinic:this.medicalForm.get("clinic").value["name"],
      other_specialist:this.medicalForm.get("other_specialist").value
    }
   
    var post_data= {
          
      "patient":this.registerForm.value,
      "nextofkin":this.nextOfKinForm.value,
      "payments":this.paymentForm.value,
      "sysptoms":this.sysptoms,
      "specialist":Object.assign(clinic_data,{"specialist":this.specialists.join()})


  };
  if (!this.session_today){
  post_data=Object.assign(post_data,{"todays":this.todaysForm.value})
  post_data=Object.assign(post_data,{"datetime":this.dateTimeForm.value})
  
}else{

    post_data=Object.assign(post_data,{"todays":{is_today:"yes"}})
    var date=new Date()
    post_data=Object.assign(post_data,{"datetime":{date:"",time:this.datePipe.transform(date, 'HH:mm')}})
  }
  
  console.log(post_data);
  this.loading=true;
    this.service.addPatient(
     post_data
    ).subscribe((res)=>{
    
      console.log(">>","adassd");
      this.loading=false;
      if(this.route.snapshot.params.token && this.route.snapshot.params.token!='patient'){

        localStorage.setItem('FEEDBACK','true');
        localStorage.setItem('TOKEN',this.route.snapshot.params.token);
      }
      localStorage.setItem('TRACKING_TOKEN', res.tracking_token);
      localStorage.setItem('TRACKING_STATUS', res.tracking_status);
      localStorage.setItem('QUEUE_STATUS', res.queue_status);      
      this.toast.success('Successfully!', 'Data Submitted successfully!');
      // if( res.tracking_status){
    
      //   // this.router.navigateByUrl('/confirm-arrival')
        
      // }
      this.router.navigateByUrl('/finished')
      console.log(res)

      
    },(err)=>{
      this.loading=false;
      console.log(err)
       this.toast.warning('Failed!');
    });
    
   
  }




  getSchemesandPayer(){
    this.service.getInsuranceCompany().subscribe((res)=>{
        console.log("company", res.results[0]);
        for(var i=0;i < res.results.length;i++){
          if (res.results[i].type=="Insurance"){
           this.insurance_comapny_suggestions.push(res.results[i].name);
          }
      
      
      }
      // this.filteredOptions = this.myControl.valueChanges.pipe(
      //   startWith(''),
      //   map(value => (typeof value === 'string' ? value : value.name)),
      //   map(name => (name ? this._filter(name) : this.options.slice())),
      // );
    },(err)=>{

    })
   
  }
  provideGuardianInfo(){
    this.guardian=true;
  }
  patientDobChange(){
    // let dob=this.registerForm.get('dob').value
    // let age=this.getAge(dob);
    // if(age<12){
    //   console.log("under_age");
    //     this.patient_show_email=true;
    //     this.patient_show_id=true;
    //     this.patient_show_phone=true;
    // }else if(age<18){
    //   console.log("under_age");
    //   this.patient_show_id=true;
    // }else{
    //   console.log("over_age");
    //   this.patient_show_email=false;
    //     this.patient_show_id=false;
    //     this.patient_show_phone=false;
    // }
    
  }

getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
  todayChange(value){
    if (value=='no'){
      this.future_booking=false;
      this.dateTimeForm=this.formBuilder.group({
        date:['',[Validators.required]],
        time:['',[Validators.required]]
      });
    }else{
      this.future_booking=true; 
      this.dateTimeForm=this.formBuilder.group({
        date:[''],
        time:['',[Validators.required]]
      });
    }
  }
  submitFirstTime(){
    this.stepper.next();
    let date=new Date()
    var time=this.datePipe.transform(date, 'HH:mm');
    var d=this.datePipe.transform(date, 'MM/dd/yyyy');
    this.dateTimeForm.patchValue({time:time,date:d})  
 
  }

  submitDateTime(){    
  
    var post_data=Object.assign(this.todaysForm.value,this.dateTimeForm.value)
    post_data['id']=this.patient_id;
    this.loading=true;
      this.service.postDateMaternity(post_data).subscribe((res)=>{
        this.loading=false;
        if(res.status){
        this.toast.success(res.message);
        this.confirm_data=res.data;
        this.stepper.next()
        if (res.payment=="Insurance"){
          this.confirmation_insurance_details=true;
        }
      
        }
        else{
        this.toast.error(res.message);
        }

      },(err)=>{
        this.loading=false;
        this.toast.success("Failed to save");
      });
  }
  
  
  submitPatientInfo(){
    this.loading=true;
    this.service.postpatientMaternity(this.registerForm.value).subscribe((res)=>{
     
      this.loading=false;
      this.toast.success("Successfully Saved");
      var t=this.second_show;
      var t2=this.confirm_patient;
      this.patient_id=res.id;
      this.first_show=false;
      this.second_show=false;
      this.confirm_patient=false;
      this.last_show=true;
      this.secondlast_show=true;
      this.thirdlast_show=true;
      if(t){
       this.stepper.previous();
        
        if(t2==true){
          this.stepper.previous();
        }
      }else{
        this.stepper.next();
      }

     
    },(err)=>{
      this.loading=false;
      this.toast.error("Failed to save");
    });
  }
  insuranceClicked(){
    this.insurance=true;
    this.paymentForm=this.formBuilder.group({
      payment:['',[Validators.required]],
      insurance_company:['',[Validators.required]],
      scheme_name:['',[Validators.required]],
      scheme_number:[''],
      file:[''],
      employee:['',[Validators.required]],
      employee_number:[''],
      department:[''],
      member_number:['',[Validators.required]],
      member_name:[''],
      relation:['',[Validators.required]],
      card_number:[''],
      id_number:['',[Validators.required]],
      nhif_number:['']
  
    });
    this.show_bank_details=false;
  }
  insuranceUnClicked(type){
    
  this.insurance=false;
  this.paymentForm=this.formBuilder.group({
    payment:['',[Validators.required]],
    insurance_company:[''],
    file:[''],
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


  if(type=='Bank'){
    this.show_bank_details=true;
  }else{
    this.show_bank_details=false;
  }
  }
  submitpayment(){  

    this.loading=true;
    let data=Object.assign(this.paymentForm.value,{id:this.patient_id})
    // const keys = Object.keys(data);
    // const formData = new FormData();
    
    // for(var i=0;i<keys.length;i++){
    //   formData.append(keys[i], data[keys[i]]); 
    // }
    // formData.append('file', this.paymentForm.get('file').value);
  
    this.service.postPaymentMaternity(data).subscribe((res)=>{
      this.loading=false;
      this.toast.success("Submitted successfully")      
      this.stepper.next();
      console.log("asdasd")
     
     
      
    },(err)=>{
      this.loading=false;
      this.toast.error("Failed to submit") 
    })

  }
  submitGuardianInfo(){
    this.loading=true;
    var data=Object.assign(this.nextOfKinForm.value,{name:this.nextOfKinForm.get('first_name').value})
      data=Object.assign(data,{id:this.patient_id})  
    this.service.postNextofkinMaternity(data).subscribe((res)=>{
      this.loading=false;
      this.toast.success("Submitted successfully")      
      this.stepper.next();
      
    },(err)=>{
      this.loading=false;
      this.toast.error("Failed to submit") 
    })
   
  }

  submitMedicalInfo(){


    this.loading=true;
    let data=Object.assign(this.medicalForm.value,{id:this.patient_id})

    this.dateTimeForm.patchValue({date:data.edd})
    
    this.service.postMedicalInfoMaternity(data).subscribe((res)=>{
      this.loading=false;
      this.toast.success("Submitted successfully")      
      this.stepper.next();
      this.maternity_id=res.data.id;
    },(err)=>{
      this.loading=false;
      this.toast.error("Failed to submit") 
    })
   
  }


  submitRoomPackage(){
    this.loading=true;
    let data=Object.assign(this.packageForm.value,{id:this.patient_id})
    
    this.service.postPackageMaternity(data).subscribe((res)=>{
      this.loading=false;
      this.toast.success("Submitted successfully")
          
      this.stepper.next();
      
    },(err)=>{
      this.loading=false;
      this.toast.error("Failed to submit") 
    })
  }



  addSysptom(sysptom,event){
    if(event.checked){
      this.sysptoms.push(sysptom);      
    }else{
      this.sysptoms=this.sysptoms.filter(item => item !== sysptom)
    }
  }

  otherSysptom(){
    this.other_sysptoms=true;
  }
  addChechbox(){
    console.log("clicked" && this.packageForm.get("other_sysptoms").value!='')
    if (this.other_sysptoms ){
      this.sysptoms.push(this.packageForm.get("other_sysptoms").value)
      this.checkboxs.push(this.packageForm.get("other_sysptoms").value)
      this.packageForm.get('other_sysptoms').setValue('');
    }
  }
 
  selectedSpecialist(s,event){

    console.log("special=>",s);
    if(event.checked){
      this.specialists.push(s);      
    }else{
      this.specialists=this.specialists.filter(item => item !== s)
    }
    // this.specialist_visible=false;
  }
  otherSpecialist(specialist,event){
    this.specialist_visible=true;
  }

  firstMaternity(type){
    if(type=="yes"){
      this.refferal_show=true;
      this.reffered_by=false;
      this.currect_doctor_show=false;
    }else{
      this.refferal_show=false;
      this.reffered_by=false;
      this.currect_doctor_show=true;
    }

  }
  confirm_details(){
    this.loading=true;
    this.service.confirmMaternityDetail(this.confirm_data).subscribe(
      (res)=>{
        this.loading=false;
        if(res.status){
        this.toast.success(res.message) 
        this.router.navigateByUrl("dashboard/maternity-details/"+this.confirm_data.id)  
        }else{
          this.toast.warning(res.message)  
        }
      },
      (err)=>{
        this.loading=false;
        this.toast.warning("failed")   
      }
    );
  }



  referredByClicked(by){
    if(by=='self'){
      this.reffered_by=false;
    }else{
      this.reffered_by= true;
      
      this.placeholder_reffered_by= by=='hospital' ? "Hospital name" :"Doctor name"
    }
  }



  maternityPackage(p){
    if(p=='private'){
      this.practitioner_show=true;
    }else{
      this.practitioner_show=false
    }


    if(p=='cs'){
      this.show_cs_package_detail=true;
      this.show_normal_package_detail=false;
    }
    if(p=='normal'){
      this.show_cs_package_detail=false;
      this.show_normal_package_detail=true;
    }
  }

  submitMaternityPackage(){
    this.loading=true;
    let data=Object.assign(this.maternitypackageForm.value,{id:this.patient_id})
    
    this.service.postMaternityProcedurePackage(data).subscribe((res)=>{
      this.loading=false;
      this.toast.success("Submitted successfully")
          
      this.stepper.next();
      
    },(err)=>{
      this.loading=false;
      this.toast.error("Failed to submit") 
    })
  }
}
