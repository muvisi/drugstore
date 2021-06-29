import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ServiceService } from '../../../service.service';
import {MatTableDataSource} from '@angular/material/table';
import { ModalDirective } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-outpatient',
  templateUrl: './outpatient.component.html',
  styleUrls: ['./outpatient.component.scss']
})
export class OutpatientComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  @ViewChild('reasonModal', { static: true}) reasonModal: ModalDirective;
  @ViewChild('staticModal', { static: true}) staticModal: ModalDirective;
  Columns: string[] = ['sn','member_no','patient_number','visit_number','insurance','visit_type','amount','cashier','view']
  pendingColumns: string[] = ['sn','member_no','patient_number','visit_number','insurance','visit_type','amount','cashier','missing']
  completedColumns: string[] = ['sn','member_no','patient_number','visit_number','insurance','visit_type','amount','cashier']
  dataSource;
  returned;
  confirmed =[];
  reason: any = [];
  errors =[];
  reasons = [
    { id: '1', name: 'No Corporate Name' },
    { id: '2', name: 'No Authorizations for IP' },
    { id: '3', name: 'No Authorizations for OP' },
    { id: '4', name: 'No Authorizations for Dental' },
    { id: '5', name: 'No Authorizations for Maternity' },
    { id: '6', name: 'No Authorizations for Optical' },
    { id: '7', name: 'bills above 10K' },
    { id: '8', name: 'Claims has no Invoice Number' },
    { id: '9', name: 'No Invoice amount' },
    { id: '10', name: 'Missing Claim Form' },
    { id: '11', name: 'Discharge summary is for inpatient claims not found' },
    { id: '12', name: 'No Patient Name' },
    { id: '15', name: 'Patient’s signature on the claim form is missing' },
    { id: '14', name: 'Doctors Signature on the claim form is missing' },
    { id: '15', name: 'Diagnosis on the claim form is missing' },
    { id: '16', name: 'Date on the claim form is  missing' },
    { id: '17', name: 'treatment date is missing' },
    { id: '18', name: 'loss date is missing' }
  ];
  errored_claims =[];
  confirmed_claims=[];
  completed;
  id: any;
  constructor(public service:ServiceService,public toastr:ToastrService) { }
  ngOnInit() {
    this.getClaims();
    this.returnedClaims();
    this.completedClaims();
  }
  searchingPending(text){
    this.service.cashierClaimCheckingSearch(text,'outpatient').subscribe((res)=>{
      this.dataSource = new MatTableDataSource(res.results);
    })
  }
  searchStatus(text){
    this.service.getCahierClaimStatus('RETURNED',text).subscribe((res)=>{
      this.returned = new MatTableDataSource(res.results);
    })
  }
  getClaimErrors(id){
    this.service.getClaimErrors(id).subscribe((res)=>{
      this.staticModal.show();
      this.errors = res.results;
    })
  }
  getClaims(){
    this.service.getCashierClaimChecking('outpatient').subscribe((res)=>{
      this.dataSource = new MatTableDataSource(res.results);
    })
  }
  returnedClaims(){
    this.service.getCahierClaimStatus('RETURNED','outpatient').subscribe((res)=>{
      this.returned = new MatTableDataSource(res.results);
    })
  }
  completedClaims(){
    this.service.getCashierCompleted('outpatient').subscribe((res)=>{
      this.completed = new MatTableDataSource(res.results);
    })
  }
  confirmedClaims(claim, $event) {
    if ($event.checked) {
      this.confirmed_claims.push(claim.id);
      console.log('confirmed claims', this.confirmed_claims);
      const index: number = this.errored_claims.findIndex(obj => obj.id === claim.id);
      if (index !== -1) {
        this.errored_claims.splice(index, 1);
      }
      console.log('errored', this.errored_claims);
    } else {
    const index: number = this.confirmed_claims.indexOf(claim.id);
    if (index !== -1) {
        this.confirmed_claims.splice(index, 1);
        console.log(this.confirmed_claims);
    }
    }
  }

  checkReason(reason) {
    return this.reason.indexOf(reason.name) > -1;
   }
   addReason(reason, $event) {
     if ($event.checked) {
       this.reason.push(reason.name);
     } else {
       const index: number = this.reason.indexOf(reason.name);
       if (index !== -1) {
         this.reason.splice(index, 1);
       }
     }
   }
   erroredClaims(claim) {
     this.reason =[];
      this.reasonModal.show();
      this.id = claim.id;
      const index: number = this.confirmed_claims.indexOf(claim.id);
      if (index !== -1) {
        this.confirmed_claims.splice(index, 1);
        console.log('confirmed', this.confirmed_claims);
      } 
   
  }
   saveReasons() {
    const data = {
      'id': this.id,
      'reasons': this.reason
    };
    if (this.errored_claims.findIndex(obj => obj.id === this.id) === -1) {
      this.errored_claims.push(data);
      console.log('yytyd', this.errored_claims);
    } else {
      this.errored_claims.splice(this.errored_claims.findIndex(obj => obj.id === this.id), 1);
      console.log('yytyd', this.errored_claims);
      this.errored_claims.push(data);
    }
    this.reason = [];
    this.reasonModal.hide();
  }
  submit() {
    const data = {
      'errored': this.errored_claims,
      'confirmed': this.confirmed_claims
    };
    if (window.confirm("Do you really want to submit?")) {
      this.service.claimsChecking(data).subscribe((res) => {
        this.toastr.success('Successfully submitted claims actions');
        this.errored_claims = [];
        this.confirmed_claims = [];
        this.ngOnInit();
      });
    }
    
  }
   
   

}
