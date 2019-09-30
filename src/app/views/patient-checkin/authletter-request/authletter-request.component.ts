import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../service.service';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
@Component({
  selector: 'app-authletter-request',
  templateUrl: './authletter-request.component.html',
  styleUrls: ['./authletter-request.component.scss']
})
export class AuthletterRequestComponent implements OnInit {
  requests;
  constructor( public service: ServiceService, public navCtrl: NgxNavigationWithDataComponent) { }

  ngOnInit() {
    this.insureCheck();
  }
  insureCheck() {
    this.service.getSearchedMembers().subscribe((res) => {
      this.requests = res;
      console.log(res);
    });

}
details(item){
this.navCtrl.navigate('dashboard/authletter', {data : item});
}
}
