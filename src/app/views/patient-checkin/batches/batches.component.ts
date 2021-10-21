import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../../service.service';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.scss']
})
export class BatchesComponent implements OnInit {
  batches: any = [];
  dataSource;
  value;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['sn', 'status', 'no', 'unmatched','amountConflicting','uncoded','successful','length','amount','date'];
  constructor(public service: ServiceService, public navCtrl: NgxNavigationWithDataComponent,public router:Router) { }

  ngOnInit() {
    this.batchList();
  }
  batchList() {
    this.service.batches().subscribe((res) => {
      this.batches = res.results;
      const vm = this;
      for (let i = 0; i < vm.batches.length; i++) {
        vm.batches[i].name = vm.batches[i].user.name;
        vm.batches[i].successful = 0;
        vm.batches[i].uncoded = 0;
        vm.batches[i].unmatched = 0;
        vm.batches[i].amountConflicting = 0;
        for (let j = 0; j < vm.batches[i].batchclaim.length; j++) {
          if (vm.batches[i].batchclaim[j].errors === null) {
            vm.batches[i].successful++;
          }
          if (vm.batches[i].batchclaim[j].errors === 'Uncoded') {
            vm.batches[i].uncoded++;
          }
          if (vm.batches[i].batchclaim[j].errors === 'Unmatched') {
            vm.batches[i].unmatched++;
          }
          if (Math.abs(vm.batches[i].batchclaim[j].amount_conflict) > 5) {
            vm.batches[i].amountConflicting++;
          }
        }
      }
      this.dataSource = new MatTableDataSource(this.batches)
    });
  }
  batchDetails(item) {
    this.router.navigate(['/dashboard/eclaims-dashboard/batch-details',item.id]);
  }

  OnSelect(item){
    this.navCtrl.navigate('/dashboard/eclaims-dashboard/batch-details', { id: item.item.id });

  }
}
