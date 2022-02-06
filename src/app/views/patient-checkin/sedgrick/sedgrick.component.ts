import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sedgrick',
  templateUrl: './sedgrick.component.html',
  styleUrls: ['./sedgrick.component.scss']
})
export class SedgrickComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  APA(){

    this.router.navigate(['/dashboard/APA'])
  }
  printPage() {
    window.print();
  }


}
