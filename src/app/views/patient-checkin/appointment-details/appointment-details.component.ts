import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../../service.service';
import { FormBuilder, FormGroup, Validators, FormControl,FormArray} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDirective } from 'ngx-bootstrap/modal';

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
  submitted=false;
  minDate=new Date();
  @ViewChild('staticModal', { static: false }) staticModal: ModalDirective;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  Columns: string[] = ['sn','date','trans_id','name','msisdn','trans_type','amount','status','use']
  cashColumns: string[] = ['sn','date','name','amount','trx'];
  cashForm: FormGroup;
  constructor(private route: ActivatedRoute,public service:ServiceService,private formBuilder: FormBuilder,public toastr:ToastrService) { }
  ngOnInit() {
    this.appointmentForm = this.formBuilder.group({
      time: ['', Validators.required],
      reason: ['', Validators.required],
      date:['',Validators.required]
    });
    this.counselorForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: [''],
      phone:[''],
      email:['',Validators.required],
      id:['',Validators.required],
      room:['',Validators.required]
    });

    this.cashForm = this.formBuilder.group({
      amount: [0, [Validators.required,Validators.min(50)]],
    });
    this.getRoom();
    this.getAppointment(this.route.snapshot.params.id);
    this.getCounselors();
  }
  get f() { return this.appointmentForm.controls; }
  get g() { return this.counselorForm.controls; }
  get h() { return this.cashForm.controls; }


  getAppointment(id){
    this.service.getAppointment(id).subscribe((res)=>{
      this.data = res;
      this.customer = this.data.client;
      this.getCash(this.customer.id);
      this.getPayments(this.customer.phone);
      if(this.data.counselor.id){
        this.onSelect(this.data.counselor.id);
      }
      if(this.data.Location){
        let room = this.rooms.find(obj=>obj.name == this.data.Location);
        this.counselorForm.patchValue({room:room.id});
      }
      this.appointmentForm.patchValue({date:new Date(this.data.StartTime),reason:this.data.Description,time:new Date(this.data.StartTime).toLocaleTimeString().replace(/:\d{2}\s/,' ')})
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

  }
  onSelect(id){
    let data = this.counsolers.find(obj=>obj.id==id);
    this.counselorForm.patchValue({first_name:data.first_name ? data.first_name: '',last_name:data.last_name,phone:data.phone,email:data.email,id:id})
  }
  onSave(){
    this.submitted = true;
    if(this.counselorForm.invalid){
      return
    }
    let data = this.counselorForm.value
    data.appointment = this.route.snapshot.params.id
    this.service.updateAppointments(data).subscribe((res)=>{
      this.toastr.success("Successfully updated appointment");
      this.submitted = true;
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
}
