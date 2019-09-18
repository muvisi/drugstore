import { Component, OnInit, ViewChild} from '@angular/core';
import { ServiceService } from '../../../service.service';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
@ViewChild('passwordModal', {static: true}) passwordModal: ModalDirective;
  patient;
  bills;
  pin;
  name;
  isMpesa = false;
  isCash = false;
  isInsurance = false;
  mpesa: any = {};
  cash = 0;
  status = false;
  valid = false;
  insureCheck: any = [];
  total = 0;
  amount = 0;
  selectedMember: any = { };
  constructor(public service: ServiceService, private router: Router,
    public navCtrl: NgxNavigationWithDataComponent, private toastr: ToastrService) {
  this.patient = this.navCtrl.get('data');
  console.log('wwwww', this.patient);
  }

  ngOnInit() {
    this.billedServices();
    this.insureChecks();
    this.mpesa.amount = 0;
  }
  searchName() {
    if (this.name !== '') {
      this.insureCheck = this.insureCheck.filter(res => {
        return res.member_data.name.toLowerCase().match(this.name.toLowerCase());
      });
    } else {
      this.ngOnInit();
    }
  }
  hideModal(): void {
    this.passwordModal.hide();
  }
  onCash() {
    this.isCash = !this.isCash;
    if (this.cash > 0) {
      this.cash = 0;
    }
    this.calculate();
  }
  onMpesa() {
    this.isMpesa = !this.isMpesa;
    if (this.mpesa.amount > 0) {
      this.mpesa.amount = 0;
    }
    this.calculate();
  }
  onInsurance() {
    this.isInsurance = !this.isInsurance;
  }
calculate() {
  console.log('ssss');
  if (Object.keys(this.mpesa).length === 0) {
    const sub = this.cash + this.amount;
    if (sub >= this.total) {
      this.status = true;
    } else {
      this.status = false;
    }
  } else {
      const sub = this.amount + this.cash + this.mpesa.amount;
      if (sub >= this.total) {
      this.status = true;
     } else {
        this.status = false;
     }
  }
}
  billedServices() {
    const data = {
      'visit_no': this.patient.visit_no
    };
    this.service.patientBills(data).subscribe((res) => {
      console.log(res);
      this.bills = res;
      this.bills.forEach(element => {
        this.total += element.rate;
        console.log(this.total);
      });
    });
  }
 insureChecks() {
   this.service.getSearchedMembers().subscribe((res) => {
     console.log('inse', res);
     this.insureCheck = res;
   }
   );
 }
setMember(item) {
this.selectedMember = item.member_data.member_number;
this.valid = true;
}
submitPayment() {
  if (this.isMpesa && this.isCash && this.isInsurance) {
    const cash = {
      'amount': this.cash,
    };
    const data = {
      'copay': this.cash + this.mpesa.amount,
      'amount': this.amount,
      'id': this.patient.visit_no,
      'member': this.selectedMember,
      'mpesa': this.mpesa,
      'cash': this.cash
    };
    console.log('mpesa,cash and insurance', data);
    this.service.saveClaim(data).subscribe((res) => {
      console.log(res);
      this.toastr.success('Successfully Submitted Payment');
      this.router.navigateByUrl('dashboard/patient-list');
    });
  } else if (this.isCash && this.isInsurance) {
    const cash = {
      'amount': this.cash,
    };
    const data = {
      'copay': this.cash + this.mpesa.amount,
      'amount': this.amount,
      'id': this.patient.visit_no,
      'member': this.selectedMember,
      'cash': this.cash
    };
    console.log('cash and insurance', data);
    this.service.saveClaim(data).subscribe((res) => {
      console.log(res);
      this.toastr.success('Successfully Submitted Payment');
      this.router.navigateByUrl('dashboard/patient-list');
    });
  } else if (this.isMpesa && this.isInsurance) {
    const data = {
      'copay': this.cash + this.mpesa.amount,
      'amount': this.amount,
      'id': this.patient.visit_no,
      'member': this.selectedMember,
      'mpesa': this.mpesa
    };
    console.log('mpesa and insurance', data);
    this.service.saveClaim(data).subscribe((res) => {
      console.log(res);
      this.toastr.success('Successfully Submitted Payment');
      this.router.navigateByUrl('dashboard/patient-list');
    });
  } else if (this.isInsurance) {
    const data = {
      'copay': this.cash + this.mpesa.amount,
      'amount': this.amount,
      'id': this.patient.visit_no,
      'member': this.selectedMember
    };
    console.log('insurance', data);
    this.service.saveClaim(data).subscribe((res) => {
      console.log(res);
      this.toastr.success('Successfully Submitted Payment');
      this.router.navigateByUrl('dashboard/patient-list');
    });
  } else if (this.isCash) {
    const cash = {
      'cash': {
        'amount': this.cash,
        'id': this.patient.visit_no
      }
    };
    this.service.payBill(cash).subscribe((res) => {
      console.log(res);
      this.toastr.success('Successfully Submitted Payment');
      this.router.navigateByUrl('dashboard/patient-list');
    });
  } else if (this.isMpesa && this.isCash) {
    this.mpesa.id = this.patient.visit_no;
    const data = {
      'mpesa': this.mpesa,
      'cash': {
        'amount': this.cash,
        'id': this.patient.visit_no
      }
    };
    this.service.payBill(data).subscribe((res) => {
      console.log(res);
      this.toastr.success('Successfully Submitted Payment');
      this.router.navigateByUrl('dashboard/patient-list');
    });
  } else {
    this.mpesa.id = this.patient.visit_no;
    const data  = {
      'mpesa': this.mpesa,
      'id': this.patient.visit_no
    };
    this.service.payBill(data).subscribe((res) => {
    console.log(res);
      this.toastr.success('Successfully Submitted Payment');
      this.router.navigateByUrl('dashboard/patient-list');
    });
  }
}
  // search(text) {
  //   this.service.searchMember(this.schemeId, text).subscribe((res) => {
  //     console.log('jk', res);
  //     this.members = res.results;
  //   });
  // }
}
