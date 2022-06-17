import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../../service.service';
import dateFormat, { masks } from "dateformat";
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ModalDirective } from 'ngx-bootstrap';
import { extend } from '@syncfusion/ej2-base';
import { PopupOpenEventArgs } from '@syncfusion/ej2-schedule';
// import { ServiceService } from '../../../service.service';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent implements OnInit {
  clientForm: FormGroup;
  paymentForm: FormGroup;
  dateTimeForm: FormGroup;
  patient_info;
  payment_type;
  payment_info;
 
  // minDate;
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
    other_names:''

  };
  insurance_company_suggestions=[];
  show_insurance;
  loading: boolean;
  @ViewChild('calendarModal', { static: false }) calendarModal: ModalDirective;
  @ViewChild('calendarModalTime', { static: false }) calendarModalTime: ModalDirective;
  @ViewChild('ConfirmAppointment', { static: false }) confirmAppointmentModal: ModalDirective;
  
  minDate=new Date();
  formatter = (result: string) => result.toUpperCase();

search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term === '' ? []
      : this.insurance_company_suggestions.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )


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
  clinics: any;
  selected_clinic: any;
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


    this.dateTimeForm=this.formBuilder.group({
      date:[''],
      time:[''],
      clinic:[''],
      clinic_name:[''],
      id:['']
    });
    this.service.getbookingDetails(this.route.snapshot.params.id).subscribe((res)=>{
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
      this.nextofKin=res.nextofKin !=null ? res.nextofKin :{ name :'',relationship:'', phone:'',residence:''}
      this.speciality=res.specialist!= null ? res.specialist.split(",") : [];
      this.symptoms=res.symptoms !=null ? res.symptoms.split(",") : [];
      this.department=res.department;
      this.payment_type={'payment':res.payment !=null ? res.payment : ''}
      this.payment_mode=res.payment;
      this.dateTimeForm.patchValue({date:res.date,time:res.time});
      

      console.log("pateint",this.patient_info);
      
     

      // console.log("DOB",this.date)
      if(res.payment=="Insurance"){
        this.show_insurance=true;
        this.service.getBookingInsuranceDetails(res.id).subscribe((res2)=>{
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
   

    this.service.getInsuranceCompany().subscribe((res)=>{
      console.log("company", res.results[0]);
      for(var i=0;i < res.results.length;i++){
        if (res.results[i].type=="Insurance"){
         this.insurance_company_suggestions.push(res.results[i].name);
        }   
    
    }});

    this.getClinics();
  }
  createAppointment(){
    this.calendarModal.show()
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
      
      this.paymentForm.patchValue(this.payment_type);
    }
  }
  get c() { return this.clientForm.controls; }
  get p() { return this.paymentForm.controls; }


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

  onPopupOpen(args: PopupOpenEventArgs){
    args.cancel = true; 
  }
  
  onClinicSelected(item){
    this.selected_clinic_id=item.id
    this.selected_clinic=item;
    this.dateTimeForm.patchValue({clinic_name:item.name,clinic:item.id,id:this.route.snapshot.params.id})
    this.getWorkdays(item.id);
  }
  getClinics(){
    this.service.getAllClinics().subscribe((res)=>{
       this.clinics=res;
   
    },(err)=>{

    })
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


  onCellClickTime(event) {
 
    var today=new Date()
    
    var date = new Date(event.startTime);
    if (date<today){
      this.toast.warning("Sorry you cannot select past time");
      return;
    }
    this.calendarModalTime.hide();
    this.calendarModal.hide();
    
    var d=(date.getMonth()+1).toString()+"/"+date.getDate().toString()+"/"+date.getFullYear().toString()
    var mins=date.getMinutes().toString().length==1 ? "0"+date.getMinutes().toString() : date.getMinutes().toString()
    var t=date.getHours().toString()+":"+mins
    console.log(d,t)
    this.dateTimeForm.patchValue({date:date,time:t})
    this.confirmAppointmentModal.show()


  }


  confirmAppointment(){
    this.service.rebook(this.dateTimeForm.value).subscribe(res=>{
      if(res.status){
      this.toast.success(res.message)
      this.confirmAppointmentModal.hide();

      }else{
        this.toast.warning(res.message)
      }
    },err=>{
      this.toast.error(
        "Failed"
      )
    })
  }
}