import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';

@Component({
  selector: 'app-qrcode-download',
  templateUrl: './qrcode-download.component.html',
  styleUrls: ['./qrcode-download.component.scss']
})
export class QrcodeDownloadComponent implements OnInit {
  QRCODE_DATA;
  width;
  TYPE;
  constructor(public navCtrl: NgxNavigationWithDataComponent,public router: Router) { }

  ngOnInit() {
    this.width=900;
    this.QRCODE_DATA=" "
    if(this.navCtrl.get('data') !=undefined){
      this.QRCODE_DATA=this.navCtrl.get('data').url
    this.TYPE=this.navCtrl.get('data').type
  
   
    }else{
      this.router.navigateByUrl("dashboard")
    }

   
  }
  printPage(){
    if(this.navCtrl.get('data') !=undefined){
      window.print();
   
    }

  }
}
