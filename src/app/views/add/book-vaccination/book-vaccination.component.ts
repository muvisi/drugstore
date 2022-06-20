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
  selector: 'app-book-vaccination',
  templateUrl: './book-vaccination.component.html',
  styleUrls: ['./book-vaccination.component.scss'],
  providers:[DatePipe]
})
export class BookVaccinationComponent implements OnInit {
  paymentForm:FormGroup;
  registerForm: FormGroup;
  appointmentForm: FormGroup;
  confirmForm: FormGroup;
  // editAppointmentForm: FormGroup;
  submitted=true;
  status=false;
  vaccines =[];
  maxDate= new Date();
  // moment().subtract(18, 'years').format('YYYY-MM-DD')
  minDate = new Date();
  loading =false;
  available_time_slots;
  types =['First Dose','Second Dose','Booster Dose']
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
  {time:"13:00",span:"13:00-14:00"},
  {time:"14:00",span:"14:00-15:00"},
  {time:"15:00",span:"15:00-16:00"},
  {time:"16:00",span:"16:00-17:00"}

]
  APPOINTMENT_CHANGE: boolean;
  APPOINTMENT_BOOKING: boolean;
  booking_button_txt: string;
  isbooked: boolean;
  isbooked_dose: any;
  constructor(private formBuilder: FormBuilder,public navCtrl: NgxNavigationWithDataComponent,public service:ServiceService,private toastr: ToastrService,public router:Router,public datePipe:DatePipe,public dialog: MatDialog) {}
  ngOnInit() {
    this.booking_button_txt="Book Appointment";
    this.APPOINTMENT_BOOKING=false;
    this.registerForm = this.formBuilder.group({
      email: [''],
      phone: [''],
      last_name: ['', Validators.required],
      first_name: ['', Validators.required],
      residence: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      national_id: [''],
  });
  if(this.navCtrl.get('data') !=undefined){
    // this.registerForm.patchValue({phone:this.navCtrl.get('data').phone,email:this.navCtrl.get('data').email})
    this.registerForm.patchValue(this.navCtrl.get('data'));
  }
  this.appointmentForm = this.formBuilder.group({
    time: ['', Validators.required],
    date: ['', Validators.required],
    dose: ['', Validators.required],
    vaccine: ['', Validators.required],
    reason: ['Covid 19 Vaccination', Validators.required]
});
// this.editAppointmentForm= this.formBuilder.group({
//   time: ['', Validators.required],
//   date: ['', Validators.required]
// });
this.paymentForm = this.formBuilder.group({
  transaction: ['',[Validators.required, Validators.minLength(5)]]
});
this.confirmForm = this.formBuilder.group({
  phone: ['',[Validators.required, Validators.minLength(9)]]
});
  }
  get f() { return this.registerForm.controls; }
  get g() { return this.appointmentForm.controls; }
  get h() { return this.paymentForm.controls; }
  get j() { return this.confirmForm.controls; }

  // onTime(){
  //   if(moment(this.appointmentForm.get('time').value,'HH:mm').format('HH:mm') >=moment('17:00','HH:mm').format('HH:mm') || moment(this.appointmentForm.get('time').value,'HH:mm').format('HH:mm') < moment('08:00','HH:mm').format('HH:mm') ){
  //     this.toastr.info("please select time between 8am - 5pm");
  //   }
    
  // }
  getTimeSlotsAvailable(){
    this.service.getAvailableTimeSlot(this.datePipe.transform(this.appointmentForm.get('date').value,'y-M-d')).subscribe((res)=>{
     this.SLOTS_DATA=res;
    },(err)=>{

    });
  }
  // getTimeSlotsAvailable2(){
  //   this.activateChangeButton();
  //   this.service.getAvailableTimeSlot(this.datePipe.transform(this.editAppointmentForm.get('date').value,'y-M-d')).subscribe((res)=>{
  //    this.SLOTS_DATA=res;
  //   },(err)=>{

  //   });
  // }
  dialogSelectAvailableSlots(){

  }
  getVaccines(){
    this.getTimeSlotsAvailable()
    let date = this.appointmentForm.get('date').value
    let dose = this.appointmentForm.get('dose').value
    if(this.appointmentForm.get('dose').value=='First Dose' || this.appointmentForm.get('dose').value=='Second Dose' || this.appointmentForm.get('dose').value=='Booster Dose'){}else{return}
    this.appointmentForm.patchValue({vaccine:''})
    this.service.getVaccines({date:this.datePipe.transform(date,'y-M-d'),dose:dose}).subscribe((res)=>{
      console.log()
      this.vaccines = res[0].names

    })
  }
  vaccineClicked(){
    if(this.appointmentForm.get('dose').value=='First Dose' || this.appointmentForm.get('dose').value=='Second Dose'){

    }else{
      this.toastr.warning("Select type of dose(first or second)");
    }
  }
  onSubmit() {
   
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
    let data = {...obj1,...obj2}
    console.log(data);
    this.APPOINTMENT_BOOKING=true;
    this.stepper.next();
    this.service.createAppointment(data).subscribe((res)=>{
      this.loading = false;
      this.APPOINTMENT_DATA=res;
     
      // this.editAppointmentForm.get("date").patchValue(res.data.date);
      // this.editAppointmentForm.get("time").patchValue(res.data.time);
      this.booking_button_txt="show booking"
      if (res.isbooked){      
        this.isbooked=true;
        this.isbooked_dose=this.appointmentForm.get("dose").value     
      this.toastr.warning(res.message, 'Success');
      }else{
        this.toastr.success(res.message, 'Success');
      }      
     
      
    },(err)=>{
      this.loading=false;
      this.toastr.error(err.error.message, 'Failed');
    })
  }
  editAPPointment(){

  }
  finish(){
    this.router.navigateByUrl("/")
  }
  cancelAppointment(){
      this.loading=true;
      this.service.cancelAppointment({id:this.APPOINTMENT_DATA.data.id}).subscribe((res)=>{
        this.loading=false;
        this.toastr.success("Appointment was cancelled");
this.router.navigateByUrl('/')
      },(err)=>{
        this.loading=false;
        this.toastr.success("Failed");
      });
    }

  activateChangeButton(){
      this.APPOINTMENT_CHANGE=true; 
    }
  // changeAppointment(){
  //     this.loading=true;
  //     this.service.changeAppointment(Object.assign(this.editAppointmentForm.value,{id:this.APPOINTMENT_DATA.data.id})).subscribe((res)=>{
  //       this.loading=false;
        
  //       if(res.status){
  //         this.toastr.success("Appointment was updated");
  //         this.router.navigateByUrl('/')
  //     }else{
  //       this.toastr.success(res.message); 
  //     }
  //     },(err)=>{
  //       this.loading=false;
  //       this.toastr.success("Failed");
  //     });
  //   }



  // createAppointment(){
  // let obj1 = this.registerForm.value
  // let obj2 = this.appointmentForm.value
  // let data = {...obj1,...obj2}
  // this.service.createAppointment(data).subscribe((res)=>{
  //   this.toastr.success('Successfully created  appointment', 'Success');
  // },(err)=>{
  //   // this.toastr.error('Successfully created  appointment', '');
  // })
  // }
  weekendsDatesFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0 && day !== 1 && day !==2 && day !== 4 && day !== 5;
  }










}
function DialogOverviewExampleDialog(DialogOverviewExampleDialog: any, arg1: { width: string; data: { name: any; animal: any; }; }) {
  throw new Error('Function not implemented.');
}

