import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../../service.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-batching',
  templateUrl: './batching.component.html',
  styleUrls: ['./batching.component.scss']
})
export class BatchingComponent implements OnInit {
  @ViewChild(ModalDirective, {'static': true}) staticModal: ModalDirective;
  claims;
  name;
  Search;
  patientNumber;
  visitNumber;
  searchText;
  batchClaims: any = [];
  total;
  constructor(public service: ServiceService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getClaims();
  }

  SearchName() {
    if (this.name !== '') {
      this.claims = this.claims.filter(res => {
        return res.member.toLowerCase().match(this.name.toLowerCase());
      });
    } else {
      this.ngOnInit();
    }
  }

  SearchVisit() {
    if (this.visitNumber !== '') {
      this.claims = this.claims.filter(res => {
        return res.visit_no.match(this.visitNumber);
      });
    } else {
      this.ngOnInit();
    }
  }
claimsCheck() {
const len = this.batchClaims.length;
if (len === 0) {
this.staticModal.hide();
}
}
  SearchByPatient() {
    if (this.patientNumber !== '') {
      this.claims = this.claims.filter(res => {
        return res.patient.patient_no.match(this.patientNumber);
      });
    } else {
      this.ngOnInit();
    }
  }

  getClaims() {
    this.service.getClaims().subscribe((res) => {
      this.claims = res.results;
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
    console.log('Read', this.batchClaims);
    this.service.createBatch(this.batchClaims).subscribe((res) => {
      console.log(res);
      this.toastr.success('Successfully created Batch');
      this.staticModal.hide();
      this.batchClaims = [];

    });
  }
  // this.navCtrl.navigate('/dashboard/eclaims-dashboard/batch-details', { id: item.id });

}
