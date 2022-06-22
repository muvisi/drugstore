import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../../service.service';
import { FormBuilder, FormGroup, Validators, FormControl,FormArray} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { extend } from '@syncfusion/ej2-base';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap';
import { PopupOpenEventArgs } from '@syncfusion/ej2-schedule';
@Component({
  selector: 'app-reappointment',
  templateUrl: './reappointment.component.html',
  styleUrls: ['./reappointment.component.scss']
})
export class ReappointmentComponent implements OnInit {
  patient:any={};
  customer:any={}
  maxDate = new Date();
  loading = false;
  dateTimeForm: FormGroup;
  submitted: boolean;
  student=false;
  time =['8:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00'];
  transactions=[];
  counsellling_type=[
    {
      type:"Couples",
      code:201,
      value:"couple"

    },
    {
      type:"Family",
      code:202,
      value:"family"

    },  
    {
      type:"Children",
      code:203,
      value:"children"

    },  {
      type:"Groups",
      code:204,
      value:"group"

    },
    {
      type:"Webinars",
      code:205,
      value:"webinar"

    },
    {
      type:"Individual",
      code:206,
      value:"individual"

    },  {
      type:"Students",
      code:207,
      value:"student"

    }

  ]

 
  eventSettings;
  offdays=[];
  weekdays=[];
  workdays=[];
  selected_clinic_id: any;
  selected_appointment_date;
  selectedDate=new Date();
  currentView="Month"
  currentWorkweek="WorkWeek"
  workdate=[]
  workHours = { start: '08:00', end: '17:00' };
  clinics=[];
  selected_clinic: any;

  @ViewChild('calendarModal', { static: false }) calendarModal: ModalDirective;
  @ViewChild('calendarModalTime', { static: false }) calendarModalTime: ModalDirective;
  constructor(private route: ActivatedRoute,public router:Router,public service:ServiceService,private formBuilder: FormBuilder,public toastr:ToastrService) { }
  ngOnInit() {
    this.getPatient(this.route.snapshot.params.id);
    this.dateTimeForm = this.formBuilder.group({
      time: ['', Validators.required],
      date:['',Validators.required],
        clinic:['',Validators.required],
        clinic_name:['',Validators.required],
        id:['']
    });

    this.getClinics();
  }
  get f() { return this.dateTimeForm.controls; }

  getPatient(id){
    this.service.getPatient(id).subscribe((res)=>{
      this.customer = res;
      })
  }

 getClinics(){
  this.service.getAllClinics().subscribe((res)=>{
     this.clinics=res;
 
  },(err)=>{

  })
}
onPopupOpen(args: PopupOpenEventArgs){
  args.cancel = true; 
}


 
selectedClinic(item){
  this.selected_clinic_id=item.id
  this.selected_clinic=item;

  this.dateTimeForm.patchValue({clinic_name:item.name,clinic:item.id,id:this.route.snapshot.params.id})
  this.getWorkdays(item.id);
  this.calendarModal.show()
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
    this.toastr.warning("Failed");
  });
}
isWorkDay(date: Date){

  var today= new Date()
  if(new Date(date.getFullYear().toString()+"-"+(date.getMonth()+1).toString()+"-"+date.getDate().toString())<new Date(today.getFullYear().toString()+"-"+(today.getMonth()+1).toString()+"-"+today.getDate().toString())){
    return false;
  }
  

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

onCellClick(event) {
var date = new Date(event.startTime);

this.selected_appointment_date=date;
this.workdate=[date.getDay()]
if(this.isWorkDay(date)){

var string_date=this.selected_appointment_date.getDate().toString()+'-'+(this.selected_appointment_date.getMonth()+1).toString()+'-'+this.selected_appointment_date.getFullYear().toString()
this.service.getClinicWorkDate(this.selected_clinic_id,string_date).subscribe(res=>{
  this.eventSettings = { dataSource: extend([], res, null, true) as Record<string, any>[] }
  this.calendarModalTime.show()
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
rowSelectedBookingView(element){
this.router.navigateByUrl("dashboard/booking-details/"+element.id)
}

onCellClickTime(event) {

var today=new Date()

var date = new Date(event.startTime);
if (date<today){
this.toastr.warning("Sorry you cannot select past time");
return;
}
this.calendarModalTime.hide();
this.calendarModal.hide();

var d=(date.getMonth()+1).toString()+"/"+date.getDate().toString()+"/"+date.getFullYear().toString()
var mins=date.getMinutes().toString().length==1 ? "0"+date.getMinutes().toString() : date.getMinutes().toString()
var t=date.getHours().toString()+":"+mins
console.log(d,t)
this.dateTimeForm.patchValue({date:date,time:t})



}
submitAppointment(){
  

  if(this.dateTimeForm.invalid){
    this.toastr.warning("Invalid form")
    return;
  }
  this.loading=true;
  this.service.add_client_appointment(this.dateTimeForm.value).subscribe(res=>{
    this.loading=false;
    if(res.status){
    this.toastr.success(res.message)

    }else{
      this.toastr.warning(res.message)
    }
  },err=>{
    this.loading=false;
    this.toastr.error(
      "Failed"
    )
  })
}

}
