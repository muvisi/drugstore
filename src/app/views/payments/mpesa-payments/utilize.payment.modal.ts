import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ServiceService } from '../../../service.service';
@Component({
    template: `
      <div class="modal-header">
        <h4 class="modal-title">Payment Utilization</h4>
        <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('')"></button>
      </div>
      <div class="modal-body">
       <div class="col-sm-12">
       <div class="row">
            <mat-form-field  appearance="outline">
            <mat-label>Enter Encounter Number/Visit Number</mat-label>
                        <input matInput placeholder="Enter Visit Number" (change)="visitNumberChange()" required="true" [(ngModel)]="encounter_number" [ngbTypeahead]="search" [resultFormatter]="formatter">
                       
                </mat-form-field>
        </div>
        <div class="row">
        <mat-form-field  appearance="outline">
        <mat-label>Enter Invoice Number</mat-label>
                    <input matInput placeholder="Enter Invoice Number"  required="true" [(ngModel)]="invoice_number" >
                   
            </mat-form-field>
      </div>
        <div class="row">
        <mat-form-field  appearance="outline">
        <mat-label>Reference</mat-label>
                    <input matInput placeholder="Reference" required="true" [(ngModel)]="reference" readonly>
                   
            </mat-form-field>
        </div>
        <div class="row">
        <mat-form-field  appearance="outline">
        <mat-label>Amount</mat-label>
                    <input matInput placeholder="Amount" type="number" required="true" [(ngModel)]="amount">
                   
            </mat-form-field>
    </div>
       </div>
      </div>
      <div class="modal-footer">
    <div class="row">
        <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')" style="margin-right:30px">Close</button>
        <button class="btn btn-success btn-sm" (click)="utilizePayment()"  style="margin-right:30px">Utilize</button>
        </div>
      </div>
    `
  })
  export class UtilizePaymentModal implements OnInit {
    amount: any;
  invoice_number: any;
    constructor( public activeModal: NgbActiveModal,private serviceService: ServiceService,private toast:ToastrService) {}
    reference;
  
    encounter_number;
    
    encounters=[];
    department;
    departments=["OBSTETRICS & GYNAECOLOGY","PHYSIOTHERAPY","CARDIOLOGY"]


    formatter = (result: string) => result.toUpperCase();

    search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map(term => term === '' ? []
          : this.encounters.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
      )
    @Input() public item;
    @Output() utilizeEmitter: EventEmitter<any> = new EventEmitter();


    ngOnInit(): void {
      this.reference=this.item.MpesaReceiptNumber;
      this.amount=this.item.Amount;
      this.serviceService.getVisitNumbers().subscribe((res)=>{
        for(var i=0;i < res.length;i++){
         
           this.encounters.push(res[i].visit_number.concat(" ").concat("(",res[i].patient.first_name).concat(" ",res[i].patient.last_name).concat(")"));
          }
      
      // console.log("visit numbers",this.encounters)
      
      
      },(err)=>{});
    }
    open() { }

    visitNumberChange(){
      let temp=this.encounter_number;
      console.log("hehehe")
      if (temp.split(" (").length>1){
        console.log(temp.split(" (")[0])
        this.encounter_number=temp.split(" (")[0]
        console.log(this.encounter_number)
      }
    }
    utilizePayment(){
        if (this.encounter_number==null || this.encounter_number=='' || this.amount==null || this.amount==''|| this.amount==0 || this.reference==''|| this.invoice_number==null || this.invoice_number==''){
            this.toast.warning("Empty Field");
            return
        }
        this.serviceService.utilizePayment([{visit_number:this.encounter_number,invoice_number:this.invoice_number,amount:this.amount,reference:this.item.MpesaReceiptNumber}]).subscribe((res)=>{
            this.toast.success("Successfully Utilized");
            this.utilizeEmitter.emit({status:true});
            this.activeModal.close({status:true});
        },(err)=>{
            this.toast.error("Failed to Utilized")
        })
    }
  }