import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { ServiceService } from '../../../service.service';
import dateFormat, { masks } from "dateformat";
import { MatTableDataSource } from '@angular/material/table';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ServiceService } from '../../service.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-call-patients',
  templateUrl: './call-patients.component.html',
  styleUrls: ['./call-patients.component.scss']
})
export class CallPatientsComponent implements OnInit {
  dataSourceCall;
  dataSource;
  mypatient_id;
  phone;
  client_name;
  client_phone;
  client_email;
  client_department;
  client_dob

  patient_info;
  notesdatasource;
  clientForm: FormGroup;
  clientFormedit: FormGroup;
  notesform: FormGroup;
  take_notes={
    notes:"",
   
  
  }
  maxDate=new Date();
  @ViewChild('paymentModal', { static: false }) paymentModal: ModalDirective;
  @ViewChild('staticModal', { static: false }) staticModal: ModalDirective;
  AllColumns1: string[] = ['sn','date','note','user']
  submitted=false;

  AllColumns: string[] = ['sn','date','patient','service','phone','rating','comments',"visit_type"]

  constructor(public datePipe:DatePipe,public service:ServiceService,private route: ActivatedRoute,private formBuilder:FormBuilder,public toastr:ToastrService) { }

  ngOnInit() {
    // this.phone=this.CallPatient.phone
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
  this.clientFormedit = this.formBuilder.group({
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
    id: this.route.snapshot.params.id
  });

//   this.notesform = this.formBuilder.group({
//     notes: ['',[Validators.required]],
   
// });

  
    this.service.feedbackscallpatient(this.route.snapshot.params.id).subscribe(
        res => {
              this.dataSourceCall=res;
              // this.take_notes=this.dataSourceCall.feedback_notes
              this.phone=this.dataSourceCall.id;
              this.mypatient_id=this.dataSourceCall.phone;
              if(this.dataSourceCall.patient.first_name!== null && this.dataSourceCall.patient.last_name!== null)
              {
                this.client_name=this.dataSourceCall.patient.first_name.concat(" ").concat(this.dataSourceCall.patient.last_name)



              }
              if(this.dataSourceCall.patient.first_name== null && this.dataSourceCall.patient.last_name== null)
              {
                // this.client_name=this.dataSourceCall.patient.first_name.concat(" ").concat(this.dataSourceCall.patient.last_name)
              this.client_name="No Names"


              }
              if(this.dataSourceCall.patient.email!== null)
                {
                  this.client_email=this.dataSourceCall.patient.email



                }
              if(this.dataSourceCall.patient.email== null)
                {
                  this.client_email="No Email"



                }
              if(this.dataSourceCall.department!==null){


                this.client_department=this.dataSourceCall.department
              }
              if(this.dataSourceCall.department==null){


                this.client_department="No Department"
              }
            console.log("dataSourceCall",this.dataSourceCall)
          
        },
       
        err => console.error(err),
       
        () => console.log('There is an error')
      );
  
    


    
      }
    get f() { return this.clientForm.controls; }
      TakeNotes(){ let data1={
        notes:this.take_notes.notes,
        id:this.route.snapshot.params.id
      }
      console.log(data1)
      console.log('notes data',data1)
    this.service.updatecomments(data1).subscribe(
      res => {
        this.toastr.success('success','Notes successfully saved')
        this.paymentModal.hide()
        console.log('data',res)
        
       
            
      
        
      },
     
     
    );
  } 
  
  CallPatient(){
    
    this.service.callpatient({phone:this.dataSourceCall.phone}).subscribe(
      res => {
     
        this.toastr.success('success','Thank you for calling')
        this.ngOnInit()
   
            
      
        
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
    // this.toastr.info('Please', 'This patient Was Called')
    }
    SinglePatient(){
      let data={
        phone:this.dataSourceCall.phone
        
      }
      console.log('MY DATA',data)
    this.service.singlepatientfeedback(data).subscribe(
      res => {
      
        this.dataSource=res
        console.log('allpatientdata',res)
            
      
        
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );



    }
  feedbacksnotes(){
  let dt={
    phone:this.dataSourceCall.phone
  }
    this.service.feedbacksnotes(dt).subscribe(
      res => {
            this.notesdatasource=res;
           
        
      },
     
     
    );
  }
    Update(){
      let data1={
        notes:this.dataSourceCall.feedback_notes,
        id:this.route.snapshot.params.id
      }
      console.log('notes data',data1)
    this.service.updatecomments(data1).subscribe(
      res => {
        this.CallPatient()
        this.toastr.success('success','Notes successfully saved')
        console.log('data',res)
        
       
            
      
        
      },
     
     
    );
  } 
  edit(){
    // if (this.dataSourceCall.patient.first_name!=null){
    //   this.clientFormedit.patchValue(
    //     {
    //       first_name:this.dataSourceCall.patient.first_name,
    //       last_name:this.dataSourceCall.patient.last_name,
    //       other_names:this.dataSourceCall.patient.other_name,
    //       phone:this.dataSourceCall.phone,
    //     dob:new Date(this.dataSourceCall.patient.dob),
    //     gender:this.dataSourceCall.patient.gender,
    //     email:this.dataSourceCall.patient.email,
    //     residence:this.dataSourceCall.patient.residence,
    //     national_id:this.dataSourceCall.patient.national_id,
    //     occupation:this.dataSourceCall.patient.occupation,
    //     id:this.route.snapshot.params.id
    //   })


    //   }

    this.clientFormedit.patchValue(
      {
        // first_name:this.dataSourceCall.patient.first_name,
        // last_name:this.dataSourceCall.patient.last_name,
        // other_names:this.dataSourceCall.patient.other_name,
        phone:this.dataSourceCall.phone,
      // dob:new Date(this.dataSourceCall.patient.dob),
      // gender:this.dataSourceCall.patient.gender,
      // email:this.dataSourceCall.patient.email,
      // residence:this.dataSourceCall.patient.residence,
      // national_id:this.dataSourceCall.patient.national_id,
      // occupation:this.dataSourceCall.patient.occupation,
      id:this.route.snapshot.params.id
    })
    this.staticModal.show();
  }
  onSave(){
   this.submitted = true;
   let data = this.clientFormedit.value;
   data.dob = this.datePipe.transform(data.dob,'yyyy-MM-dd');
   console.log("this is data",data)
   this.service.editclientfeedback(data).subscribe((res)=>{
      this.staticModal.hide();
      this.submitted = false;
      this.toastr.success('Successfully updated client','Success');
     this.ngOnInit()
   })
  }
  

}
