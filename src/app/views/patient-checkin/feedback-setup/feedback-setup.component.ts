import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl,FormArray} from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../../service.service';

@Component({
  selector: 'app-feedback-setup',
  templateUrl: './feedback-setup.component.html',
  styleUrls: ['./feedback-setup.component.scss']
})
export class FeedbackSetupComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  Columns: string[] = ['sn','category','subcategory','question','createdby','update','delete']
  loading: boolean;
  submitted;
  category: any;
  subcategory: any;
  categories: any;
  subcategories: any;
  questions: any;
  compliment: any;
  issue: any;
  compliments: any;
  issues: any;
  feedbackForm: FormGroup;
  editfeedbackForm:FormGroup;
  categoryForm: FormGroup;
  @ViewChild('addQuestion', { static: false }) addQuestion: ModalDirective;
  @ViewChild('editQuestion', { static: false }) editQuestion: ModalDirective;
  @ViewChild('categoryModal', { static: false }) categoryModal: ModalDirective;
  @ViewChild('subCategoryModal', { static: false }) subCategoryModal: ModalDirective;
  @ViewChild('complimentModal', { static: false }) complimentModal: ModalDirective;
  @ViewChild('issueModal', { static: false }) issueModal: ModalDirective;
  search: any;


  
  constructor( private service:ServiceService,private toast:ToastrService,private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.initialize()

    this.feedbackForm = this.formBuilder.group({
      category: ['', Validators.required],
      subcategory: ['', Validators.required],     
      question: ['', Validators.required],
      issues: ['', Validators.required],
      compliments: ['', Validators.required]
    })
    this.editfeedbackForm = this.formBuilder.group({
      category: ['', Validators.required],
      id: ['', Validators.required],
      subcategory: ['', Validators.required],     
      question: ['', Validators.required],
      issues: ['', Validators.required],
      compliments: ['', Validators.required]
    })

    this.categoryForm= this.formBuilder.group({
      name: ['', Validators.required],
      visit_type: ['OUTPATIENT', Validators.required]
    })
  }


  initialize(){
    this.getCategories();
    this.getSubCategories();
    this.getQuestions();
    this.getCompliments();
    this.getIssues();
  }

  get f() { return this.feedbackForm.controls; } 
  get c() { return this.categoryForm.controls; } 

  getCategories(){this.service.getFeedbackCategory().subscribe(res=>{this.categories=res;},err=>{})}
  getSubCategories(){this.service.getFeedbackSubCategory().subscribe(res=>{this.subcategories=res;},err=>{})}
  getCompliments(){this.service.getFeedbackCompliments().subscribe(res=>{this.compliments=res;},err=>{})}
  getIssues(){this.service.getFeedbackIssues().subscribe(res=>{this.issues=res;},err=>{})}
  getQuestions(){this.service.getFeedbackQuestion().subscribe(res=>{this.questions = new MatTableDataSource(res);this.questions.paginator = this.paginator;},err=>{})}
  filterQuestions(){this.service.filterFeedbackQuestion(this.search).subscribe(res=>{this.questions = new MatTableDataSource(res);this.questions.paginator = this.paginator;},err=>{})}
  


  submitCategory(){
    this.loading=true;
    this.service.submitFeedbackCategory(this.categoryForm.value).subscribe(res=>{
      this.loading=false;
      this.toast.success("Successfully added")
      this.getCategories()
      this.categoryModal.hide()
      this.categoryForm.reset()
    },err=>{
      this.loading=false;
      this.toast.warning("failed")
    })

  }
  submitSubCategory(){
    this.loading=true;
    this.service.submitFeedbackSubCategory({name:this.subcategory}).subscribe(res=>{
      this.loading=false;
      this.toast.success("Successfully added")
      this.getSubCategories()
      this.subCategoryModal.hide();
      this.subcategory="";
    },err=>{
      this.loading=false;
      this.toast.warning("failed")
    })

  }


  submitCompliment(){
    this.loading=true;
    this.service.submitFeedbackCompliment({name:this.compliment}).subscribe(res=>{
      this.loading=false;
      this.toast.success("Successfully added");
      this.getCompliments();
      this.complimentModal.hide();
      this.compliment="";
    },err=>{
      this.loading=false;
      this.toast.warning("failed")
    })
    }
    submitIssue(){
      this.loading=true;
      this.service.submitFeedbackIssue({name:this.issue}).subscribe(res=>{
        this.loading=false;
        this.toast.success("Successfully added");
        this.getIssues();
        this.issueModal.hide();
        this.issue="";
      },err=>{
        this.loading=false;
        this.toast.warning("failed")
      })
      }


      submitQuestion(){
        this.service.submitFeedbackQuestion(this.feedbackForm.value).subscribe(res=>{
          this.loading=false;
          this.toast.success("Successfully added");
          this.getQuestions();
          this.feedbackForm.reset();
          // this.addQuestion.hide();
        },err=>{
              this.loading=false;
          this.toast.warning("failed")
        });      
      }
      updateQuestion(){
        var data=this.feedbackForm.value;
        this.service.updateFeedbackQuestion(data.id,this.feedbackForm.value).subscribe(res=>{
          this.loading=false;
          this.toast.success("Successfully added");
          this.getQuestions();
          this.feedbackForm.reset();
          // this.addQuestion.hide();
        },err=>{
              this.loading=false;
          this.toast.warning("failed")
        });  
      }

      update(item){
        this.editfeedbackForm.patchValue(item);
        this.editQuestion.show()
      }
     
}
