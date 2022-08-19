import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenGenerator } from '../../../utils/token.generator';


@Component({
  selector: 'app-feedback-maternity',
  templateUrl: './feedback-all.component.html',
  styleUrls: ['./feedback-all.component.scss']
})
export class FeedbackQuestionsComponent implements OnInit {


req_data=[];
l;
phone;

@ViewChild('stepper',{static:true}) private stepper: MatStepper
rating=0;

loading: boolean;
show_phone: boolean;
recommendation_color='#007dc3'
recommendation_rating: number;
show_rating_type='initial'; 
questions=[];
  channel: any;
  feedback_token: string;
  skipped=[]
constructor(private route: ActivatedRoute,private formBuilder: FormBuilder,public service:ServiceService,public router:Router,public toast:ToastrService,@Inject(DOCUMENT) private document: Document) { }

ngOnInit() {

  this.feedback_token=new TokenGenerator().generate_token(30)

  this.route.data.subscribe(data => {
    if (data.channel){
    this.channel=data.channel;
  }
})

  this.service.getFeedbacksCategoryQuestions(this.route.snapshot.params.category).subscribe(res=>{
  this.l=res.length-1
  for(var i=0;i<res.length;i++){
    var d=Object.assign(res[i],{selected_issues:[],
      selected_compliments:[],
      show_issues:false,
      show_compliments:false
      ,comment:''})
    this.questions.push(d)
  }
  },err=>{})

   



  if(this.route.snapshot.params.token){
    if(localStorage.getItem('TOKEN')==this.route.snapshot.params.token &&  localStorage.getItem('FEEDBACK')=='false'){

      this.router.navigateByUrl('/')
    }
  this.load_patient_phone();
  }else{
    // var t=localStorage.getItem('TRACKING_TOKEN');    
    // if (t==no)
    this.show_phone=true;
  }
}
submitPhone(){
  this.loading=true;
  this.service.confirmPhone({phone:this.phone}).subscribe(
    (res)=>{
      this.loading=false;
      if (res.exists){  
        this.stepper.next();
      }else{
        this.stepper.next();

        // this.toast.warning("Patient Does Not Exist")
        // this.router.navigateByUrl('/')
      }
    },
    (err)=>{
      this.loading=false;
      this.toast.error("Application Error")
    }
  )  

}

load_patient_phone(){  
  this.service.getFeedBackLink(this.route.snapshot.params.token).subscribe((res)=>{
  
    this.phone=res.phone;
  })
 }
submitRating(i,item,final){ 
  this.req_data[i]={
    department:item.subcategory_name,
    rating:item.rating,
    type:item.category_name,
    issues:item.selected_issues.toString(),
    compliments:item.selected_compliments.toString(),
    comment:item.comment,
  }
if(final){
  this.submitAllRating(); 
}else{
  this.stepper.next()
}
}


submitAllRating(){
 
  for (var x =0;x<this.skipped.length;x++)
  {
    this.req_data.splice(x,1)
  }

  var t=localStorage.getItem('TRACKING_TOKEN');    
  this.loading=true;
  var d=Object.assign({"services":this.req_data},{"token":t,"phone":this.phone,"visit_type":this.questions[0].visit_type,'recommendation_rating':this.recommendation_rating,channel:this.channel,feedback_token:this.feedback_token})
  this.service.feedback(Object.assign(d)).subscribe((res)=>{
    this.loading=false;
    if(res.status){
      localStorage.setItem('FEEDBACK','false')
      this.toast.success('Successfully!', 'Sent successful!')
    }else{
      this.toast.error('Failed!', 'Not Successful')
    }
    
  },(err)=>{
    this.loading=false;
    this.toast.error('Failed!', ' Failed!')
  });
}

finish(){
  this.submitAllRating(); 
}



rateClicked(rating: number,item): void {
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
recommendation(rating: number){
  this.recommendation_rating=rating;
  console.log(rating)
 if (rating<6){
   this.show_rating_type='low';
  //  this.recommendation_color="#dc3545"
 }else if(rating>=6 && rating<9){
  this.show_rating_type='middle';
  // this.recommendation_color="#ffc107"
 }else{
  this.show_rating_type='high';
  // this.recommendation_color="#28a745"
 }
}
Skip(i){
this.skipped.push(i)

}


}
