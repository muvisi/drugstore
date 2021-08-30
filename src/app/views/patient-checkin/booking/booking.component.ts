import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  user = JSON.parse(sessionStorage.getItem('user'));
  constructor() { }

  ngOnInit() {
  }

}
