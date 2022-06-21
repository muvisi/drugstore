import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ServiceService } from '../../../service.service';
@Component({
    template: `
      <div class="modal-header">
        <h4 class="modal-title">Utilizations</h4>
        <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('')"></button>
      </div>
      <div class="modal-body">
      <div class="mat-elevation-z8 table-responsive">
            <table mat-table [dataSource]="dataSource" style="width:100%">
              <ng-container matColumnDef="sn">
                <th mat-header-cell *matHeaderCellDef> No. </th>
                <td mat-cell *matCellDef="let element;let i=index"> {{i+1}} </td>
              </ng-container>            
          
              <ng-container matColumnDef="reference">
                <th mat-header-cell *matHeaderCellDef>Transaction Code</th>
                <td mat-cell *matCellDef="let element"> {{element.reference}} </td>
              </ng-container>
              <ng-container matColumnDef="visit_number">
              <th mat-header-cell *matHeaderCellDef>Visit Number</th>
              <td mat-cell *matCellDef="let element"> {{element.visit_number}} </td>
            </ng-container>
            <ng-container matColumnDef="invoice_number">
            <th mat-header-cell *matHeaderCellDef>Invoice Number</th>
            <td mat-cell *matCellDef="let element"> {{element.invoice_number}} </td>
            </ng-container>
          
              <ng-container matColumnDef="amount">
                <th mat-header-cell *matHeaderCellDef>Amount</th>
                <td mat-cell *matCellDef="let element"> {{element.amount }} </td>
              </ng-container>
              <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef>Utilized Date</th>
              <td mat-cell *matCellDef="let element"> {{element.created |  date:'medium'}} </td>
            </ng-container>
          
              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
          
            <mat-paginator [pageSizeOptions]="[15,50]"
                           showFirstLastButtons 
                           aria-label="Select page of periodic elements">
            </mat-paginator>
          </div>
      </div>
      <div class="modal-footer">
    <div class="row">
        <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')" style="margin-right:30px">Close</button>
  
        </div>
      </div>
    `
  })
  export class UtilizationsModal implements OnInit {
    amount: any;
  dataSource: any;
  displayedColumns: string[] = ['sn','reference','visit_number','invoice_number', 'amount','date'];
    constructor( public activeModal: NgbActiveModal,private serviceService: ServiceService,private toast:ToastrService) {}
  

    @Input() public item;
    @Output() utilizeEmitter: EventEmitter<any> = new EventEmitter();


    ngOnInit(): void {
      this.serviceService.getUtilizations(this.item.MpesaReceiptNumber).subscribe((res)=>{
        this.dataSource = new MatTableDataSource(res);
      
      
      },(err)=>{});
    }
    open() { }

   
  }