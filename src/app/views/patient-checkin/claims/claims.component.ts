import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../service.service';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss']
})
export class ClaimsComponent implements OnInit {
  claims;
  name;
  Search;
  patientNumber;
  visitNumber;
  searchText;
  p = 1;
  constructor(public service: ServiceService, public navCtrl: NgxNavigationWithDataComponent) { }

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
  claimDetails(item) {
    console.log(item);
    this.navCtrl.navigate('/dashboard/claims/claim-detail', { id: item.id });
  }

}
