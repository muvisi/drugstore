import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { ServiceService } from '../../service.service';
const role = localStorage.getItem('role');
@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data: any = [];
  constructor(public services: ServiceService, public toastr: ToastrService, public navCtrl: NgxNavigationWithDataComponent) {
  }
  role = role;
  ngOnInit(): void {
    console.log(role);
    // this.localStorage.getItem<any>('user').subscribe((user) => {
    //   this.userId = user;
    // const test = 'http://134.209.124.127:8000/users/my_qrcode/?id=' + this.userId;
    // this.url = test;
    //   });
  }
  scrub(visit) {
    console.log(visit);
    this.navCtrl.navigate('/dashboard/patient-scrubbing/', { visit: visit });
  }
}
