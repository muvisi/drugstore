import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../../service.service';
import { FormBuilder, FormGroup, Validators, FormControl,FormArray} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDirective } from 'ngx-bootstrap/modal';
import * as moment from 'moment';

@Component({
  selector: 'app-bill-patient',
  templateUrl: './bill-patient.component.html',
  styleUrls: ['./bill-patient.component.scss']
})

export class BillPatientComponent implements OnInit {
  customer:any={};
  data:any={};
  appointmentForm: FormGroup;
  counselorForm: FormGroup;
  counsolers: any=[];
  rooms: any=[];
  claim:any={};
  dataSource;
  mpesaSource;
  serviceSource;
  submitted=false;
  minDate=new Date();
  @ViewChild('staticModal', { static: false }) staticModal: ModalDirective;
  @ViewChild('serviceModal', { static: false }) serviceModal: ModalDirective;
  @ViewChild('paginator', { static: true}) paginator: MatPaginator;
  Columns: string[] = ['sn','date','trans_id','name','msisdn','trans_type','amount','status','use']
  mpesaColumns: string[] = ['sn','date','trans_id','name','msisdn','amount','status','use']
  cashColumns: string[] = ['sn','date','name','amount','trx'];
  feesColumns: string[] = ['sn','date','type','amount','transaction','refund'];
  serviceColumns: string[] = ['sn','name','code','amount','delete'];
  billsColumns: string[] = ['sn','name','code','amount','delete'];
  allColumns: string[] = ['sn','created','mode','amount','delete'];
  time =['8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00']
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
  feesSource;
  claim_services =[];
  cashSource;
  constructor(private route: ActivatedRoute,public service:ServiceService,private formBuilder: FormBuilder,public toastr:ToastrService,public router:Router) { }
  ngOnInit() {
    this.appointmentForm = this.formBuilder.group({
      time: ['', Validators.required],
      reason: ['', Validators.required],
      type: ['', Validators.required],
      date:['',Validators.required]
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
    this.getRoom();
    this.getAppointment(this.route.snapshot.params.id);
    this.getCounselors();
    this.getServices();
    this.getpayers();
    this.getFee();
    
  }
  get f() { return this.appointmentForm.controls; }
  get g() { return this.counselorForm.controls; }
  get h() { return this.cashForm.controls; }
  get i() { return this.supervisionForm.controls; }


  getAppointment(id){
    this.service.getAppointment(id).subscribe((res)=>{
      this.data = res;
      this.customer = this.data.client;
      this.getMpesa(this.customer.phone);
      this.serviceSource = new MatTableDataSource(this.data.services);
      this.serviceSource.paginator = this.paginator;
      this.getCash(this.route.snapshot.params.id);
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
    })
  }
  getRoom() {
    this.service.getRooms().subscribe((res) => {
      this.rooms = res.results;
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
    })
  }
  onSubmit(){
    let data = this.appointmentForm.value
    data.id = this.route.snapshot.params.id
    this.service.rescheduleAppointment(data).subscribe((res)=>{
      this.ngOnInit();
    })
  }
  getFee(){
    this.service.appointmentFee(this.route.snapshot.params.id).subscribe((res)=>{
      this.feesSource = new MatTableDataSource(res.results)
    })
  }
  onInsurance(item){
   this.member.id = item.item.id;
  }
  claimService(item){
    let data = this.claim_services.find(obj => obj.id == item.id);
    if(data == undefined){
      this.claim_services.push(item);
     }else{
      let index = this.claim_services.findIndex(obj => obj.id == item.id);
      this.claim_services.splice(index,1);
     }
  }
  claimSubmit(){
    let claim:any ={};
    claim.services = this.claim_services;
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
  onSelect(id){
    let data = this.counsolers.find(obj=>obj.id == id);
    this.counselorForm.patchValue({first_name:data.first_name ? data.first_name: '',last_name : data.last_name,phone:data.phone,email:data.email,id:id})
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
    })
  }
  getCash(id){
    this.service.cashList(id).subscribe((res)=>{
      this.cashSource = res.results;
    })
  }
  getMpesa(id){
    id = id.substring(1);
    this.service.mpesaMobileSearch(id).subscribe((res)=>{
      this.mpesaSource = res.results;
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

  utilizeMpesa(item){
    if (window.confirm("Do you really want to use this transaction?")) {
      this.service.mpesaPayments({id:item.id,amount:item.amount,appointment:this.route.snapshot.params.id}).subscribe((res)=>{
        this.toastr.success("Successfully Utilized");
        this.staticModal.hide();
        this.ngOnInit();
      })
    }
  }
  mpesaStk(){
    let mobile = this.data.client.phone.substring(1)
    let amount = this.data.amount-this.data.amount_paid
    console.log(amount);
    if(amount > 0){
      this.service.mpesaStk({mobile:mobile,amount:amount,acc:'APPOINTMENT'}).subscribe((res)=>{
        console.log(res)
        this.toastr.success("Successfully sent stk push");
      },(err)=>{
        this.toastr.error('Stk push failed')
      })
    }
  }

  getServices(){
    this.service.getProviderServices().subscribe((res)=>{
      this.services = res.results;
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
    },(err)=>{
      this.toastr.error(err.error.error,"Error");
    })
  }
}
