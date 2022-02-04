import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apa-claimform',
  templateUrl: './apa-claimform.component.html',
  styleUrls: ['./apa-claimform.component.scss']
})
export class ApaClaimformComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  printPage() {
    window.print();
  }

}
