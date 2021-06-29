import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../../service.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
@Component({
  selector: 'app-batching',
  templateUrl: './batching.component.html',
  styleUrls: ['./batching.component.scss']
})
export class BatchingComponent implements OnInit {
  @ViewChild(ModalDirective, {'static': true}) staticModal: ModalDirective;
  dataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['select', 'member', 'patient_number', 'visit_number','insurance_company','member_number','visit_type','amount'];
  claims;
  name;
  Search;
  patientNumber;
  visitNumber;
  searchText;
  batchClaims: any = [];
  total;
  constructor(public service: ServiceService, private toastr: ToastrService,public router:Router) { }

  ngOnInit() {
    this.getClaims();
  }

claimsCheck() {
const len = this.batchClaims.length;
if (len === 0) {
this.staticModal.hide();
}
}
applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

  getClaims() {
    this.service.getClaims().subscribe((res) => {
      this.claims = res.results;
      this.dataSource = new MatTableDataSource(this.claims);
      this.dataSource.paginator = this.paginator;
    }
    );
  }
  exist(claim) {
    return this.batchClaims.indexOf(claim) > -1;
  }
  calculateTotal() {
    let sub_cal = 0;
    this.batchClaims.forEach(element => {
      sub_cal += element.amount;
    });
    this.total = sub_cal;
    console.log(this.total);
  }


  addClaims(claim, $event) {
    const checked = $event.checked;
    if (checked) {
      this.batchClaims.push(claim);
      console.log(this.batchClaims);
      this.calculateTotal();
    } else {
      const index = this.batchClaims.indexOf(claim);
      this.batchClaims.splice(index, 1);
      console.log(this.batchClaims);
      this.calculateTotal();
    }
  }
  saveBatch() {
    this.service.createBatch(this.batchClaims).subscribe((res) => {
      console.log(res);
      this.toastr.success('Successfully created Batch');
      this.staticModal.hide();
      this.router.navigateByUrl('/dashboard/eclaims-dashboard/batch-list');


    },(err)=>{
      console.log(err);
      this.toastr.error('Error');
    });
  }
  // this.navCtrl.navigate('/dashboard/eclaims-dashboard/batch-details', { id: item.id });

}
