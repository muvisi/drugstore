import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../../service.service';
import { TokenGenerator } from '../../../utils/token.generator';


@Component({
  selector: 'app-feedback-questions',
  templateUrl: './feedback-questions.component.html',
  styleUrls: ['./feedback-questions.component.scss']
})
export class FeedbackQuestionsComponent implements OnInit {

  AllColumns1: string[] = ['sn','date','note','user']
req_data=[];
l;
phone;
hide_feedback_question=false;
@ViewChild('stepper',{static:true}) private stepper: MatStepper
rating=0;
patient;
client_name;
client_phone;
client_email;
client_age;
client_gender;


ratingFormGroup:FormGroup;


loading: boolean;
show_phone: boolean;
recommendation_color='#007dc3'
recommendation_rating: number;
show_rating_type='initial'; 
questions=[];
  channel: any;
  feedback_token: string;
  skipped=[]
  selected_feedback: any;
  feedback_categories: any;
  take_notes={
    notes:"",
    service:"",
   
  
  }


  @ViewChild('noteModal', { static: false }) noteModal: ModalDirective;
  services=[];
  disable_save_button: boolean;
constructor(private route: ActivatedRoute,private formBuilder: FormBuilder,public router:Router,public toast:ToastrService,@Inject(DOCUMENT) private document: Document,private service:ServiceService) { }

ngOnInit() {

  this.feedback_token=new TokenGenerator().generate_token(30)

  this.route.data.subscribe(data => {
    if (data.channel){
    this.channel=data.channel;
  }
})

this.getFeedbackQuestions('outpatient');

   


this.loadPatientDetails();
this.service.getFeedbacksCategories().subscribe(res=>{
  this.feedback_categories=res;
},err=>{})




}


getFeedbackQuestions(token){
this.selected_feedback=token;
this.questions=[]
this.services=[]
  this.service.getFeedbacksCategoryQuestions(token).subscribe(res=>{
    this.l=res.length-1

    for(var i=0;i<res.length;i++){
      this.services.push(res[i].subcategory_name)
      var d=Object.assign(res[i],{selected_issues:[],
        selected_compliments:[],
        show_issues:false,
        show_compliments:false
        ,comment:''})
      this.questions.push(d)
    }
    },err=>{})
}
submitPhone(){
  this.stepper.next();
  

}


clickComplete(){
this.service.postuploadedpatientComplete(this.route.snapshot.params.id,this.take_notes).subscribe(res=>{

  this.router.navigateByUrl('dashboard/patients-upload')
},err=>{})
}




takeNote(){ 
  let data={service:this.take_notes.service,notes:this.take_notes.notes,phone:this.client_phone}
this.service.feedbackTakeNote(data).subscribe(
res => {
  this.toast.success('success','Notes successfully saved')
  
 this.take_notes.notes="";
 this.take_notes.service="";

      

  
},


);
} 


loadPatientDetails(){
  let id =this.route.snapshot.params.id;
  this.service.getPatientDetails(id).subscribe(res=>{
this.patient=res;
this.client_name=res.first_name+" "+res.last_name;
this.client_phone=res.phone;
this.client_email=res.email;
this.client_age=res.age;
this.client_gender=res.gender;
    
  },err=>{})

}

load_patient_phone(){  
  this.service.getFeedBackLink(this.route.snapshot.params.token).subscribe((res)=>{
  
    this.phone=res.phone;
  })
 }
submitRating(i,item){ 
  this.req_data[i]={
    department:item.subcategory_name,
    rating:item.rating,
    type:item.category_name,
    issues:item.selected_issues.toString(),
    compliments:item.selected_compliments.toString(),
    comment:item.comment,
    channel:"call",
    feedback_token:this.feedback_token,
    "visit_type":this.questions[0].visit_type,
    "phone":this.client_phone,
  }
  this.stepper.next()

}
next(){
this.stepper.next()
}
clickSave(){
  this.nps()
  for(var i=0;i<this.req_data.length;i++){
    this.service.feedbackRating( this.req_data[i]).subscribe(res=>{
    },err=>{
      
    })
  
  }
  this.clickComplete()
  this.disable_save_button=true;
}

submitAllRating(){
 
  for (var x =0;x<this.skipped.length;x++)
  {
    this.req_data.splice(x,1)
  }

  var t=localStorage.getItem('TRACKING_TOKEN');    
  this.loading=true;
  var d=Object.assign({"services":this.req_data},{"token":t,"phone":this.client_phone,"visit_type":this.questions[0].visit_type,'recommendation_rating':this.recommendation_rating,channel:"call",feedback_token:this.feedback_token})
  this.service.feedback(Object.assign(d)).subscribe((res)=>{
    this.loading=false;
    if(res.status){
      localStorage.setItem('FEEDBACK','false')
      this.hide_feedback_question=true;
      this.toast.success('Successfully!', 'Sent successful!')
    }else{
      this.toast.error('Failed!', 'Not Successful')
    }
    
  },(err)=>{
    this.loading=false;
    this.toast.error('Failed!', ' Failed!')
  });
}

nps(){
  let data={
    phone:this.client_phone,
  rating:this.recommendation_rating
  }
  this.service.feedbackNPS(data).subscribe(res=>{
    // this.toast.success('Successfully!', 'Sent successful!')
  },err=>{})

}



rateClicked($event,item): void {
  var rating=$event.newValue;
  item.rating=rating;
  if(rating<3){
    item.selected_issues=[];
    item.selected_compliments=[];
    item.show_issues=true;
    item.show_compliments=false;
  }else if(rating>=5){
    item.selected_issues=[];
    item.selected_compliments=[];
    item.show_issues=false;
    item.show_compliments=true;
  }else{
    item.selected_issues=[];
    item.selected_compliments=[];
    item.show_issues=false;
    item.show_compliments=false;
  }
}


addItemInList(item,items_list){
  if(items_list.indexOf(item)>-1){
    var poped_items=[];
    for(var i=0;i<items_list.length;i++){
      var c=items_list.pop();
      if(c!=item){
        poped_items.push(c);
      }
    }
    for(var i=0;i<poped_items.length;i++){
      items_list.push(poped_items[i]);
    }
    
   
  }else{
   
    items_list.push(item);
  }
}
isItemInList(item,items_list){
  if(items_list.indexOf(item)>-1){
      return true;
    }else{
      return false;
    }
}
recommendation($event:any){
  var rating=$event.newValue;
  this.recommendation_rating=rating;
  console.log(rating)
 if (rating<6){
   this.show_rating_type='low';
   this.recommendation_color="#dc3545"
 }else if(rating>=6 && rating<9){
  this.show_rating_type='middle';
  this.recommendation_color="#ffc107"
 }else{
  this.show_rating_type='high';
  this.recommendation_color="#28a745"
 }
}
Skip(i){
this.skipped.push(i)

}

SendFeedback(){

  // let data={
  //   phone:this.client_phone

  // }
 
  let data={
    phone:this.client_phone,
    type:"OUTPATIENT",
    id:this.route.snapshot.params.id
  }
  console.log(data)
this.service.Send_smsKraniumPatients(data).subscribe(res=>{
  this.toast.success('Success','Send successfully') 
  this.router.navigateByUrl('dashboard/patients-upload')

  // this.payment.hide()
},err=>{});
}


}
