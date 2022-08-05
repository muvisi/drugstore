import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl,FormArray} from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { PopupOpenEventArgs } from '@syncfusion/ej2-angular-schedule';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../../service.service';



import {NgbTimeStruct, NgbTimeAdapter} from '@ng-bootstrap/ng-bootstrap';

const pad = (i: number): string => i < 10 ? `0${i}` : `${i}`;

@Injectable()
export class NgbTimeStringAdapter extends NgbTimeAdapter<string> {

  fromModel(value: string| null): NgbTimeStruct | null {
    if (!value) {
      return null;
    }
    const split = value.split(':');
    return {
      hour: parseInt(split[0], 10),
      minute: parseInt(split[1], 10),
      second: parseInt(split[2], 10)
    };
  }

  toModel(time: NgbTimeStruct | null): string | null {
    return time != null ? `${pad(time.hour)}:${pad(time.minute)}:${pad(time.second)}` : null;
  }
}

@Component({
  selector: 'app-clinics-setup',
  templateUrl: './clinics-setup.component.html',
  styleUrls: ['./clinics-setup.component.scss'],
  providers: [{provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter}]
})
export class ClinicsSetupComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  Columns: string[] = ['sn','branch','name','open','close','description','createdby','update','calendar','delete']
  Columns2: string[] = ['sn','branch','location','phone','email','update','delete']
  loading: boolean;
  submitted;


selectedDate: Date = new Date();

