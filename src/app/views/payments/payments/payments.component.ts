import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  user = JSON.parse(sessionStorage.getItem('user'));
  constructor() { }

  ngOnInit() {
  }

}
