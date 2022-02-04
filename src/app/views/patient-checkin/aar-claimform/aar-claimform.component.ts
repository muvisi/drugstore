import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aar-claimform',
  templateUrl: './aar-claimform.component.html',
  styleUrls: ['./aar-claimform.component.scss']
})
export class AarClaimformComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  FirstAssurance(){

    this.router.navigate(['/dashboard/FirstAssurance'])
  }
  printPage() {
    window.print();
  }

}
