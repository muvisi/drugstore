// import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../service.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
@Component({
  selector: 'app-patientsuploads',
  templateUrl: './patientsuploads.component.html',
  styleUrls: ['./patientsuploads.component.scss']
})
export class PatientsuploadsComponent implements OnInit {
  RegistrationColumns: string[] = ['sn','created','First','payment','phone','clinic','department','gender','residence','action','view']
  completedColumns: string[] = ['sn','created','client','opno','phone','called_by','status']
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  file: File;
  loading;
  fileUploadForm: FormGroup;
  fileInputLabel: string;
  dataSourceuploaded_pending;
  dataSourcepatientuploaded;
  dataSourcepatientuploaded_completed;
  dataSourcepatientuploaded_sms;
  filter_statdate;
  // dataSource: any={}
  dataSource: any={};
  selFile;
  file_name;
  services_filter_date;
  filter_startdate;
  filter_enddate;
  datasource_count;
  file_selected;
  datasource_countcompleted;
  datasource_sms;
  personnels;
  selected_user;
  datasource_callbackstat;
  datasource_countsms;
  datasource_statistics
  constructor(public service:ServiceService,public toastr:ToastrService,public router:Router,private http: HttpClient,
    private formBuilder: FormBuilder
) { 


  this.dataSource= {
    chart: {
      caption: 'AAR HOSPITAL',
      subCaption: 'Patients CallBacks',
      xAxisName: 'Status',
      yAxisName: 'Total Count',
      numberSuffix: '',
      theme: 'fusion'
    },
    data:[]
  };
  // this.dataSource = dataSource;
}
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
 
  

  ngOnInit() {
    this.fileUploadForm = this.formBuilder.group({
      myfile: ['']
    });
    this.getUploadedPatients()
    this.getUploadedPatientsCompleted();
    this.getUploadedPatientsSms()
    this.getCustomerService()
    this.getStatistics()
    this.getCallbackGraph()
  }
  onFileSelect(event) {
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);

     
        this.fileInputLabel = file.name;
        this.fileUploadForm.get('myfile').setValue(file);
      
  };
  
 
  }
  onFormSubmit() {


    if (!this.fileUploadForm.get('myfile').value) {
      alert('Please fill valid details!');
      return false;
    }

    const formData = new FormData();
    // handleUpload(event) {
      const file = this.fileUploadForm.get('myfile').value
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
          console.log(reader.result);
          var base64data = reader.result;                
        
          // console
          const uploadResponse =  this.service.fileUpload({'file':base64data,filename:this.fileInputLabel}).subscribe((res:any)=>{
            this.toastr.success('Successfully saved the form','Saved')
        
            console.log(res)
          })
      };
    
  }
  viewClicked(item){
    this.router.navigateByUrl("dashboard/feedback-call-details/"+item.id)

  }
  getUploadedPatients(){
    this.service.alluploadedpatients('').subscribe(
      data => {
        console.log("uploadedmembers",data)
        this.dataSourcepatientuploaded = new MatTableDataSource(data.patient);
        this.dataSourcepatientuploaded.paginator = this.paginator;
        this.datasource_count=data.count
        

        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );

  }
  getUploadedPatientsCompleted(){
    this.service.getuploadedpatientsCompleted().subscribe(
      data => {
        console.log("uploadedmembers",data)
        this.dataSourcepatientuploaded_completed = new MatTableDataSource(data.patients);
        this.dataSourcepatientuploaded_completed .paginator = this.paginator;
        this.datasource_countcompleted=data.count
         

        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );

  }
  getUploadedPatientsFilter(){
    let data={
      // start:this.filter_startdate,
      start:this.filter_enddate
    }
    console.log("my data here",data)
    this.service.alluploadedpatients(data).subscribe(
      data => {
        console.log("uploadedmembers",data)
        this.dataSourcepatientuploaded = new MatTableDataSource(data.patient);
        this.dataSourcepatientuploaded.paginator = this.paginator;
        this.datasource_count=data.count
        // this.loading = false;
        try{
          localStorage.setItem('maternity_booking3',JSON.stringify(data))
        }
        catch(error){} 

        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );

  }
  getUploadedPatientsSms(){
    this.service.getuploadedpatientssms().subscribe(
      data => {
        
        this. dataSourcepatientuploaded_sms = new MatTableDataSource(data.patients);
        this.dataSourcepatientuploaded_sms.paginator = this.paginator;
        this.datasource_countsms=data.count
         

        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );

  }
  


  getCustomerService(){
    this.service.customerservicepersonnel().subscribe(
      data => {
        
        // this. dataSourcepatientuploaded_sms = new MatTableDataSource(data.patients);
        // this.dataSourcepatientuploaded_sms.paginator = this.paginator;
        this.personnels=data
         

        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );

  }
  getStatistics(){

    this.service.getstatistics("").subscribe(
      data => {
        
        this.datasource_statistics = new MatTableDataSource(data.patients);
        this.datasource_statistics.paginator = this.paginator;
        this.datasource_callbackstat=data.count
        
         

        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );



  }
  clinicClicked(item){
    this.selected_user=item.name
    let data={
      email:item.name
    }
    this.service.getstatistics(data).subscribe(
      data => {
        
        this.datasource_statistics = new MatTableDataSource(data.patients);
        this.datasource_statistics.paginator = this.paginator;
        this.datasource_callbackstat=data.count
        
         

        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }
  getStatisticsFilter(){
    let data={
      email:this.selected_user,
      date:this.filter_statdate
    }
    this.service.getstatistics(data).subscribe(
      data => {
        
        this.datasource_statistics = new MatTableDataSource(data.patients);
        this.datasource_statistics.paginator = this.paginator;
        this.datasource_callbackstat=data.count
        
         

        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }
  getCallbackGraph(){
    let data={
      date:new Date("2022-08-14")}
      console.log("custome data",data)
      
    this.service.callback_graph(data).subscribe(
      res => {
        
        this.dataSource.data =res.data;
        console.log("there is graph data",res)
        
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }
  getFilterGraph(){
    let data={
      date:this.services_filter_date
    }
    console.log(data)
    this.service.callback_graph(data).subscribe(
      res => {
        
        this.dataSource.data =res.data;
        console.log("there is graph data",res)
        
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );






  }
  getCallbackGraphclicked(){
    let data={
      date:new Date("2022-08-14")}
      console.log("custome data",data)
      
    this.service.callback_graph(data).subscribe(
      res => {
        
        this.dataSource.data =res.data;
        console.log("there is graph data",res)
        
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );
  }

  BulkFeedBackSMS(){
    let data={
      date:this.filter_enddate
    }
    this.loading=true
 
    console.log("BULK SMS SENDING DATE",data)
    this.service.bulk_sms_feedback(data).subscribe(
      res => {

        this.loading=false
        this.toastr.success('Success','Bulk Sms Send')
        // this.dataSource.data =res.data;
        console.log("there is graph data",res)
        
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );




  }
}
