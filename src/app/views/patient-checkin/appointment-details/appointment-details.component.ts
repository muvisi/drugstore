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

  addspouse=false;
  spouse=false;
  spouse_submiited=false;
  session_platform;

  loading=false;
  loading_count=0;
  constructor(private route: ActivatedRoute,public service:ServiceService,private formBuilder: FormBuilder,public toastr:ToastrService,public router:Router) { }
  ngOnInit() {
    this.appointmentForm = this.formBuilder.group({
      time: ['', Validators.required],
      reason: ['', Validators.required],
      type: ['', Validators.required],
      date:['',Validators.required]
    });

    this.spouseForm = this.formBuilder.group({
      s_phone: new FormControl('', Validators.required),
      f_name:  new FormControl('', Validators.required),
      l_name:  new FormControl('', Validators.required),
      o_names:  new FormControl('', Validators.required),
      dob:  new FormControl('', Validators.required),
      s_gender:  new FormControl('', Validators.required),
      national_id: new FormControl('', Validators.required),
      s_email:  new FormControl('', Validators.required)    
    });

    this.serviceForm = this.formBuilder.group({
      name: ['', Validators.required],
      cost: ['', Validators.required],
      id:['',Validators.required],
      code:['',Validators.required],
    });

    this.noteForm = this.formBuilder.group({
      notes: ['',[Validators.required,Validators.minLength(1)]],
    });
    this.counselorForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: [''],
      phone:[''],
      email:['',Validators.required],
      id:['',Validators.required],
      room:['',Validators.required]
    });
    this.supervisionForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: [''],
      phone:[''],
      email:['',Validators.required],
      id:['',Validators.required],
    });

    this.cashForm = this.formBuilder.group({
      amount: [0, [Validators.required,Validators.min(10)]],
    });
    this.loading_count=0;
    this.loading=true;
    this.getCounselors();
    this.getRoom();
    this.getAppointment(this.route.snapshot.params.id);
    this.getServices();
    this.getpayers();
    this.getFee();
    this.getSpouse(this.route.snapshot.params.id);
    this.getIssuesAndTests(this.route.snapshot.params.id);

    
  }
  get s() { return this.spouseForm.controls; }
  get f() { return this.appointmentForm.controls; }
  get g() { return this.counselorForm.controls; }
  get h() { return this.cashForm.controls; }
  get i() { return this.supervisionForm.controls; }

  navigate(){
    this.router.navigate(['/dashboard/bill-client/',this.route.snapshot.params.id])
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
      if(this.data.type=='couple')this.addspouse=true; else this.addspouse=false;
      this.session_platform=this.data.platform;
      this.customer = this.data.client;
      this.serviceSource = new MatTableDataSource(this.data.services);
      this.diagnosisSource = new MatTableDataSource(this.data.diagnosis);
      this.serviceSource.paginator = this.paginator;
      this.getCash(res.client.id);
      this.getPayments(this.customer.phone);
      if(this.data.notes){
        this.noteForm.patchValue({notes:this.data.notes})
      }
      if(this.data.counselor!= undefined && this.data.counselor.id != undefined){
        this.onSelect(this.data.counselor.id);
      }
      if(this.data.supervisor!= undefined && this.data.supervisor.id!= undefined){
        this.onCounsoler(this.data.supervisor.id);
      }
      if(this.data.Location){
        let room = this.rooms.find(obj=>obj.name == this.data.Location);
        this.counselorForm.patchValue({room:room.id});
      }
      console.log(moment(this.data.StartTime).format('H:mm'))
      this.appointmentForm.patchValue({date:new Date(this.data.StartTime),reason:this.data.Description,time:moment(this.data.StartTime).format('H:mm'),type:this.data.type})
    this.loading_count=this.loading_count+1
    if(this.loading_count==7)this.loading=false;
    })

  }
  addSpouseClicked(){
    this.loading=true;
    this.spouse_submiited=true;
    if(moment().format('YYYY-MM-DD') <= moment(this.spouseForm.get('dob').value).format('YYYY-MM-DD')){
        this.toastr.info("please select correctdate");
      this.loading = false; 
      this.spouse_submiited = false;
      return
      }
    this.spouse_submiited=true;
    this.service.addSpouse(this.data.id,this.spouseForm.value).subscribe((res)=>{
    this.toastr.success("Spouse Added");
    this.loading=false;

    this.spouse_submiited=false;
    })

    
  }

  getSpouse(id){
    this.service.getSpouse(id).subscribe((res)=>{
      console.log("api",res)
      if (res.spouse){
        this.addspouse=true;
      this.spouseForm.patchValue(res)
      }
      this.loading_count=this.loading_count+1
      if(this.loading_count==7)this.loading=false;
    });
  }
  getRoom() {
    this.service.getRooms().subscribe((res) => {
      this.rooms = res.results;
      this.loading_count=this.loading_count+1
      if(this.loading_count==7)this.loading=false;
    });
  }
  refund(data){
    this.service.appointmentRefund(data).subscribe((res)=>{
      this.ngOnInit();
    })
  }
  getCounselors(){
    this.service.getAppointmentUsers().subscribe((res)=>{
      this.counsolers = res.results;
      this.loading_count=this.loading_count+1
      if(this.loading_count==7)this.loading=false;
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
  getFee(){
    this.service.appointmentFee(this.route.snapshot.params.id).subscribe((res)=>{
      this.feesSource = new MatTableDataSource(res.results)
      this.loading_count=this.loading_count+1
      if(this.loading_count==7)this.loading=false;
    })
  }
  onInsurance(item){
   this.member.id = item.item.id;
  }
  claimService(item){
    let data = this.claim.services.find(obj => obj.id == item.id);
    if(data == undefined){
      this.claim.services.push(item);
     }else{
      let index = this.claim.services.findIndex(obj => obj.id == item.id);
      this.claim.services.splice(index,1);
     }
  }
  claimSubmit(){
    let claim:any ={};
    claim.services = this.claim.services;
    claim.appointment = this.route.snapshot.params.id;
    claim.member = this.member_data;
    this.service.createSingleClaim(claim).subscribe((res)=>{
      this.toastr.success("Successfully created claim",'Success');
      this.router.navigate(['/dashboard/eclaims-dashboard/claims'])

    })
  }
  insureCheck(){
    this.service.insureCheck(this.member).subscribe((res)=>{
      this.member_data = res.member_data;
      this.member_data.benefits = JSON.parse(this.member_data.benefits)
    })
  }
  searchDiagnosis(text){
    this.service.searchDiagnosis(text).subscribe((res)=>{
      this.icd = res.results;
    })
  }
  onDiagnosis(item){
    let data:any ={}; 
    data.patient =  this.customer.id;
    data.description=item.item.code;
    console.log(data);
    this.service.historyDiagnosis(data).subscribe((res)=>{
      console.log(res);
      this.toastr.success("Successfully Added");
      this.diagnosis ={};
      this.data.diagnosis.push(res);
      this.diagnosisSource=new MatTableDataSource(this.data.diagnosis);
      this.diagnosisSource._updateChangeSubscription();
    })

  }
  onSelect(id){
    let data = this.counsolers.find(obj=>obj.id == id);
    if(data !=undefined){
      this.counselorForm.patchValue({first_name:data.first_name ? data.first_name: '',last_name : data.last_name,phone:data.phone,email:data.email,id:id})
    }
  }
  onCounsoler(id){
    let data = this.counsolers.find(obj=>obj.id==id);
    this.supervisionForm.patchValue({first_name: data.first_name ? data.first_name: '', last_name:data.last_name,phone:data.phone,email:data.email,id:id})
  }
  onSave(){
    this.submitted = true;
    if(this.counselorForm.invalid){
      return
    }
    let data = this.counselorForm.value
    data.appointment = this.route.snapshot.params.id
    data.time =this.appointmentForm.get('time').value
    data.date =this.appointmentForm.get('date').value
    this.service.updateAppointments(data).subscribe((res)=>{
      this.toastr.success("Successfully updated appointment",'Success');
      this.submitted = true;
      this.ngOnInit();
    },(err)=>{
      this.toastr.info(err.error.error,"Failed");
    })
  }


  getPayments(id){
    this.service.clientPayments({mobile:id}).subscribe((res)=>{
      this.dataSource = new MatTableDataSource(res);
     
    })
  }
  getpayers(){
    this.service.getPayers().subscribe((res)=>{
      this.insurances = res.results;
      this.loading_count=this.loading_count+1
      if(this.loading_count==7)this.loading=false;
    })
  }
  getCash(id){
    this.service.cashList(id).subscribe((res)=>{
      this.mpesaSource = res.results;
      this.loading_count=this.loading_count+1
      if(this.loading_count==7)this.loading=false;
    })
  }
  onCash(){
    this.service.cashPayments({id:this.route.snapshot.params.id,amount:this.cashForm.get('amount').value}).subscribe((res)=>{
      this.toastr.success("Successfully added cash payment");
      this.staticModal.hide();
      this.ngOnInit();
    })
  }
  utilize(item){
    if (window.confirm("Do you really want to use this transaction?")) {
      this.service.ncbaPayments({id:item.id,amount:item.amount,appointment:this.route.snapshot.params.id}).subscribe((res)=>{
        this.toastr.success("Successfully Utilized");
        this.staticModal.hide();
        this.ngOnInit();
      })
    }
  }
  onNote(){
    if(this.noteForm.valid){
    let data =this.noteForm.value;
    data.id = this.route.snapshot.params.id
    this.service.addNote(data).subscribe(()=>{
    })
    }
  }
  addStatus(text){
    if (this.session_platform==null){
      this.toastr.error("Select a session paltform");
      return;
    }
    let data:any ={}
    data.id = this.route.snapshot.params.id
    data.status = text;
    data.platform=this.session_platform;
    this.service.addStatus(data).subscribe((res)=>{
      if (text =='ongoing'){
        this.toastr.success("Started a session","Success");
        this.getAppointment(this.route.snapshot.params.id);
      }else{
        this.toastr.success("Ended a session","Success");
        this.getAppointment(this.route.snapshot.params.id);
      }
    })
  
  }
  getServices(){
    this.service.getProviderServices().subscribe((res)=>{
      this.services = res.results;
      this.loading_count=this.loading_count+1
      if(this.loading_count==7)this.loading=false;
    })
  }

  onService(item){
    this.seleted = item.item;
    this.serviceForm.patchValue({id:this.seleted.id,code:this.seleted.code,cost:this.seleted.cost,name:this.seleted.name})
    this.serviceModal.show();
  }
  
  addService(){
    this.serviceModal.hide();
    let data:any={}
    data.id = this.serviceForm.get('id').value;
    data.appointment = this.route.snapshot.params.id;
    console.log(data)
   this.service.appointmentServie(data).subscribe((res)=>{
     this.text ='';
     this.getAppointment(this.route.snapshot.params.id);
     this.toastr.success("Added Service","Success");
   },(err)=>{
    this.toastr.error(err.error.error,"Error");
   })
  }
  deleteService(item){
    if (window.confirm("Do you delete this service?")) {      this.service.deleteServices(item.id).subscribe((res)=>{
        this.getAppointment(this.route.snapshot.params.id);
      },(err)=>{
        this.toastr.error("Failed to delete","Error");
      })
    }
  }
  onAdd(){
    this.submitted = true;
    if(this.supervisionForm.invalid){
      return
    }
    let data = this.supervisionForm.value
    data.appointment = this.route.snapshot.params.id
    this.service.appointmentSupervison(data).subscribe((res)=>{
      this.toastr.success("Added Supervision","Success");
      this.ngOnInit();
    },(err)=>{
      this.toastr.error(err.error.error,"Error");
    })
  }

  getIssuesAndTests(id){
    this.service.getAppointmentIssuesTests(id).subscribe((res)=>{
      console.log(res);
      let data_issues=res.issues
      let data_tests=res.tests
      data_issues.forEach(element => {
        for(var i=0;i<this.issues.length;i++){
          if (this.issues[i].code==element.code){
            
            this.issues[i].checked=true;
            break;
          }
        }        
      });
      data_tests.forEach(element => {
        for(var i=0;i<this.tests.length;i++){
          if (this.tests[i].code==element.code){
          this.tests[i].value=element.value;
          break;
          }
        }        
      });
      if(this.check_if_issues_tests_selected()){
        console.log("FOUND","asjdalkjkljfsklajk");
        this.start_session_enabled=true;
      }else{
        this.start_session_enabled=false;
      }
 

    }

      )
  }

  onIssuesChange(event,data) {
    console.log(event);
    if(event.checked){
      
      data.checked=true;
      this.issues_tests_change.issues.push(data);
      this.service.postAppointmentIssuesTests(this.route.snapshot.params.id,this.issues_tests_change).subscribe((res)=>{
        this.issues_tests_change.issues=[]
        if(this.check_if_issues_tests_selected()){
          this.start_session_enabled=true;
        }else{
          this.start_session_enabled=false;
        }
      })
    }else{
      data.checked=true;
      this.issues_tests_change.issues.push(data);
    this.service.deleteAppointmentIssuesTests(this.route.snapshot.params.id,this.issues_tests_change).subscribe((res)=>{
      this.issues_tests_change.issues=[]
      if(this.check_if_issues_tests_selected()){
        this.start_session_enabled=true;
      }else{
        this.start_session_enabled=false;
      }
    });
      
    }
    
 } 

 onTestsChange(event,data) {
    this.issues_tests_change.tests.push(data);
    data.value=event.value;
    this.service.postAppointmentIssuesTests(this.route.snapshot.params.id,this.issues_tests_change).subscribe((res)=>{
      this.issues_tests_change.tests=[]
      if(this.check_if_issues_tests_selected()){
        this.start_session_enabled=true;
      }else{
        this.start_session_enabled=false;
      }
    }
 
    )
}


check_if_issues_tests_selected(){
 for(var i=0;i<this.issues.length;i++){
    if(this.issues[i].checked){
     for(var j=0;j<this.tests.length;j++){
       
     if(this.tests[j].value>1){
      //  console.log("VALUE",element2.value);
       return true;}
     }
   
   }
  }
return false;
}
}
