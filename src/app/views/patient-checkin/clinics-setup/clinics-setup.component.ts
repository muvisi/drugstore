import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl,FormArray} from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { PopupOpenEventArgs } from '@syncfusion/ej2-angular-schedule';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../../service.service';

@Component({
  selector: 'app-clinics-setup',
  templateUrl: './clinics-setup.component.html',
  styleUrls: ['./clinics-setup.component.scss']
})
export class ClinicsSetupComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  Columns: string[] = ['sn','type','name','description','createdby','update','calendar','delete']
  loading: boolean;
  submitted;



selectedDate: Date = new Date();

weekdays=[]
offdays=[]
currentView="Month"

  clinicForm: FormGroup;
  editClinicForm:FormGroup;
  typeForm: FormGroup;
  @ViewChild('editClinic', { static: false }) editClinic: ModalDirective;
  @ViewChild('typeModal', { static: false }) typeModal: ModalDirective;
  @ViewChild('calendarModal', { static: false }) calendarModal: ModalDirective;
  search: any;
  clinics_type: any;
  clinics_list=[];
  clinics: MatTableDataSource<any>;
  

  counsolers: any;
  selected_clinic_name: any;
  selected_clinic_id: any;

  
  constructor( private service:ServiceService,private toast:ToastrService,private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.initialize()

    this.clinicForm = this.formBuilder.group({
      type: ['', Validators.required],
      name: ['', Validators.required],  
      session_duration: ['30', Validators.required],     
      description: [''],
    })
    this.editClinicForm = this.formBuilder.group({
      type: ['', Validators.required],
      id: ['', Validators.required],
      session_duration: ['30', Validators.required], 
      name: ['', Validators.required],     
      description: [''],
    })

    this.typeForm= this.formBuilder.group({
      name: ['', Validators.required]
    })
  }


  initialize(){
    this.getClinicTypes();
    this.getClinics();
    
  }

  get f() { return this.clinicForm.controls; } 
  get t() { return this.typeForm.controls; } 

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
      updateClinic(){
        this.loading=true;
        this.service.updateClinics(this.editClinicForm.value).subscribe(res=>{
          this.loading=false;
          this.toast.success("Successfully added");
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
        this.service.deleteclinic(item).subscribe(res=>{
          this.loading=false;
          this.toast.success("Successfully deleted");
          this.getClinicTypes();
        },err=>{
              this.loading=false;
          this.toast.warning("failed")
        });  
      }
      showCalendar(element){
        this.calendarModal.show()
      }

      public isWorkDay(date: Date){
        if (this.checkOffdays(date)) {
          return false;
        } else{
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
      addOffdays(date){
        var t=(date.getMonth()+1).toString()+"/"+date.getDate().toString()+"/"+date.getFullYear().toString()
        this.offdays.push(t)
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
          this.addWeekdayInOffday(item)
        }else{
          this.weekdays.push(item)
          this.removeWeekdayFromOffdays(item)
    
        }
      }
    
      addWeekdayInOffday(item){
        let today=new Date()
        console.log(today);
        console.log(today.getDate().toString())
        for(var i=0;i<32;i++ ){
          try{
            var date=new Date((today.getMonth()+1).toString()+"/"+i.toString()+"/"+today.getFullYear().toString())
          
            if(date.getDay()==item){
              
                this.addOffdays(date);
            }
    
          }catch(err){
    
          }
        }
        console.log(this.offdays);
      }
      removeWeekdayFromOffdays(item){
        let today=new Date()
        console.log(today);
        console.log(today.getDate().toString())
        for(var i=0;i<32;i++ ){
          try{
            var date=new Date((today.getMonth()+1).toString()+"/"+i.toString()+"/"+today.getFullYear().toString())
            if(date.getDay()==item){              
                this.removeOffdays(date);
            }    
          }catch(err){    
          }
        }
        console.log(this.offdays);
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
        if(this.checkOffdays(date)){
          this.removeOffdays(date)
        }else{
          this.addOffdays(date)
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
          offdays:this.offdays
          
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
     
}
