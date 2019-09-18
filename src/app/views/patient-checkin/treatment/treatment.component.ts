import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../../service.service';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';


@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.scss']
})
export class TreatmentComponent implements OnInit {
  visits;
  name;
  patientNumber;
  visitNumber;
  searchText;
  phone;
  visit_no;
  constructor(public service: ServiceService , public navCtrl: NgxNavigationWithDataComponent) { }

  ngOnInit() {
    this.visits = [];
    this.getPatients();
  }
getPatients() {
  this.service.getTreatments().subscribe((res) => {
    this.visits = res.results;
  });
}
treat(item) {

  this.navCtrl.navigate('/dashboard/patients/treatment', { id: item.visit_no});

}
  Search() {
    if (this.searchText !== '') {
      this.visits = this.visits.filter(res => {
        return res.patient.national_id.match(this.searchText);
      });
    } else {
      this.ngOnInit();
    }
  }
  SearchName() {
    if (this.name !== '') {
      this.visits = this.visits.filter(res => {
        return res.name.toLowerCase().match(this.name.toLowerCase());
      });
    } else {
      this.ngOnInit();
    }
  }

  SearchVisit() {
    if (this.visitNumber !== '') {
      this.visits = this.visits.filter(res => {
        return res.visit_no.match(this.visitNumber);
      });
    } else {
      this.ngOnInit();
    }
  }

  SearchByPatient() {
    if (this.patientNumber !== '') {
      this.visits = this.visits.filter(res => {
        return res.patient.patient_no.match(this.patientNumber);
      });
    } else {
      this.ngOnInit();
    }
  }

  SearchPhone() {
    if (this.phone !== '') {
      this.visits = this.visits.filter(res => {
        return res.patient.phone.match(this.phone);
      });
    } else {
      this.ngOnInit();
    }
  }
}
