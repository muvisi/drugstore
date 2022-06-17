import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatStepper } from '@angular/material/stepper';
import { ServiceService } from '../../../service.service';
@Component({
  selector: 'app-book-covidtesting',
  templateUrl: './book-covidtesting.component.html',
  styleUrls: ['./book-covidtesting.component.scss'],
  providers:[DatePipe]
})
export class BookCovidtestingComponent implements OnInit {
  paymentForm:FormGroup;
  registerForm: FormGroup;
  appointmentForm: FormGroup;
  confirmForm: FormGroup;
  editAppointmentForm: FormGroup;
  placesandForm: FormGroup;
  sysptomForm:FormGroup;
  vaccinatedForm:FormGroup;
  submitted=true;
  sysptoms=[];

  other_sysptoms=false;
  other_sysptoms_value;
  checkboxs=[];
  status=false;
  vaccines =[];
  maxDate= new Date();
  minDate = new Date(moment().subtract(18, 'years').format('YYYY-MM-DD'));
  loading =false;
  available_time_slots;
  types =['First Dose','Second Dose']
  @ViewChild('staticModal', { static: false }) staticModal: ModalDirective;
  @ViewChild('stepper',{static:false}) private stepper: MatStepper;
  date_selected: boolean;
  query_slots: boolean;
  APPOINTMENT_DATA={
    "message":"",
    "txt":"",
    "text":"",
    "data":{id:'',dose:''},
    "status":false
  };
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
  APPOINTMENT_CHANGE: boolean;
  APPOINTMENT_BOOKING: boolean;
  booking_button_txt: string;

show_travel=false;
show_contact=false;
  terms_conditions: any;
  home_office: boolean;
  isbooked: boolean;


  constructor(private formBuilder: FormBuilder,public navCtrl: NgxNavigationWithDataComponent,public service:ServiceService,private toastr: ToastrService,public router:Router,public datePipe:DatePipe,public dialog: MatDialog) {}
  
  
  
