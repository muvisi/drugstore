import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../service.service';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  visits;
  name;
  patientNumber;
  visitNumber;
  searchText;
  phone;
  constructor(public service: ServiceService, public navCtrl: NgxNavigationWithDataComponent) { }

  ngOnInit() {
    this.visits = [];
    this.patientsList();

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

patientsList() {
   this.service.getTreatments().subscribe((res) => {
    //  console.log(res);
     this.visits = res.results;
   }
   );
}
billPatient(item) {
console.log(item.visit_no);
  this.navCtrl.navigate('/dashboard/patients/bill-patient', { data: item.visit_no});
}
}
