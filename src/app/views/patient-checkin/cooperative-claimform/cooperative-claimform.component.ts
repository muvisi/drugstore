import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cooperative-claimform',
  templateUrl: './cooperative-claimform.component.html',
  styleUrls: ['./cooperative-claimform.component.scss']
})
export class CooperativeClaimformComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  Aarform(){

    this.router.navigate(['/dashboard/AAR/Claimform'])
    // this.router.navigate(['/dashboard/calendar/',this.selected.specialist])
  }
  printPage() {
    window.print();
  }

}
