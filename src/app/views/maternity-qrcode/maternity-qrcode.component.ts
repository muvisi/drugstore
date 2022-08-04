// import { Component, OnInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import QrCodeWithLogo from "qrcode-with-logos";
import { FRONT_END_URL } from '../../service.service';
@Component({
  selector: 'app-maternity-qrcode',
  templateUrl: './maternity-qrcode.component.html',
  styleUrls: ['./maternity-qrcode.component.scss']
})
export class MaternityQrcodeComponent implements OnInit {
  QRCODE_DATA;
  width;
  TYPE;
  constructor(public navCtrl: NgxNavigationWithDataComponent,public router: Router) { }

  ngOnInit() {
    console.log(this.navCtrl.get('data'));
    this.width=900;
    this.QRCODE_DATA=" "
    if(this.navCtrl.get('data') !=undefined){
      this.QRCODE_DATA=this.navCtrl.get('data').url
    this.TYPE=this.navCtrl.get('data').type
  
   
    }else{

    }


    let qrcode = new QrCodeWithLogo({
   
      content: FRONT_END_URL+"maternity",
      width: 380,
      nodeQrCodeOptions:{
        color:{
            dark:"#4dbd74",
       
         light:"#FFFFFF"
        }
      },
      image: document.getElementById("image") as HTMLImageElement,
    
    });
    qrcode.toCanvas().then(() => {
      qrcode.toImage().then(() => {
        setTimeout(() => {
      
        }, 2000);
      });
    });
  }
  printPage(){
   
      window.print();
   
  
  }
  
 }
  