  ngOnInit() {
    this.booking_button_txt="Book Appointment";
    this.APPOINTMENT_BOOKING=false;
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(9)]],
      last_name: ['', Validators.required],
      first_name: ['', Validators.required],
      residence: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      national_id: ['', Validators.required],
  });
  this.placesandForm=this.formBuilder.group({
    is_travel:['',[Validators.required]],
    travel_places: [''],
    is_contact:['',[Validators.required]],
    contact_case_name: ['']
  });
  this.vaccinatedForm=this.formBuilder.group({
    vaccinated: ['']
  });
  if(this.navCtrl.get('data') !=undefined){
    // this.registerForm.patchValue({phone:this.navCtrl.get('data').phone,email:this.navCtrl.get('data').email})
    this.registerForm.patchValue(this.navCtrl.get('data'));
  }
  this.appointmentForm = this.formBuilder.group({
    time: ['', Validators.required],
    date: ['', Validators.required],
    transaction_code:['',Validators.required],
    location_type: ['',Validators.required],
    location: [''],
    reason: ['Covid 19 Testing', Validators.required]
});
this.editAppointmentForm= this.formBuilder.group({
  time: ['', Validators.required],
  date: ['', Validators.required]
});
this.paymentForm = this.formBuilder.group({
  transaction: ['',[Validators.required, Validators.minLength(5)]]
});
this.confirmForm = this.formBuilder.group({
  phone: ['',[Validators.required, Validators.minLength(9)]]
});
this.sysptomForm=this.formBuilder.group({
  other_sysptoms:[''],
  symptoms_date:  ['']
});
  }
  
  get f() { return this.registerForm.controls; }
  get g() { return this.appointmentForm.controls; }
  get h() { return this.paymentForm.controls; }
  get j() { return this.confirmForm.controls; }


  getTimeSlotsAvailable(){
    this.service.getAvailableTimeSlot(this.datePipe.transform(this.appointmentForm.get('date').value,'y-M-d')).subscribe((res)=>{
     this.SLOTS_DATA=res;
    },(err)=>{

    });
  }
  getTimeSlotsAvailable2(){
    this.activateChangeButton();
    this.service.getAvailableTimeSlot(this.datePipe.transform(this.editAppointmentForm.get('date').value,'y-M-d')).subscribe((res)=>{
     this.SLOTS_DATA=res;
    },(err)=>{

    });
  }

  istravelled(v){
    if(v=="yes"){
      this.show_travel=true;
    }else{
      this.show_travel=false;
      this.placesandForm.get("travel_places").setValue("");
    }

  }
  isContacted(v){
    if(v=="yes"){
      this.show_contact=true;
    }else{
      this.show_contact=false;
      this.placesandForm.get("contact_case_name").setValue("");
    }

  }
  locationClicked(v){
    if(v=='Home/Office'){
        this.home_office=true;
    }else{
      this.home_office=false;
    }
 
  }
  termsClicked(t){
    console.log(t);
    this.terms_conditions=t;

  }
  
  dialogSelectAvailableSlots(){


  }
  onSubmit() {

    if(!this.terms_conditions){
      this.toastr.warning("Please accept terms and  conditions");
      return;
    }
   
    this.submitted = true;

    this.loading=true;
    if(moment(this.appointmentForm.get('time').value,'HH:mm').format('HH:mm') >=moment('17:00','HH:mm').format('HH:mm') || moment(this.appointmentForm.get('time').value,'HH:mm').format('HH:mm') < moment('08:00','HH:mm').format('HH:mm') ){
      this.toastr.info("please select time between 8am - 5pm");
      this.loading = false; 
      this.submitted = false;
      return
    }
    let obj1 = this.registerForm.value
    let obj2 = this.appointmentForm.value
    
    let obj3 = {

      "symptoms":this.sysptoms,
      
    }
    let obj4 = this.sysptomForm.value
    let obj5 = this.vaccinatedForm.value
    let obj6 = this.placesandForm.value
    let data = {...obj1,...obj2,...obj3,...obj4,...obj5,...obj6}
    console.log(data);
    this.APPOINTMENT_BOOKING=true;
    this.stepper.next();
    this.service.createCovidTesting(data).subscribe((res)=>{
      this.loading = false;
      this.APPOINTMENT_DATA=res;
     
      this.editAppointmentForm.get("date").patchValue(res.data.date);
      this.editAppointmentForm.get("time").patchValue(res.data.time);
      this.booking_button_txt="show booking" 
      if(res.isbooked){    
        this.isbooked=true;      
      this.toastr.warning(res.message, 'Warning');    
    }else{
      this.isbooked=false;  
      this.toastr.success(res.message, 'Success');  
    }
      
    },(err)=>{
      this.loading=false;
      this.toastr.error(err.error.message, 'Failed');
    })
  }
  editAPPointment(){

  }
  submitVaccination(){
    // this.stepper.next();
  
  }
  finish(){
    this.router.navigateByUrl("/")
  }

  proceedPayment(){
    this.stepper.next();
    
    

  }
  cancelAppointment(){
    
      this.loading=true;
      this.service.cancelCovidTesting({id:this.APPOINTMENT_DATA.data.id}).subscribe((res)=>{
        this.loading=false;
        this.toastr.success("Appointment was cancelled");
      this.router.navigateByUrl('/')
      },(err)=>{
        this.loading=false;
        this.toastr.success("Failed");
      });
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
    submitPlace(){
      this.stepper.next();
    }
  activateChangeButton(){
      this.APPOINTMENT_CHANGE=true; 
    }
  changeAppointment(){
      this.loading=true;
      this.service.changeCovidTesting(Object.assign(this.editAppointmentForm.value,{id:this.APPOINTMENT_DATA.data.id})).subscribe((res)=>{
        this.loading=false;
        
        if(res.status){
          this.toastr.success("Appointment was updated");
          this.router.navigateByUrl('/')
      }else{
        this.toastr.success(res.message); 
      }
      },(err)=>{
        this.loading=false;
        this.toastr.success("Failed");
      });
    }



  Finish(){
    this.toastr.success("Thank you! Successfully Booked Appointment with AAR Hospital");
    
      this.router.navigateByUrl('/covid');
};
  







}
function DialogOverviewExampleDialog(DialogOverviewExampleDialog: any, arg1: { width: string; data: { name: any; animal: any; }; }) {
  throw new Error('Function not implemented.');
}
