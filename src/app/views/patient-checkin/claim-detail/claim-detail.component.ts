import { Component, OnInit , ViewChild} from '@angular/core';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { ServiceService } from '../../../service.service';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-claim-detail',
  templateUrl: './claim-detail.component.html',
  styleUrls: ['./claim-detail.component.scss']
})
export class ClaimDetailComponent implements OnInit {
  @ViewChild(ModalDirective, { static: true}) staticModal: ModalDirective;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['sn','description', 'code', 'date'];
  sectionsColumns: string[] = ['sn','invoice_number','description','category','price','quantity','total'];
  dataSource;
  id;
  claim;
  name;
  diagnoses = [];
  claimSections = [];
  totals = [];
  icd: any = [];
  selectedIcd: any = {};
  diagnosis: any = [];
  claimId;
  loading = true;
  constructor(public service: ServiceService, public navCtrl: NgxNavigationWithDataComponent, public toastr: ToastrService,private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.claim = {}
    this.id = this.route.snapshot.params.id;
    this.claimDetail();
    this.getDiagnosis();
    }
claimDetail() {
  this.service.claimDetails(this.id).subscribe((res) => {
    this.claimId = res.id;
    this.claim = res;
    this.diagnoses = [];
    for (let i = 0; i < this.claim.claim_detail.length; i++) {
      if (this.claim.claim_detail[i].category === 'diagnosis') {
        this.diagnoses.push(this.claim.claim_detail[i]);
        console.log('diagnosis', this.diagnoses);
      }
      if (this.claimSections.indexOf(this.claim.claim_detail[i].category) > -1) {
        console.log('bugugy', this.claim.claim_detail[i]);
      } else {
        this.claimSections.push(this.claim.claim_detail[i].category);
      }
    }
    for (let i = 0; i < this.claimSections.length; i++) {
      // for(var i = 0; i < vm.claimObject.claim_detail.length; i++){

      const test = this.claim.claim_detail.filter(obj => obj.category === this.claimSections[i]);
      let tot = 0;
      for (let j = 0; j < test.length; j++) {
        tot += test[j].quantity * test[j].unit_price;
      }
      // vm.claimSections[i]+'_subtot= x;
      console.log('desc', tot);
      const data = {
        'section': this.claimSections[i],
        'sub_total': tot,
        'length': test.length
      };
      this.totals.push(data);

    }
    this.dataSource = new MatTableDataSource<any>(this.diagnoses);
    this.loading = false;
  });
}
getDiagnosis() {
  this.service.allDiagnoses().subscribe((res) => {
    console.log(res);
    this.icd = res.results;
  });
}
onSelect(item) {
this.selectedIcd = item.item;
  const data = {
    'diagnoses': [ this.selectedIcd ],
    'id': this.claimId
  };
  this.service.updateClaim(data).subscribe((res) => {
    this.claimDetail();
    this.toastr.success('successfully adeded diagnosis code');
    this.staticModal.hide();
    this.selectedIcd = {};
  });
}
search(text) {
  console.log(text);
  if ( text !== '') {
    this.service.searchDiagnosis(text).subscribe((res) => {
      this.icd = res.result;
    });
  }
}
// addDiagnosis() {
//   this.diagnosis.push(this.selectedIcd);
//   this.selectedIcd = {};
//   this.name = '';
//   console.log(this.diagnosis);
// }
// update() {
//   const data = {
//     'diagnoses': this.diagnosis,
//     'id': this.claimId
//   };
//   this.service.updateClaim(data).subscribe((res) => {
//     console.log('diagnosis saving', res);
//     this.toastr.success('successfully adeded diagnosis code');
//     this.staticModal.hide();
//     this.claimDetail();
//   });

// }
back(){
  this.navCtrl.navigate('/dashboard/claims');
}
}
