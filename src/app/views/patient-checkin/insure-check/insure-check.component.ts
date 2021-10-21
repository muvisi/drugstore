import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ServiceService } from '../../../service.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-insure-check',
  templateUrl: './insure-check.component.html',
  styleUrls: ['./insure-check.component.scss']
})
export class InsureCheckComponent implements OnInit {
  public model: any;
  public largeModal;
  public smallModal;
  public primaryModal;
  public successModal;
  public warningModal;
  public dangerModal;
  public infoModal;
  @ViewChild('myModal', { static: true}) myModal: ModalDirective;
  @ViewChild('childModal', { static: true }) childModal: ModalDirective;
  payers;
  schemes: any = [];
  memberId;
  payerId;
  schemeId;
  members: any = [];
  info;
  name;
  scheme;
  member;
  searchedMembers;

  constructor(public service: ServiceService, public navCtrl: NgxNavigationWithDataComponent, private router: Router) { }

  ngOnInit() {
    this.Payers();
    this.info = {};
    this.insureCheck();
  }
  details(item) {
    console.log(item);
    this.navCtrl.navigate('dashboard/member-details', { details: item});
  }
  Payers() {
    this.service.getPayers().subscribe((res) => {
      this.payers = res.results;
    }
    );
  }
  OnPayer(item) {
    console.log(item.item);
    this.payerId = item.item.id;
    this.service.getSchemes(this.payerId).subscribe((res) => {
      this.schemes = res.results;
    });
  }
  OnScheme(item) {
    this.schemeId = item.item.id;
  }
  OnMember(item) {
    this.memberId = item.item.id;
    console.log(this.memberId)
  }
  payerSearch(text) {
    console.log(text);
    this.service.searchPayers(text).subscribe((res) => {
      console.log(res);
      this.payers = res.results;
    }
    );
  }
  schemeSearch(text) {
    console.log(text);
    this.service.searchScheme(this.payerId, text).subscribe((res) => {
      console.log('scheme search results', res);
      this.schemes = res.results;
    }
    );
  }
  search(text) {
    this.service.searchMember(this.schemeId, text).subscribe((res) => {
      console.log('jk', res);
      this.members = res.results;
    });
  }
  selectedMember(item) {
    console.log(item.item);
    this.memberId = item.item.id;

  }
  selectedScheme(item) {
    const id = item.item.id;
    this.service.members(id).subscribe((res) => {
      console.log('members', res);
      this.members = res;
    });
  }
  selectedItem(item) {
    // this.clickedItem = item.item;
    const id = item.item.id;
    const data = {
      'id': id
    };
    this.service.schemes(data).subscribe((res) => {
    console.log('schemes', res);
    this.schemes = res;
    });
  }
  selectedReason(reason) {
    console.log(reason);

    this.info.id = this.memberId;
    this.info.reason = reason;
    // this.info = {
    //   'id': this.memberId,
    //   'reason': reason
    // };
    console.log('data', this.info);
    // this.myModal.hide();
  }
  view() {
    console.log('information', this.info);
    this.service.insureCheck(this.info).subscribe((res) => {
    console.log(res);
     this.myModal.hide();
     this.childModal.hide();
      // this.router.navigateByUrl('patient-checkin/member-details');
      this.navCtrl.navigate('dashboard/member-details', { details: res});
    });
  }


insureCheck() {
  this.service.getSearchedMembers().subscribe((res) => {
    this.searchedMembers = res;
    console.log(res);
  });
}
}
