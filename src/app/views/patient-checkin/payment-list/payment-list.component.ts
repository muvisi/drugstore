import { Component, OnInit } from '@angular/core';
import { ServiceService} from '../../../service.service';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  visits: any = [];
  name;
  patientNumber;
  visitNumber;
  searchText;
  phone;
  constructor(private service: ServiceService, public navCtrl: NgxNavigationWithDataComponent) { }

  ngOnInit() {
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
  patientPayment(item) {
    console.log(item);
    this.navCtrl.navigate('/dashboard/payments', { data: item });
  }
}
