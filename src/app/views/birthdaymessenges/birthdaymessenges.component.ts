import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatPaginator, MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../service.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material';
// import { ServiceService } from '../../../servi
@Component({
  selector: 'app-birthdaymessenges',
  templateUrl: './birthdaymessenges.component.html',
  styleUrls: ['./birthdaymessenges.component.scss']
})
export class BirthdaymessengesComponent implements OnInit {
  AllColumns: string[] = ['sn','date','patient','service','phone','rating','comments',"visit_type","status","type"]
  dataSourceCall;
  dataSource;
  selected;
  messagesdataSource;
  deliveredmessagesdataSource;
  registerForm: FormGroup;
  imageSrc: string;
  selectedd: any ={
    'company_contact':'',
    'company_email':'',
    'company_location':'',
    'company_name':'',
    'company_title':'',
    'message':'',
    'designation':''

   


  }
  @ViewChild('userModal', { static: false }) userModal: ModalDirective;
  @ViewChild('addModal', { static: false }) addModal: ModalDirective;
  AllColumns2: string[] = ['sn','created','name','email','contact','message','createdby','edit']
  AllColumns1: string[] = ['sn','dob','client','phone','email','age','view']
  constructor(public service:ServiceService,private route: ActivatedRoute,private formBuilder:FormBuilder,public toastr:ToastrService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      message: ['', Validators.required],
      email: ['', Validators.required],
      company_name:['',Validators.required],
      designation:['',Validators.required],
      location:['',Validators.required],
      contact:['',Validators.required],
      file:['',Validators.required,],
      filename:"image.png",
      fileSource:['']

  });
//   this.registerForm = this.formBuilder.group({
//     first_name: ['', Validators.required],
//     last_name: ['', Validators.required],
//     email: ['', Validators.required],
//     department:['',Validators.required],
//     phone:['',Validators.required],
//     role:[''],
//     gender:['',Validators.required]

// });


this.service.getbirthdarmessages().subscribe(
  res => {
        this.messagesdataSource=res;
        console.log(this.messagesdataSource)
    
  },
 
  err => console.error(err),
 
  () => console.log('There is an error')
);
this.service.getsendbirthdarmessages().subscribe(
  res => {




        this.deliveredmessagesdataSource=res;
        console.log(this.deliveredmessagesdataSource)
        this.ngOnInit()
    
  },
 
  err => console.error(err),
 
  () => console.log('There is an error')
);
  this.service.birthdayMonth().subscribe(
    res => {
          this.dataSource=res;
          console.log(this.dataSource)
      
    },
   
    err => console.error(err),
   
    () => console.log('There is an error')
  );





  }
  ComposeNew(){
    this.addModal.show()
  }
  onFileChange(event) {
    const reader = new FileReader();
 
    
    // const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageSrc = reader.result as string;
     
        this.registerForm.patchValue({
          fileSource: reader.result
        });
   
      };
   
  
  }
    
    
      } 
      NewMessage(){
         if(this.registerForm.valid)
         {
         console.log(this.registerForm.value)
         this.service.createnewmessage(this.registerForm.value).subscribe(
          res => {
          this.toastr.success('success','Birthday Message Created')
          console.log(res)
          this.addModal.hide()
          this.ngOnInit()
     
            
          },
         
          err => console.error(err),
         
          () => console.log('There is an error')
        );
         }
      




      }
      clickRow(item){
        console.log(item)
        let data={
          phone:this.selected.phone,
          email:this.selected.email,
          first_name:this.selected.first_name,
          dob:this.selected.dob,
          age:this.selected.age,
        }
        console.log(data)
        this.service.sendsmsforbirthday(data).subscribe(
          res => {
          this.toastr.success('success','Birthday Message Send')
          console.log(res)
          
         



      },err => console.error(err),
         
      () => console.log('There is an error')
    );

    }
    Edit(){
      console.log(this .selectedd)
      this.userModal.show()
    
    }
    // updateMessange()
    updateMessange(){
      console.log(this .selectedd)
      this.service.updatebirthdaymessage(this.selectedd).subscribe(
        res => {
        this.toastr.success('success','Birthday Message Updated')
        this.userModal.hide()
        console.log(res)
        
       



    },err => console.error(err),
       
    () => console.log('There is an error')
  );

      // this.userModal.show()
    
    }
}
