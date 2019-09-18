import { Component, OnInit } from '@angular/core';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { ServiceService } from '../../../service.service';

@Component({
  selector: 'app-batch-detail',
  templateUrl: './batch-detail.component.html',
  styleUrls: ['./batch-detail.component.scss']
})
export class BatchDetailComponent implements OnInit {
  batchId;
  batch;
  batchClaims = [];
  unmatchedCount = 0;
  uncodedCount = 0;
  successfulCount = 0;
  amountConflicting = 0;
  uncodedClaims = [];
  unmatchedClaims = [];
  amountConflictingClaims = [];
  successfulBatchedClaims = [];
  showDispatchButton = false;
  constructor(public navCtrl: NgxNavigationWithDataComponent, public service: ServiceService) {
    this.batchId = this.navCtrl.get('id');
   }

  ngOnInit() {
    this.batchDetails();
  }
batchDetails() {
this.service.batchDetails(this.batchId).subscribe((res) => {
this.batchClaims = res.batchclaim;
this.batchId = res.id;
this.batch = res;
  const vm = this;
  for (let i = 0; i < vm.batchClaims.length; i++) {
    if (vm.batchClaims[i].errors !== null) {
      this.showDispatchButton = true;
    }
    if (vm.batchClaims[i].errors === null) {
      vm.successfulCount++;
      vm.successfulBatchedClaims.push(vm.batchClaims[i]);
    }
    if (vm.batchClaims[i].errors === 'Uncoded') {
      vm.uncodedCount++;
      vm.uncodedClaims.push(vm.batchClaims[i]);
    }
    if (vm.batchClaims[i].errors === 'Unmatched') {
      vm.unmatchedCount++;
      vm.uncodedCount++;
      vm.unmatchedClaims.push(vm.batchClaims[i]);
      vm.uncodedClaims.push(vm.batchClaims[i]);
    }
    if (Math.abs(vm.batchClaims[i].amount_conflict) > 5) {
      vm.amountConflicting++;
      vm.amountConflictingClaims.push(vm.batchClaims[i]);
    }
  }
});
}
claimDetails(item) {
  console.log(item);
  this.navCtrl.navigate('/dashboard/claims/claim-detail', { id: item.claim.id });
}
sendBatch() {
console.log(this.batchId);
this.service.sendBatch({'batch_id': this.batchId }).subscribe((res) => {
  console.log(res);
});
}
}
