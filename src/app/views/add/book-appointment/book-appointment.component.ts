import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Button } from 'selenium-webdriver';
import { MatStepper } from '@angular/material/stepper';
import { Observable, of, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import {EMPLOYEE_RELATIONSHIP,COUNTRIES, CLINICS}  from '../../../utils/constants';
import { DatePipe, DOCUMENT } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { PopupOpenEventArgs, WorkHoursModel } from '@syncfusion/ej2-angular-schedule';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { extend } from '@syncfusion/ej2-base';
import { ServiceService } from '../../../service.service';
export interface PayerInterface{
  created: string,
  hospital_id: string,
  id: string
  linked: any,
  name: string,
  phone_numbers: any,
  token: string,
  type: string,
}



export interface Patient{
  phone: string,
  id: string
}

@Component({
  selector: 'app-register',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss']
})

export class BookAppointmentComponent implements OnInit {
  registerForm: FormGroup;
  todaysForm:FormGroup;
  dateTimeForm:FormGroup;
  patientMobileForm: FormGroup;
  pateintConfirmationForm:FormGroup;
  paymentForm:FormGroup;
  specialistForm: FormGroup;
  sysptomForm:FormGroup;
  maxDate=new Date();
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
  selectedDate: Date = new Date();

  email_confirmation=false;
  email_confirmation_submitted=false;
  national_id_confirmation=false;
  national_id_confirmation_submitted=false;
  dob_confirmation=false;
  dob_confirmation_submitted=false;

  insurance_company = new FormControl();
  searchPatient=new FormControl();

  options: PayerInterface[];
  schemes:any[];
  filteredOptions: Observable<any[]>;
  filteredOptions2: Observable<any[]>;
  dataSource;  
  insurance_comapny_suggestions=[]
  session_today=false;
  myAwesomeArrayOfAwesomeStuff = [{name: "Cyborg Duck", powerLevel: "Unlimited" }]

  patients: Patient[]=[];
  patientOptions:  Observable<Patient[]>; 
  insuranceOptions:  Observable<PayerInterface[]>;  
  registration_today;
  clinics=[];
  countries=COUNTRIES;
  EMPLOYEE_RELATIONSHIP=EMPLOYEE_RELATIONSHIP;
  selected_clinics=[]
  SLOTS_DATA=[{time:"08:00",span:"08:00-09:00"},
  {time:"09:00",span:"09:00-10:00"},
  {time:"10:00",span:"10:00-11:00"},
  {time:"11:00",span:"11:00-12:00"},
  {time:"12:00",span:"12:00-13:00"},
  {time:"12:00",span:"13:00-14:00"},
  {time:"13:00",span:"14:00-15:00"},
  {time:"15:00",span:"15:00-16:00"},
  {time:"16:00",span:"16:00-17:00"}

]


  @ViewChild('register',{static:true}) registerFormElement:NgForm;
  @ViewChild('guadian',{static:true}) nextOfKinFormElement:NgForm;
  @ViewChild('stepper',{static:true})  stepper: MatStepper;
  email_confirmation_txt: any;
  patient_id: any;
  patient_show_email: boolean;
  patient_show_id: boolean;
  patient_show_phone: boolean;
  outfilled=false;
  next_of_kin_has_data=true;
  specialists =[];
  session_now: boolean;
  clinics_type: any;
  offdays=[];
  weekdays=[];
  workdays=[];
  selected_clinic_id: any;
  selected_appointment_date;
  currentView="Month"
  currentWorkweek="WorkWeek"
  workdate=[]
  workHours = { start: '08:00', end: '17:00' };

  @ViewChild('calendarModal', { static: false }) calendarModal: ModalDirective;
  show_calendar: boolean;
  eventSettings: { dataSource: Record<string, any>[]; };


  one_show=true;
  second_show=true;
  constructor(private datePipe:DatePipe, private route: ActivatedRoute,private formBuilder: FormBuilder,public service: ServiceService,public router: Router,public toast:ToastrService,@Inject(DOCUMENT) private document: Document,
  private modalService: NgbModal,
  
  ) { 

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
      email: ['',[Validators.required,Validators.email]],
      phone: ['',[Validators.required,Validators.minLength(9)]],
      last_name: ['',Validators.required],
      first_name: ['',Validators.required],
      other_names:['', Validators.required],
      residence: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      religion: [''],
      marital_status:[''],
      occupation:[''],
      nationality:[''],
      national_id: [''],
      brought_in_by: [''],
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
  this.sysptomForm=this.formBuilder.group({
    other_sysptoms:[''],
  });

  this.nextOfKinForm = this.formBuilder.group({
    // email: ['', [Validators.email]],
    phone: ['', [Validators.minLength(9),Validators.required]],
    // last_name: ['', Validators.required],
    first_name: ['', Validators.required],
    // gender: ['', Validators.required],
    residence: ['', Validators.required],
    relationship: ['', Validators.required],
    // national_id: [''],
});
this.specialistForm =this.formBuilder.group({
  clinic_type:[''],
  clinic:[''],
  other_specialist:['']
}) 

// this.patientOptions = this.searchPatient.valueChanges.pipe(
//   startWith(''),
//   map(value => (typeof value === 'string' ? value : value.phone)),
//   map(phone => (phone ? this._filterPateint(phone) : this.patients.slice())),
// );

  this.getClinics()

    this.getSchemesandPayer();

    if(this.route.snapshot.params.token){
      this.session_today=true;
    }

 }
 ngAfterViewInit(){
  if(this.route.snapshot.params.token){
  
    this.registration_today=true;
    localStorage.setItem("registration_today","true");
    this.session_today=true;
    this.todaysForm.patchValue({is_today:"yes"})
    this.load_patient_data();
  }else{
    this.todaysForm.patchValue({is_today:"no"})
    localStorage.setItem("registration_today","false");
  }
  
  
  this.specialistForm.patchValue({clinic:CLINICS[0]});
  this.selectedClinics(CLINICS[0]);
 }


 load_patient_data(){

if(this.route.snapshot.params.token){
  this.service.getRegistrationLink(this.route.snapshot.params.token).subscribe((res)=>{
    this.session_now=true;
    if (res.exists){
      console.log(">>",res);
      // this.toast.success("Patient Found");
      this.confirm_patient=true;
      this.patient_id=res.id;
      this.email_confirmation=res.email_confirmation;
      this.email_confirmation_txt=res.email_confirmation_txt;
      this.national_id_confirmation=res.national_id_confirmation;
      this.dob_confirmation=res.dob_confirmation;
      this.searchPatient.setValue(res.phone);        
      this.stepper.next();
    }else{
      this.confirm_patient=false;
      this.searchPatient.setValue(res.phone);
      this.registerForm.patchValue({phone:res.phone});
      this.outfilled=true;
      this.stepper.next();
  
      // this.toast.warning("Patient Does Not Exist")
    }
  })
  }
 }

 insuranceChanged(){
  console.log(">>>>>>")
   var s=this.paymentForm.get("insurance_company").value
  //  console.log(s)
  this.insurance_comapny_suggestions = this._filter(s)
 }
//  searchPatientChanged(){
//    if(this.searchPatient.value.length==3)
//    this.service.searchPatient(this.searchPatient.value).subscribe(
//      (res)=>{
//       this.patients=res;

//      },
//      (err)=>{}
//    )
//  }
 selectedClinics(v){
   console.log(v)
   this.selected_clinics=v.departments;
 }
 displayPatientFn(patient: Patient): string {
  return patient && patient.phone ? patient.phone : '';
}

private _filterPateint(phone: string): Patient[] {
  const filterValue = phone.toLowerCase();
  return this.patients.filter(option => option.phone.toLowerCase().includes(filterValue));
}

  displayFn(PayerInterface: PayerInterface): string {
    return PayerInterface && PayerInterface.name ? PayerInterface.name : '';
  }

  private _filter(name: string): PayerInterface[] {
    const filterValue = name.toLowerCase();
    console.log(filterValue)
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }




  get f() { return this.registerForm.controls; }
  get g() { return this.nextOfKinForm.controls; }
  get s() { return this.specialistForm.controls; }
  get p() { return this.paymentForm.controls; }
  get fs() { return this.todaysForm.controls; }
  get pc() { return this.pateintConfirmationForm.controls; }


  addpatientdata(){
    // "patient":patient,
    // let clinic_data={
    //   clinic:this.specialistForm.get("clinic").value["name"],
    //   other_specialist:this.specialistForm.get("other_specialist").value
    // }
  let clinic_data=this.specialistForm.value;
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

    post_data=Object.assign(post_data,{"todays":{is_today:"yes",session_now:this.session_now}})
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
  getClinics(){
    this.service.getAllClinics().subscribe((res)=>{
       this.clinics=res;
   
    },(err)=>{

    })
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
    // this.service.getSchemes().subscribe((res)=>{
    //   console.log("schem", res);
    //   this.schemes=res.results;
    // },(err)=>{

    // })
  }
  provideGuardianInfo(){
    this.guardian=true;
  }
  patientDobChange(){
   
    
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
    this.dateTimeForm.patchValue({time:time})  
  }

  submitPatientInfo(){
   
    this.stepper.next();
  }
  insuranceClicked(){
    this.insurance=true;
    console.log(this.registerForm.get('national_id').value)
    this.paymentForm.patchValue({

      id_number:this.registerForm.get('national_id').value,
      member_name:this.registerForm.get('first_name').value +" "+this.registerForm.get('last_name').value+ " " +this.registerForm.get('other_names').value 
    });
    this.paymentForm=this.formBuilder.group({
      payment:['',[Validators.required]],
      insurance_company:['',[Validators.required]],
      scheme_name:['',[Validators.required]],
      scheme_number:[''],
      employee:['',[Validators.required]],
      employee_number:['',[Validators.required]],
      department:[''],
      member_number:['',[Validators.required]],
      member_name:['',[Validators.required]],
      relation:['',[Validators.required]],
      card_number:['',[Validators.required]],
      id_number:['',[Validators.required]],
      nhif_number:['']
  
    });
  }
  insuranceUnClicked(){
  this.insurance=false;
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
  }
  submitpayment(){  
    if (this.paymentForm.get('payment').value!='Credit Card' &&
    this.paymentForm.get('payment').value!='Mpesa' &&
    this.paymentForm.get('payment').value!='Cash' &&
    this.paymentForm.get('payment').value!='Insurance'
    ){
      this.toast.warning("Select payment mode");
      return;
    }

   
    
    this.stepper.next();
  }
  submitGuardianInfo(){
    this.stepper.next();

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
    console.log("clicked" && this.sysptomForm.get("other_sysptoms").value!='')
    if (this.other_sysptoms ){
      this.sysptoms.push(this.sysptomForm.get("other_sysptoms").value)
      this.checkboxs.push(this.sysptomForm.get("other_sysptoms").value)
      this.sysptomForm.get('other_sysptoms').setValue('');
    }
  }
  submitSysptom(){
  
    this.stepper.next();
  }
  finish(){
    this.addpatientdata()
  }

  otherSpecialist(specialist,event){
    this.specialist_visible=true;
  }





selectedSpecialist(id){

    this.show_calendar=true;
    this.getWorkdays(id);
    this.selected_clinic_id=id;
  }
  onPopupOpen(args: PopupOpenEventArgs){
    args.cancel = true; 
  }

getWorkdays(id){
        this.loading=true;
        this.service.getClinicWorkDay(id).subscribe(res=>{
          this.loading=false;
          this.offdays=res.offdays;
          this.workdays=res.workdays;
          this.weekdays=res.weekdays;
    
        },err=>{
          this.loading=false;
          this.toast.warning("Failed");
        });
}
isWorkDay(date: Date){
  if (this.checkOffdays(date)){
    return false;
  }else if(!this.checkWeekdaysInList(date.getDay()) && this.checkWorkdays(date)){
    return true;
  }else if(!this.checkWeekdaysInList(date.getDay())){
    return false;
}else{
    return true;
  }
}
checkOffdays(date){
    var t=(date.getMonth()+1).toString()+"/"+date.getDate().toString()+"/"+date.getFullYear().toString()
    if(this.offdays.indexOf(t)>-1){
      return true;
    }else{
      return false;
    } 
}
checkWorkdays(date){
  var t=(date.getMonth()+1).toString()+"/"+date.getDate().toString()+"/"+date.getFullYear().toString()
  if(this.workdays.indexOf(t)>-1){
    return true;
  }else{
    return false;
  } 
}
checkWeekdaysInList(item){
        
  if(this.weekdays.indexOf(item)>-1){
  
    return true;
  }else{
    return false;
  }    
}


submitCalendar(){

}
submitClinic(){
  this.stepper.next();
  // this.second_show=false;
}


nextSelectClinics(){
  this.stepper.next();
  // this.one_show=false;
}
 
  onCellClick(event) {
    var date = new Date(event.startTime);
   
    this.selected_appointment_date=date;
    this.workdate=[date.getDay()]
    if(this.isWorkDay(date)){

      var string_date=this.selected_appointment_date.getDate().toString()+'-'+(this.selected_appointment_date.getMonth()+1).toString()+'-'+this.selected_appointment_date.getFullYear().toString()
      this.service.getClinicWorkDate(this.selected_clinic_id,string_date).subscribe(res=>{
        this.eventSettings = { dataSource: extend([], res, null, true) as Record<string, any>[] }
        this.calendarModal.show()
      },err=>{})
    
      // var t=(date.getMonth()+1).toString()+"/"+date.getDate().toString()+"/"+date.getFullYear().toString()
      // const modalRef =this.modalService.open(WorkDateModal, {size: 'lg'});
      // modalRef.componentInstance.id = this.selected_clinic_id;
      // modalRef.componentInstance.date = t;
      // modalRef.componentInstance.timeSelectedEmitter.subscribe((resp) => {
      //   console.log(resp);
      //   })
    }else{
      
    }
  }


  onCellClickTime(event) {
 
    var today=new Date()
    
    var date = new Date(event.startTime);
    if (date<today){
      this.toast.warning("Sorry you cannot select past time");
      return;
    }
    this.calendarModal.hide();
    var d=(date.getMonth()+1).toString()+"/"+date.getDate().toString()+"/"+date.getFullYear().toString()
    var mins=date.getMinutes().toString().length==1 ? "0"+date.getMinutes().toString() : date.getMinutes().toString()
    var t=date.getHours().toString()+":"+mins
    console.log(d,t)
    this.show_calendar=false;
    this.dateTimeForm.patchValue({date:date,time:t})

  }
}