import { Component, OnInit } from '@angular/core';
@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user = JSON.parse(sessionStorage.getItem('user'));
  // user = JSON.parse(sessionStorage.getItem('user'));
  constructor() {
  }

  ngOnInit(): void {
   
  }
 
}
