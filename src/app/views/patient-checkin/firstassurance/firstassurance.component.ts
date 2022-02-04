import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-firstassurance',
  templateUrl: './firstassurance.component.html',
  styleUrls: ['./firstassurance.component.scss']
})
export class FirstassuranceComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  sedgrick(){

    this.router.navigate(['/dashboard/sedgrick'])
    // this.router.navigate(['/dashboard/calendar/',this.selected.specialist])
  }
  printPage() {
    window.print();
  }

}
