import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../../service.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-bill-patient',
  templateUrl: './bill-patient.component.html',
  styleUrls: ['./bill-patient.component.scss']
})
export class BillPatientComponent implements OnInit {
  @ViewChild('mpesaModal', {'static': true}) mpesaModal: ModalDirective;
  @ViewChild('cashModal', {'static': true}) cashModal: ModalDirective;
  @ViewChild('billModal', {'static': true}) billModal: ModalDirective;
  @ViewChild('payBills', {'static': true}) payBills: ModalDirective;
  @ViewChild('confirmModal', {'static': true}) confirmModal: ModalDirective;
  @ViewChild('insuranceModal', {'static': true}) insuranceModal: ModalDirective;
  @ViewChild(MatSort, {'static': true}) sort: MatSort;
  @ViewChild('paginator', {'static': true}) paginator: MatPaginator;
  displayedColumns: string[] = ['sn','service', 'category', 'bill_number', 'invoice__no', 'rate','status'];
  benefitColumns: string[] = ['benefit', 'category', 'balance'];
  exclusionColumns: string[] = ['benefit', 'category', 'updated', 'Time'];
  services;
  dataSource;
  dataSource1;
  covered_benefits;
  memberInfo:any ={};
  name;
  status;
  user;
  total = 0;
  patient: any = {};
  pending_amount = 0;
  bill_amount = 0;
  amount = 0;
  mpesa: any = {};
  cash = 0;
  visit_no;
  isInsurance = false;
  isMpesa = false;
  isCash = false;
  memberId;
  selectedOption: any = {};
  patientInfo: any = {};
  loading = true;
  payerId: any;
  schemes=[];
  payers =[];
  schemeId: any;
  members=[];
  member;
  scheme_name;
  constructor(public service: ServiceService, public navCtrl: NgxNavigationWithDataComponent,
  private toastr: ToastrService, public router: Router) {
    this.visit_no = this.navCtrl.get('data');
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.patient = this.navCtrl.get('patient');
    console.log(this.navCtrl.get('patient'));
    if (this.patient != null) {
      this.visit_no = this.patientInfo.visit_no;
      this.memberId = this.patient.member_id;
      this.isInsurance = true;

    }
   }

  ngOnInit() {
    this.getServices();
    this.getVisitInfo();
    this.mpesa.amount = 0;
    this.getBenefits();
  
  }
  applyFilter(filterValue: string) {
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }
  applySearch(filterValue: string) {
    this.covered_benefits.filter = filterValue.trim().toLowerCase();
  }
  getBenefits() {
    this.service.benefitsListing().subscribe((res) => {
      this.dataSource1 = new MatTableDataSource<[]>(res.results);
      this.dataSource1.paginator = this.paginator;
      this.dataSource1.sort = this.sort;
    });
  }
  onCash() {
    this.isCash = !this.isCash;
    if (this.cash > 0) {
      this.cash = 0;
      this.calculate();
    }

    if (this.isCash) {
      this.calculate();
    } else {
      this.calculate();
    }
  }
  onMpesa() {
    this.isMpesa = !this.isMpesa;
    if (this.mpesa > 0) {
      this.mpesa.amount = 0;
      this.calculate();
    }
    if (this.isMpesa) {
      this.calculate();
    } else {
      this.calculate();
    }
  }
  onInsurance(){
    this.isInsurance = !this.isInsurance;
    this.calculate();
  }
  calculate() {
    if (this.isCash && !this.isInsurance && !this.isMpesa) {
      this.cash = this.pending_amount;
      this.bill_amount = this.cash;
      this.status = true;
    } else if (!this.isCash && !this.isInsurance && this.isMpesa) {
        this.mpesa.amount = this.pending_amount;
      this.bill_amount = this.mpesa.amount;
      this.cash = 0;
      this.status = true;
    } else if (!this.isCash && this.isInsurance && !this.isMpesa) {
      this.amount = this.pending_amount;
      this.bill_amount = this.amount;
      this.status = true;
    } else if(this.isCash && !this.isInsurance && this.isMpesa){
       if(this.cash > 0 || this.mpesa.amount > 0){
         this.cash = 0;
         this.mpesa.amount =0;
         this.status = false;
       }
    }else {
      this.status = false;
      this.bill_amount = this.amount + this.cash + this.mpesa.amount;
    }

  }

