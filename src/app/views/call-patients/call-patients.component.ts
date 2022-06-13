import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { ServiceService } from '../../../service.service';
import dateFormat, { masks } from "dateformat";
import { MatTableDataSource } from '@angular/material/table';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ServiceService } from '../../service.service';
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
  clientForm: FormGroup;
  nextofKin={
    name:"",
    phone:"",
    residence:"",
    relationship:""
  
  }
  AllColumns: string[] = ['sn','date','patient','service','phone','rating','comments',"visit_type","status","type"]

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
  
    this.service.feedbackscallpatient(this.route.snapshot.params.id).subscribe(
        res => {
              this.dataSourceCall=res;
              this.phone=this.dataSourceCall.id;
              this.mypatient_id=this.dataSourceCall.phone;
            console.log("dataSourceCall",this.dataSourceCall)
          
        },
       
        err => console.error(err),
       
        () => console.log('There is an error')
      );
      // console.log('patient_id',this.dataSourceCall.patient.id)
    // this.service.singlepatientfeedback(this.dataSourceCall.patient.id).subscribe(
    //   res => {
      
    //     this.dataSource=res
    //     console.log('single_patient',this.dataSource)
            
      
        
    //   },
     
    //   err => console.error(err),
     
    //   () => console.log('There is an error')
    // );



    
      }
  
  CallPatient(){
    // console.log('phone',this.route.snapshot.params.id)
    // console.log('patient_id',this.dataSourceCall.patient.id)
    this.service.callpatient({phone:this.route.snapshot.params.id}).subscribe(
      res => {
      // if(res.status=='CALLED')
      // {
        this.toastr.success('success','Thank you for calling')
      // }
      
            
      
        
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
  

}
