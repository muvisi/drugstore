import {Component, OnInit} from '@angular/core';
import { ServiceService } from '../../../service.service';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.scss']
})
export class PharmacyComponent implements OnInit {
  prescriptions = [];
  text;
  constructor(private service: ServiceService, private navCtrl: NgxNavigationWithDataComponent) { }

  ngOnInit() {
    this.getPrescription();
  }
  getPrescription(){
    this.service.allPatientsPrescription().subscribe((res)=>{
      this.prescriptions = res.results;
    });
  }
 onVisit(item){
   console.log(item.item);
   this.navCtrl.navigate('/dashboard/pharmacy/patient-prescription',{data : item.item})
 }
}