  submitPayment() {
    if (this.isMpesa && this.isCash && this.isInsurance) {
      const cash = {
        'amount': this.cash,
      };
      const data = {
        'copay': this.cash + this.mpesa.amount,
        'amount': this.amount,
        'id': this.patientInfo.visit_no,
        'member': this.memberId,
        'mpesa': this.mpesa,
        'cash': this.cash
      };
      console.log('mpesa,cash and insurance', data);
      this.service.saveClaim(data).subscribe((res) => {
        console.log(res);
        this.toastr.success('Successfully Submitted Payment');
        this.router.navigateByUrl('dashboard/patients/services');
      });
    } else if (this.isCash && this.isInsurance) {
      const cash = {
        'amount': this.cash,
      };
      const data = {
        'copay': this.cash + this.mpesa.amount,
        'amount': this.amount,
        'id': this.patientInfo.visit_no,
        'member': this.memberId,
        'cash': this.cash
      };
      console.log('cash and insurance', data);
      this.service.saveClaim(data).subscribe((res) => {
        console.log(res);
        this.toastr.success('Successfully Submitted Payment');
        this.router.navigateByUrl('dashboard/patients/services');
      });
    } else if (this.isMpesa && this.isInsurance) {
      const data = {
        'copay': this.cash + this.mpesa.amount,
        'amount': this.amount,
        'id': this.patientInfo.visit_no,
        'member': this.memberId,
        'mpesa': this.mpesa
      };
      console.log('mpesa and insurance', data);
      this.service.saveClaim(data).subscribe((res) => {
        console.log(res);
        this.toastr.success('Successfully Submitted Payment');
        this.router.navigateByUrl('dashboard/patients/services');
      });
    } else if (this.isInsurance) {
      const data = {
        'copay': this.cash + this.mpesa.amount,
        'amount': this.amount,
        'id': this.patientInfo.visit_no,
        'member': this.memberId
      };
      console.log('insurance', data);
      this.service.saveClaim(data).subscribe((res) => {
        console.log(res);
        this.toastr.success('Successfully Submitted Payment');
        this.router.navigateByUrl('dashboard/patients/services');
      });
    } else if (this.isCash && !this.isMpesa) {
      const cash = {
        'cash': {
          'amount': this.cash,
          'id': this.visit_no
        }
      };
      this.service.payBill(cash).subscribe((res) => {
        console.log(res);
        this.toastr.success('Successfully Submitted Payment');
        this.router.navigateByUrl('dashboard/patients/services');
      });
    } else if (this.isMpesa && this.isCash) {
      this.mpesa.id = this.visit_no;
      console.log('sawa');
      const data = {
        'mpesa': this.mpesa,
        'cash': {
          'amount': this.cash,
          'id': this.visit_no
        }
      };
      this.service.payBill(data).subscribe((res) => {
        console.log(res);
        this.toastr.success('Successfully Submitted Payment');
        this.router.navigateByUrl('dashboard/patients/services');
      });
    } else {
      this.mpesa.id = this.visit_no;
      const data = {
        'mpesa': this.mpesa,
      };
      this.service.payBill(data).subscribe((res) => {
        console.log(res);
        this.toastr.success('Successfully Submitted Payment');
        this.router.navigateByUrl('dashboard/patients/services');
      });
    }
  }
   confirm() {
     if (this.isInsurance) {
       this.confirmModal.hide();
       this.payBills.show();
     } else {
       this.confirmModal.show();
     }
   }
   openPay(item) {
      if (item === 'No') {
        this.confirmModal.hide();
        this.payBills.show();
      } else {
        this.confirmModal.hide();
        this.insuranceModal.show();
        // this.router.navigateByUrl('dashboard/patients/insure-check');
      }

   }
   payerSearch(text) {
    console.log(text);
    this.service.searchPayers(text).subscribe((res) => {
      console.log(res);
      this.payers = res.results;
    }
    );
  }
   OnPayer(item) {
    console.log(item.item);
    this.payerId = item.item.id;
    this.service.getSchemes(this.payerId).subscribe((res) => {
     this.schemes = res.results;
     console.log('wwwwww',this.schemes);
    });
  }
  OnScheme(item) {
    this.schemeId = item.item.id;
      this.service.members(this.schemeId).subscribe((res) => {
        console.log('members', res);
        this.members = res;
      });
  }
  schemeSearch(text) {
    console.log(text);
    this.service.searchScheme(this.payerId, text).subscribe((res) => {
      console.log('scheme search results', res);
      this.schemes = res.results;
    }
    );
  }
  onMember(item){
    this.service.insure_details({id:item.item.id,visit_no:this.visit_no}).subscribe((res)=>{
      console.log(res);
      this.name="";
      this.scheme_name ="";
      this.member ="";
      this.memberInfo=res;
    })
  }
  getVisitInfo() {
    if (this.visit_no == null) {
      this.router.navigateByUrl('/dashboard/patients/services');
    }
    const data = {
      'id': this.visit_no
    };
    this.service.getVisit(data).subscribe((res) => {
    this.loading = false;
    this.patientInfo = res;
    if (this.patientInfo.insure_check.length) {
      this.memberInfo = this.patientInfo.insure_check[0].data;
      this.memberId = this.memberInfo.member_number;
      console.log('xdsdd',this.memberInfo);
      this.isInsurance = true;
      this.covered_benefits = new MatTableDataSource<[]>(JSON.parse(this.memberInfo.benefits));


    }
    
    let amount = 0;
    let pend = 0;
    this.patientInfo.bills.forEach(element => {
        amount += element.rate;
        if (element.status === '0') {
          pend += element.rate;
        }
    });
    this.total = amount;
    this.pending_amount = pend;
    this.calculate();
    this.dataSource = new MatTableDataSource<[]>(this.patientInfo.bills);
    this.dataSource.sort = this.sort;
    });
  }
  getServices() {
    this.service.getServices().subscribe((res) => {
      console.log('service1111', res);
      this.services = res.results;
    });
  }
  deleteProcedure(obj) {
    console.log(obj);
    this.service.deleteBillItem(obj.id).subscribe((res) => {
      this.toastr.info('Successfuly Deleted Service');
      this.getVisitInfo();
    });
  }
  onSelect(event) {
    this.selectedOption = event.item;
    this.selectedOption.visit_no = this.visit_no;
  }
  saveService() {
    this.service.generateBill(this.selectedOption).subscribe((res) => {
      console.log(res);
      this.getVisitInfo();
      this.selectedOption = {};
      this.name = '';
      this.billModal.hide();
    });
  }
  reverseBill(item) {
    this.service.reverseBill(item).subscribe((res) => {
      console.log(res);
      this.getVisitInfo();
    });
  }

}
