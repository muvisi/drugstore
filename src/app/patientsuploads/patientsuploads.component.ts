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
  RegistrationColumns: string[] = ['sn','created','First','payment','phone','clinic','department','gender','residence','action']
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  constructor(public service:ServiceService,public toastr:ToastrService,public router:Router,private http: HttpClient,
    private formBuilder: FormBuilder
) { }
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;
  dataSourceuploaded_pending;
  dataSourcepatientuploaded;
  selFile

  ngOnInit() {
    this.fileUploadForm = this.formBuilder.group({
      myfile: ['']
    });
    this.getUploadedPatients()
  }
  onFileSelect(event) {
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);

      if (!_.includes(af, file.type)) {
        alert('Only EXCEL Docs Allowed!');
      } else {
        this.fileInputLabel = file.name;
        this.fileUploadForm.get('myfile').setValue(file);
      }
      this.service.fileUpload(file).subscribe((res:any)=>{
        this.toastr.success('Successfully saved the form','Saved')
        this.getUploadedPatients()
    
        console.log(res)
      })
  };
    // }
  }
  onFormSubmit(event) {

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
  getUploadedPatients(){
    this.service.alluploadedpatients().subscribe(
      data => {
        console.log("uploadedmembers",data)
        this.dataSourcepatientuploaded = new MatTableDataSource(data);
        this.dataSourcepatientuploaded.paginator = this.paginator;
        // this.loading = false;
        // try{
        //   localStorage.setItem('maternity_booking3',JSON.stringify(data))
        // }
        // catch(error){} 

        
      
      },
     
      err => console.error(err),
     
      () => console.log('There is an error')
    );

  }
 
}
