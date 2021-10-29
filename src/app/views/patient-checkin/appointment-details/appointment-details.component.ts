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
  @ViewChild('serviceModal', { static: false }) serviceModal: ModalDirective;
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
  issues_tests_change={
      "issues":[],
      "tests":[]
    }
  issues =[
    {
      name:"Marital Issues",
      code :101,
      checked:false
    },
    {
      name:"Relationship Issue",
      code :102,
      checked:false
    },
    {
      name:"Loss & Grief",
      code :103,
      checked:false
    },
    {
      name:"Stress/Anxiety",
      code :104,
      checked:false
    },
    {
      name:"Self- Awareness/Esteem",
      code :105,
      checked:false
    },
    {
      name:"Work/Career",
      code :106,
      checked:false
    },
    {
      name:"Adolescence/Teenage/Parenting",
      code :107,
      checked:false
    },
    {
      name:"Alcoholism/Substance Abuse",
      code :108,
      checked:false
    },
    {
      name:"CDM",
      code :109,
      checked:false
    },
    {
      name:"Trauma",
      code :110,
      checked:false
    },
    {
      name:"Family Issues",
      code :111,
      checked:false
    },
    {
      name:"Mental Health",
      code :112,
      checked:false
    },
    {
      name:"Anger Management",
      code :113,
      checked:false
    },
    {
      name:"Financial Issues",
      code :114,
      checked:false
    },
    {
      name:"Gambling addiction",
      code :115,
      checked:false
    },
    {
      name:"Relationship-Divorced/married/single/cohabiting/",
      code :116,
      checked:false
    }
  ]
  tests=[
    {
      name:"DSM/ICD",
      code:301,
      slider:false,
      value:1

    },
    {
      name:"Sexual satisfaction",
      code:302,
      slider:true,
      value:1
    },
    {
      name:"Intelligent",
      code:303,
      slider:true,
      value:1

    },
    {
      name:"Drug test",
      code:304,
      slider:true,
      value:1
    },
    {
      name:"Depression",
      code:305,
      slider:true,
      value:1
    },
    {
      name:"Personality Test",
      code:306,
      slider:false,
      value:1
    }

  ]
  counsellling_type=[
    {
      type:"First Dose",
      code:201,
      value:"First Dose"

    },
    {
      type:"Second Dose",
      code:202,
      value:"Second Dose"

    }

  ]

  addspouse=false;
  spouse=false;
  spouse_submiited=false;
  session_platform;

  loading=false;
  loading_count=0;
  triageForm: FormGroup;
  constructor(private route: ActivatedRoute,public service:ServiceService,private formBuilder: FormBuilder,public toastr:ToastrService,public router:Router) { }
  ngOnInit() {
    this.appointmentForm = this.formBuilder.group({
      time: ['', Validators.required],
      reason: ['', Validators.required],
      type: ['', Validators.required],
      date:['',Validators.required]
    });

    this.triageForm = this.formBuilder.group({
      temperature: ['', Validators.required],
      weight: ['', Validators.required],
      systolic: ['', Validators.required],
      diastolic: ['', Validators.required],
      pulse: ['', Validators.required],
      height: ['', Validators.required],
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
     let data = this.triageForm.value;
     data.id = this.route.snapshot.params.id
     this.loading=true;
     this.service.postTriage(data).subscribe((res)=>{
       
       this.loading=false;
       this.toastr.success("Triage Saved")
       console.log(res);
     })
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
      console.log('ddd',this.data);
      this.appointmentForm.patchValue({date:new Date(this.data.date),reason:this.data.reason,time:this.data.time,type:this.data.dose})
      this.triageForm.patchValue(res.triage);
    //   if(this.data.type=='couple')this.addspouse=true; else this.addspouse=false;
    //   this.session_platform=this.data.platform;
    //   this.customer = this.data.client;
    //   this.serviceSource = new MatTableDataSource(this.data.services);
    //   this.diagnosisSource = new MatTableDataSource(this.data.diagnosis);
    //   this.serviceSource.paginator = this.paginator;
    //   this.getCash(res.client.id);
    //   this.getPayments(this.customer.phone);
    //   if(this.data.notes){
    //     this.noteForm.patchValue({notes:this.data.notes})
    //   }
    //   if(this.data.counselor!= undefined && this.data.counselor.id != undefined){
    //     this.onSelect(this.data.counselor.id);
    //   }
    //   if(this.data.supervisor!= undefined && this.data.supervisor.id!= undefined){
    //     this.onCounsoler(this.data.supervisor.id);
    //   }
    //   if(this.data.Location){
    //     let room = this.rooms.find(obj=>obj.name == this.data.Location);
    //     this.counselorForm.patchValue({room:room.id});
    //   }
    //   console.log(moment(this.data.StartTime).format('H:mm'))
    //   this.appointmentForm.patchValue({date:new Date(this.data.StartTime),reason:this.data.Description,time:moment(this.data.StartTime).format('H:mm'),type:this.data.type})
    // this.loading_count=this.loading_count+1
    // if(this.loading_count==7)this.loading=false;
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

 
}
