import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import QrCodeWithLogo from "qrcode-with-logos";

@Component({
  selector: 'app-maternityfeedback',
  templateUrl: './maternityfeedback.component.html',
  styleUrls: ['./maternityfeedback.component.scss']
})
export class MaternityfeedbackComponent implements OnInit {
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
      // this.router.navigateByUrl("dashboard")
    }


    let qrcode = new QrCodeWithLogo({
   
      content: "https://bookings.aarhospital.com/#/feedback-quiz-qrcode/maternity",
      width: 380,
      nodeQrCodeOptions:{
        color:{
            dark:"#4dbd74",
         //  dark:"#CD0002",#4dbd74
         //  light:"#FFFFFF"
         light:"#FFFFFF"
        }
      },
      image: document.getElementById("image") as HTMLImageElement,
     //  logo: {
     //    src: "./assets/img/avatars/images.png"
     //  }
    });
    qrcode.toCanvas().then(() => {
      qrcode.toImage().then(() => {
        setTimeout(() => {
          // qrcode.downloadImage("hello world");
        }, 2000);
      });
    });
  }
  printPage(){
    // if(this.navCtrl.get('data') !=undefined){
      window.print();
   
    // }
  }
  
 }
  