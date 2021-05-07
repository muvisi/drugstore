import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../../service.service';
import { FormBuilder, FormGroup, Validators, FormControl,FormArray} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDirective } from 'ngx-bootstrap/modal';
import * as moment from 'moment';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss']
})
export class AppointmentDetailsComponent implements OnInit {
  customer:any={};
  data:any={};
  appointmentForm: FormGroup;
  counselorForm: FormGroup;
  counsolers: any=[];
  rooms: any=[];
  dataSource;
  mpesaSource;
  serviceSource;
  submitted=false;
  minDate=new Date();
  @ViewChild('staticModal', { static: false }) staticModal: ModalDirective;
  @ViewChild('serviceModal', { static: false }) serviceModal: ModalDirective;
  @ViewChild('paginator', { static: true}) paginator: MatPaginator;
  Columns: string[] = ['sn','date','trans_id','name','msisdn','trans_type','amount','status','use']
  cashColumns: string[] = ['sn','date','name','amount','trx'];
  serviceColumns: string[] = ['sn','name','code','amount','delete'];
  time =['8:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00']
  cashForm: FormGroup;
  noteForm: FormGroup;
  services: any=[];
  seleted:any={};
  serviceForm: FormGroup;
  text: string;
  supervisionForm: FormGroup;
  constructor(private route: ActivatedRoute,public service:ServiceService,private formBuilder: FormBuilder,public toastr:ToastrService) { }
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
  }
  get f() { return this.appointmentForm.controls; }
  get g() { return this.counselorForm.controls; }
  get h() { return this.cashForm.controls; }
  get i() { return this.supervisionForm.controls; }


  getAppointment(id){
    this.service.getAppointment(id).subscribe((res)=>{
      this.data = res;
      this.customer = this.data.client;
      this.serviceSource = new MatTableDataSource(this.data.services);
      this.serviceSource.paginator = this.paginator;
      this.getCash(res.client.id);
      this.getPayments(this.customer.phone);
      if(this.data.notes){
        this.noteForm.patchValue({notes:this.data.notes})
      }
      if(this.data.counselor != undefined){
        this.onSelect(this.data.counselor.id);
      }
      if(this.data.supervisor != undefined){
        this.onCounsoler(this.data.supervisor.id);
      }
      

      if(this.data.Location){
        let room = this.rooms.find(obj=>obj.name == this.data.Location);
        this.counselorForm.patchValue({room:room.id});
      }
    
      this.appointmentForm.patchValue({date:new Date(this.data.StartTime),reason:this.data.Description,time:moment(this.data.StartTime).format('H:mm'),type:this.data.type})
    })
  }
  getRoom() {
    this.service.getRooms().subscribe((res) => {
      this.rooms = res.results;
    });
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
  onSelect(id){
    let data = this.counsolers.find(obj=>obj.id==id);
    this.counselorForm.patchValue({first_name:data.first_name ? data.first_name: '',last_name:data.last_name,phone:data.phone,email:data.email,id:id})
  }
  onCounsoler(id){
    let data = this.counsolers.find(obj=>obj.id==id);
    this.supervisionForm.patchValue({first_name:data.first_name ? data.first_name: '',last_name:data.last_name,phone:data.phone,email:data.email,id:id})
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
      this.toastr.success("Successfully updated appointment");
      this.submitted = true;
    },(err)=>{
      this.toastr.info(err.error.error,"Failed");
    })
  }
  getPayments(id){
    this.service.clientPayments({mobile:id}).subscribe((res)=>{
      this.dataSource = new MatTableDataSource(res);
    })
  }

  getCash(id){
    this.service.cashList(id).subscribe((res)=>{
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
  onNote(){
    if(this.noteForm.valid){
    let data =this.noteForm.value;
    data.id = this.route.snapshot.params.id
    this.service.addNote(data).subscribe(()=>{
    })
    }
  }
  addStatus(text){
  //  console.log(moment().format('H:mm'))
  //  if(moment(this.data.StartTime).format('H:mm') == '13:00' ){
  //    console.log("Sawa")
  //  }else{
  //   console.log("no")
  //  }
    let data:any ={}
    data.id = this.route.snapshot.params.id
    data.status = text
    this.service.addStatus(data).subscribe((res)=>{
      if (text =='ongoing'){
        this.toastr.success("Started a session","Success");
      }else{
        this.toastr.success("Ended a session","Success");
      }
    })
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