weekdays=[]
offdays=[]
workdays=[]
currentView="Month"

  clinicForm: FormGroup;
  editClinicForm:FormGroup;
  branchForm:FormGroup;
  editBranchForm:FormGroup;
  typeForm: FormGroup;
  @ViewChild('editClinic', { static: false }) editClinic: ModalDirective;
  @ViewChild('uploadDoctors', { static: false })uploadDoctors: ModalDirective;

  @ViewChild('typeModal', { static: false }) typeModal: ModalDirective;
  @ViewChild('calendarModal', { static: false }) calendarModal: ModalDirective;
  @ViewChild('branchModal', { static: false }) branchModal: ModalDirective;
  @ViewChild('editBranchModal', { static: false }) editBranchModal: ModalDirective;
  search: any;
  clinics_type: any;
  clinics_list=[];
  clinics: MatTableDataSource<any>;
  

  counsolers: any;
  selected_clinic_name: any;
  selected_clinic_id: any;
  branches: any;
  branchesDataSource: MatTableDataSource<unknown>;
  search2: any;

  
  constructor( private service:ServiceService,private toast:ToastrService,private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.initialize()

    this.clinicForm = this.formBuilder.group({
      type: ['', Validators.required],
      name: ['', Validators.required],  
      session_duration: ['30', Validators.required],  
      branch: ['', Validators.required],
      open: ['08:00:00', Validators.required],
      close: ['17:00:00', Validators.required],      
      description: [''],
    })
    this.editClinicForm = this.formBuilder.group({
      type: ['', Validators.required],
      id: ['', Validators.required],
      session_duration: ['30', Validators.required], 
      name: ['', Validators.required],  
      branch: ['', Validators.required],
      open: ['08:00:00', Validators.required],
      close: ['17:00:00', Validators.required],   
      description: [''],
    })

    this.branchForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      location: ['', Validators.required], 
      email: ['', Validators.required],  
    })
    this.editBranchForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      location: ['', Validators.required], 
      email: ['', Validators.required],  
    })

    this.typeForm= this.formBuilder.group({
      name: ['', Validators.required]
    })
  }


  initialize(){
    this.getClinicTypes();
    this.getClinics();
    this.getBranches();
    
  }

  get f() { return this.clinicForm.controls; } 
  get t() { return this.typeForm.controls; } 
  get b() { return this.branchForm.controls; } 
  get eb() { return this.editBranchForm.controls; } 

  getClinicTypes(){this.service.getClinicTypes().subscribe(res=>{this.clinics_type=res;},err=>{})}
  
  getClinics(){this.service.getClinics().subscribe(res=>{
    this.clinics = new MatTableDataSource(res);
    this.clinics.paginator = this.paginator;
    this.clinics_list=res; 
    try{
    this.selected_clinic_id=res[0].id
    this.selected_clinic_name=res[0].name
    this.getWorkdays();
    }catch(error){}
    
  },err=>{})}
  filterClinics(){this.service.filterClinics(this.search).subscribe(res=>{this.clinics = new MatTableDataSource(res);this.clinics.paginator = this.paginator;},err=>{})}
  
  filterBranch(){this.service.filterBranches(this.search2).subscribe(res=>{this.branchesDataSource = new MatTableDataSource(res);this.branchesDataSource.paginator = this.paginator;},err=>{})}

  submitType(){
    this.loading=true;
    this.service.addClinicTypes(this.typeForm.value).subscribe(res=>{
      this.loading=false;
      this.toast.success("Successfully added")
      this.getClinicTypes()
      this.typeModal.hide()
      this.typeForm.reset()
    },err=>{
      this.loading=false;
      this.toast.warning("failed")
    })

  }



  submitClinic(){
        this.service.addClinics(this.clinicForm.value).subscribe(res=>{
          this.loading=false;
          this.toast.success("Successfully added");
          this.getClinics();
          this.clinicForm.reset();
          // this.addQuestion.hide();
        },err=>{
              this.loading=false;
          this.toast.warning("failed")
        });      
      }
      updateClinic(item){
        this.editClinicForm.patchValue(item);
        this.editClinic.show();

      }
      submitupdateClinic(){
        this.loading=true;
        this.service.updateClinics(this.editClinicForm.value).subscribe(res=>{
          this.loading=false;
          this.toast.success("Successfully updated");
          this.getClinics();
          this.editClinicForm.reset();
          // this.addQuestion.hide();
        },err=>{
              this.loading=false;
          this.toast.warning("failed")
        });  
      }
    
      deleteClinic(item){      
        this.loading=true;
        this.service.deleteclinic(item.id).subscribe(res=>{
          this.loading=false;
          this.toast.success("Successfully deleted");
          this.getClinics();
        },err=>{
              this.loading=false;
          this.toast.warning("failed")
        });  
      }
      showCalendar(element){
        this.selected_clinic_id=element.id
        this.getWorkdays();
        this.calendarModal.show()
      }

       isWorkDay(date: Date){
        if (this.checkOffdays(date)){
          return false;
        }else if(!this.checkWeekdaysInList(date.getDay()) && this.checkWorkdays(date)){
          return true;
        }else if(!this.checkWeekdaysInList(date.getDay())){
          return false;
      }else{
          return true;
        }
      }
      checkOffdays(date){
          var t=(date.getMonth()+1).toString()+"/"+date.getDate().toString()+"/"+date.getFullYear().toString()
          if(this.offdays.indexOf(t)>-1){
            return true;
          }else{
            return false;
          } 
      }
      checkWorkdays(date){
        var t=(date.getMonth()+1).toString()+"/"+date.getDate().toString()+"/"+date.getFullYear().toString()
        if(this.workdays.indexOf(t)>-1){
          return true;
        }else{
          return false;
        } 
    }

      addOffdays(date){
        var t=(date.getMonth()+1).toString()+"/"+date.getDate().toString()+"/"+date.getFullYear().toString()
        this.offdays.push(t)
      }
      addWorkdays(date){
        var t=(date.getMonth()+1).toString()+"/"+date.getDate().toString()+"/"+date.getFullYear().toString()
        this.workdays.push(t)
      }
      removeOffdays(date){
        var t=(date.getMonth()+1).toString()+"/"+date.getDate().toString()+"/"+date.getFullYear().toString()
        var new_list=[]
        for (var i=0;i<this.offdays.length;i++){
          if(this.offdays[i]!=t){
            new_list.push(this.offdays[i])
          }
         
        }
        this.offdays=new_list;
    }
    removeWorkdays(date){
      var t=(date.getMonth()+1).toString()+"/"+date.getDate().toString()+"/"+date.getFullYear().toString()
      var new_list=[]
      for (var i=0;i<this.workdays.length;i++){
        if(this.workdays[i]!=t){
          new_list.push(this.offdays[i])
        }
       
      }
      this.workdays=new_list;
  }
      onPopupOpen(args: PopupOpenEventArgs){
        args.cancel = true; 
      }
      checkWeekdaysInList(item){
        
        if(this.weekdays.indexOf(item)>-1){
        
          return true;
        }else{
          return false;
        }    
      }
      weekdayChange(item){
        if (this.checkWeekdaysInList(item)){      
          this.weekdays=this.remove(item,this.weekdays)
        }else{
          this.weekdays.push(item)
    
        }
      }
    
  

    
      remove(item,itemlist){
        var new_list=[]
        for (var i=0;i<itemlist.length;i++){
          if(itemlist[i]!=item){
            new_list.push(itemlist[i])
          }
        
        }
        return new_list;
      }
    
      onCellClick(event) {
        var date = new Date(event.startTime);
        if(this.checkWeekdaysInList(date.getDay())){
          if(this.checkOffdays(date)){
            this.removeOffdays(date)
          }else{
            this.addOffdays(date)
          }
        }else{
          if(this.checkWorkdays(date)){
            this.removeWorkdays(date)
          }else{
            this.addWorkdays(date)
          }
        }
       
      }
      getWorkdays(){
        this.loading=true;
        this.service.getClinicWorkDay(this.selected_clinic_id).subscribe(res=>{
          this.loading=false;
          this.offdays=res.offdays;
          this.weekdays=res.weekdays;
    
        },err=>{
          this.loading=false;
          this.toast.warning("Failed");
        });
      }
      submitWorkdays(){
        let d={
          id:this.selected_clinic_id,
          weekdays:this.weekdays,
          offdays:this.offdays,
          workdays:this.workdays
          
        }
        this.loading=true;
        this.service.addClinicWorkDay(d).subscribe(res=>{
          this.loading=false;
          this.toast.success("Submitted successfully");
    
        },err=>{
          this.loading=false;
          this.toast.warning("Failed");
        });
      }

      submitBranch(){
        this.service.postBranches(this.branchForm.value).subscribe(
          res=>{
            
            this.toast.success("Branch Added");
            this.getBranches()
            this.branchModal.hide()

          },
          err=>{
            this.toast.error("Failed");
          }
        )

      }
      getBranches(){
        this.service.getBranches().subscribe(
          res=>{
            this.branches=res;
            this.branchesDataSource= new MatTableDataSource(res);
          },
          err=>{
            // this.toast.error("Failed");
          }
        )

      }

      editBranch(item){
        this.editBranchForm.patchValue(item);
        this.editBranchModal.show();

      }
      updateBranch(){
        this.service.updateBranches(this.editBranchForm.value).subscribe(res=>{
          this.toast.success("Updated Successfully")
        },err=>{
          this.toast.error("Error")

        })
      }
     deleteBranch(item){
       this.service.deleteBranches(item).subscribe(res=>{
         this.toast.success("Successfully deleted")
         this.getBranches();
       },err=>{})
       this.toast.error("Failed")
     }
}
