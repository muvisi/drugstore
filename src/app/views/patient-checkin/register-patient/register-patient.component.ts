import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ServiceService } from '../../../service.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.scss'],
  providers: [DatePipe]
})


export class RegisterPatientComponent implements OnInit {
  @ViewChild('childModal', {static: true}) childModal: ModalDirective;
  @ViewChild('staticModal', {static: true}) staticModal: ModalDirective;
  @ViewChild('priorityModal', {static: true}) priorityModal: ModalDirective;
  searchText;
  patientNumber;
  visitNumber;
  phone;
  name;
  visit_type;
  selectedPatient;
  valid;
  Users = {};
  patient_number;
  visit_number;
  visits = [];
  constructor(private datePipe: DatePipe, public service: ServiceService, public toastr: ToastrService,
  public navCtrl: NgxNavigationWithDataComponent) {

  }

  ngOnInit() {
  this.valid = false;
  this.encounter();
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

 patientDetails(item)  {
this.navCtrl.navigate('/dashboard/patients/treatment', { id: item.visit_no});
}
setPatient(item) {
this.selectedPatient = item.patient.patient_no;
console.log(this.selectedPatient);
}
setVisit(visit) {
  this.visit_type = visit;
  this.staticModal.hide();
  console.log(this.visit_type);
  this.priorityModal.show();
}
newVisit(arg) {
 const data = {
   'patient_no': this.selectedPatient,
   'priority': arg,
   'visit_type': this.visit_type
 };
 console.log(data);
this.service.revisit(data).subscribe((res) => {
  console.log(res);
  this.navCtrl.navigate('/dashboard/patients/triage', { id: res});
}
);
}
encounter() {
  this.service.patientVisit().subscribe((res) => {
    this.visits = res.results;
  });
  }

}
