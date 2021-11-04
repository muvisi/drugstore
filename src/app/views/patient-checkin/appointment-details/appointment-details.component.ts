import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../../service.service';
import { FormBuilder, FormGroup, Validators, FormControl,FormArray} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDirective } from 'ngx-bootstrap/modal';
import * as moment from 'moment';
import { element } from 'protractor';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss']
})
export class AppointmentDetailsComponent implements OnInit {
  maxDate = new Date();
  customer:any={};
  data:any={};
  icd =[];
  appointmentForm: FormGroup;
  counselorForm: FormGroup;
  spouseForm:FormGroup;
  counsolers: any=[];
  rooms: any=[];
  claim:any={};
  feesSource;
  dataSource;
  mpesaSource;
  serviceSource;
  submitted=false;
  start_session_enabled=false;
  minDate=new Date();
  diagnosis:any ={};
  diagnosisSource;
  @ViewChild('staticModal', { static: false }) staticModal: ModalDirective;
  @ViewChild('paginator', { static: true}) paginator: MatPaginator;
  Columns: string[] = ['sn','date','trans_id','name','msisdn','trans_type','amount','status','use']
  cashColumns: string[] = ['sn','date','name','amount','trx'];
  diaColumns: string[] = ['sn','date','name','code'];
  feesColumns: string[] = ['sn','date','type','amount','transaction','refund'];
  serviceColumns: string[] = ['sn','name','code','amount','delete'];
  billsColumns: string[] = ['sn','name','code','amount','delete'];
  allColumns: string[] = ['sn','created','mode','amount','delete'];
  cashForm: FormGroup;
  noteForm: FormGroup;
  services: any=[];
  seleted:any={};
  member:any={};
  member_data:any={}
  serviceForm: FormGroup;
  text: string;
  supervisionForm: FormGroup;
  insurances =[];
  addspouse=false;
  spouse=false;
  spouse_submiited=false;
  session_platform;
  loading=false;
  loading_count=0;
  triageForm: FormGroup;
  counsellling_type=[
    {type:"First Dose"},
    {type:"Second Dose"}
  ]
  constructor(private route: ActivatedRoute,public service:ServiceService,private formBuilder: FormBuilder,public toastr:ToastrService,public router:Router) { }
  ngOnInit() {
    this.appointmentForm = this.formBuilder.group({
      time: ['', Validators.required],
      reason: ['', Validators.required],
      type: ['', Validators.required],
      date:['',Validators.required]
    });

    this.triageForm = this.formBuilder.group({
      temperature: ['', [Validators.required,Validators.min(10)]],
      weight: [''],
      systolic: [''],
      diastolic: [''],
      pulse: [''],
      height: [''],
      respiratory: [''],
  });
  
    this.noteForm = this.formBuilder.group({
      notes: ['',[Validators.required,Validators.minLength(1)]],
    });
  
   

    this.cashForm = this.formBuilder.group({
      amount: [0, [Validators.required,Validators.min(10)]],
    });
    this.loading_count=0;
    this.loading=true;
    this.getAppointment(this.route.snapshot.params.id);

  }
  get s() { return this.spouseForm.controls; }
  get f() { return this.appointmentForm.controls; }
  get g() { return this.counselorForm.controls; }
  get h() { return this.cashForm.controls; }
  get i() { return this.supervisionForm.controls; }

  navigate(){
    this.router.navigate(['/dashboard/bill-client/',this.route.snapshot.params.id])
   }
   triageSave(){
     if(this.triageForm.invalid){
       return 
     }
     let data = this.triageForm.value;
     data.id = this.route.snapshot.params.id
     this.loading=true;
     this.service.postTriage(data).subscribe((res)=>{
       this.loading=false;
       this.toastr.success("Triage Saved")
       console.log(res);
     },(error)=>{
       
      this.loading=false;
      this.toastr.error("Something went wrong");
      console.log(error);
    })
   }
   onNote(){
     
   }
   appointmentTypeSelected(value){
     console.log("SELECTED",value);
     if(value=='couple')
     this.addspouse=true;
     else 
     this.addspouse=false;
   }
  getAppointment(id){
    this.service.getAppointment(id).subscribe((res)=>{
      this.data = res;
      this.loading = false
      this.customer = this.data.patient;
      this.appointmentForm.patchValue({date:new Date(this.data.date),reason:this.data.reason,time:this.data.time,type:this.data.dose})
      if(res.triage !=undefined){
        this.triageForm.patchValue(res.triage);  
      }
    },(err)=>{
      this.loading = false
    })

  }
  

  
 
  refund(data){
    this.service.appointmentRefund(data).subscribe((res)=>{
      this.ngOnInit();
    })
  }

  onSubmit(){
    let data = this.appointmentForm.value
    data.id = this.route.snapshot.params.id
    this.service.rescheduleAppointment(data).subscribe((res)=>{
      this.toastr.success("Successfully updated",'Success');
      this.ngOnInit();
    },(err)=>{
      this.toastr.info(err.error.error,"Failed");
    })
  }

  completeAppointment(){
    if(this.triageForm.get('temperature').value == ''){
      this.toastr.info("Kindly take temperature",'Temperature');
    }
    this.staticModal.show();
  }
finish(){
  let data = this.noteForm.value
  data.id = this.route.snapshot.params.id
  this.loading=true;
  this.staticModal.hide();
  this.service.completeAppointment(data).subscribe((res)=>{
    this.loading=false;
    this.toastr.success("Successfully finished ",'Success');
    this.ngOnInit();
  },(err)=>{
    this.loading=false;
    this.toastr.info(err.error.error,"Failed");
  })
}
 
}
