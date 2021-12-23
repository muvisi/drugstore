import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../../service.service';
import { FormBuilder, FormGroup, Validators, FormControl,FormArray} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDirective } from 'ngx-bootstrap/modal';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-testing-details',
  templateUrl: './testing-details.component.html',
  styleUrls: ['./testing-details.component.scss'],
  providers:[DatePipe]
})
export class TestingDetailsComponent implements OnInit {
  maxDate = new Date();
  customer:any={};
  data:any={};
  icd =[];
  appointmentForm: FormGroup;
  counselorForm: FormGroup;
  spouseForm:FormGroup;
  paymentForm:FormGroup;
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
  @ViewChild('clientModal', { static: false }) clientModal: ModalDirective;
  @ViewChild('paginator', { static: true}) paginator: MatPaginator;
  @ViewChild('confirmModal', { static: false }) confirmModal: ModalDirective;
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
  clientForm: FormGroup;
  constructor(private route: ActivatedRoute,public service:ServiceService,private formBuilder: FormBuilder,public toastr:ToastrService,public router:Router,public datePipe:DatePipe) { }
  ngOnInit() {
    this.appointmentForm = this.formBuilder.group({
      time: ['', Validators.required],
      reason: ['', Validators.required],
      date:['',Validators.required]
    });
    this.paymentForm = this.formBuilder.group({
      time: ['', Validators.required],
      amount: ['', Validators.required],
      date:['',Validators.required],
      transaction_code:['',Validators.required],
      payer: ['',Validators.required],
      phone:['',Validators.required]
    });

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
  get c() { return this.clientForm.controls; }
  get p() { return this.paymentForm.controls; }

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
     this.service.postTestingTriage(data).subscribe((res)=>{
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
    this.service.getTestingAppointment(id).subscribe((res)=>{
      console.log(res);
      this.data = res;
      this.loading = false
      this.customer = this.data.patient;
      this.appointmentForm.patchValue({date:new Date(this.data.date),reason:this.data.reason,time:this.data.time})

      if(res.triage !=undefined){
        this.triageForm.patchValue(res.triage); 
         
      }
      if(res.payment !=undefined){
        this.paymentForm.patchValue(res.payment); 
         
      }
    },(err)=>{
      this.loading = false
    })

  }
  

  onSave(){
    this.submitted = true;
    let data = this.clientForm.value;
    data.dob = this.datePipe.transform(data.dob,'yyyy-MM-dd');
    this.service.updateClient(data).subscribe((res)=>{
       this.clientModal.hide();
       this.submitted = false;
       this.toastr.success('Successfully updated client','Success');
       this.ngOnInit();
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

  testedCompleted(){
    
  }

  completeAppointment(){
    let date= moment(this.appointmentForm.get('date').value).format('YYYY-MM-DD')
    if(date! =moment().format('YYYY-MM-DD')){
      this.confirmModal.show();
    }else{
      if(this.triageForm.get('temperature').value == ''){
        this.toastr.info("Kindly take temperature",'Temperature');
        return
      }
      this.staticModal.show();
    }
  
  }
  confirm(){
    this.confirmModal.hide();
    this.staticModal.show();

  }
finish(){
  let data = this.noteForm.value
  data.id = this.route.snapshot.params.id
  this.loading=true;
  this.staticModal.hide();
  this.service.completeCovidTesting(data).subscribe((res)=>{
    this.loading=false;
    this.toastr.success("Successfully finished ",'Success');
    this.ngOnInit();
  },(err)=>{
    this.loading=false;
    this.toastr.info(err.error.error,"Failed");
  })
}

edit(){
  let item = this.customer;
  this.clientForm.patchValue({first_name:item.first_name,last_name:item.last_name,other_names:item.other_names,phone:item.phone,
    dob:new Date(item.dob),gender:item.gender,email:item.email,residence:item.residence,national_id:item.national_id,occupation:item.occupation,id:item.id
  })
  this.clientModal.show();
}

}
