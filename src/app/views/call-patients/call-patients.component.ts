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
  patient_info;
  notesdatasource;
  clientForm: FormGroup;
  notesform: FormGroup;
  take_notes={
    notes:"",
   
  
  }
  @ViewChild('paymentModal', { static: false }) paymentModal: ModalDirective;
  AllColumns1: string[] = ['sn','date','note','user']

  AllColumns: string[] = ['sn','date','patient','service','phone','rating','comments',"visit_type"]

  constructor(public service:ServiceService,private route: ActivatedRoute,private formBuilder:FormBuilder,public toastr:ToastrService) { }

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
//   this.notesform = this.formBuilder.group({
//     notes: ['',[Validators.required]],
   
// });

  
    this.service.feedbackscallpatient(this.route.snapshot.params.id).subscribe(
        res => {
              this.dataSourceCall=res;
              // this.take_notes=this.dataSourceCall.feedback_notes
              this.phone=this.dataSourceCall.id;
              this.mypatient_id=this.dataSourceCall.phone;
            console.log("dataSourceCall",this.dataSourceCall)
          
        },
       
        err => console.error(err),
       
        () => console.log('There is an error')
      );
  
    


    
      }
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

}
