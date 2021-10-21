import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { ServiceService } from '../../../service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-member-information',
  templateUrl: './member-information.component.html',
  styleUrls: ['./member-information.component.scss']
})
export class MemberInformationComponent implements OnInit {
  displayedColumns: string[] = ['benefit', 'category', 'updated', 'Time'];
  benefitColumns: string[] = ['benefit', 'category', 'balance'];
  @ViewChild('paginator' , { static: true}) paginator: MatPaginator;
  @ViewChild('paginator1', { static: true}) paginator1: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;
  benefits;
  covered_benefits: any = [];
  dataSource;
  selectedValue;
  patients: any = [];
  memberInfo: any = {};
  constructor( public navCtrl: NgxNavigationWithDataComponent, public toastr: ToastrService,
  private router: Router, public service: ServiceService) {
   }

  ngOnInit() {
    console.log('member info', this.navCtrl.get('details'));
    this.memberInfo = this.navCtrl.get('details');
    this.covered_benefits = new MatTableDataSource <[]>(this.memberInfo.member_data.benefits);
    this.covered_benefits.paginator = this.paginator;
    this.covered_benefits.sort = this.sort;
    this.getBenefits();
    this.getPatients();
  }
  treatment() {
    console.log(this.memberInfo);
    this.navCtrl.navigate('/dashboard/patients/new-patient', { patient: this.memberInfo.member_data });
  }
  getBenefits() {
    this.service.benefitsListing().subscribe((res) => {
      this.benefits = res.results;
      this.dataSource = new MatTableDataSource<[]>(this.benefits);
      this.dataSource.paginator = this.paginator1;
      this.dataSource.sort = this.sort;
    });
  }
  getPatients() {
  this.service.patientVisit().subscribe((res) => {
    this.patients = res.results;
  });
  }
  onSelect(item) {

    if (item.item.patient.national_id === this.memberInfo.member_data.national_id) {
      const data = {
        'member_id': this.memberInfo.member_data.member_number,
        'visit_no': item.item.visit_no
      };
      this.navCtrl.navigate('/dashboard/patients/bill-patient', { patient: data});
      console.clear();
    } else {
      this.toastr.error('patient does not Match the insured member');
    }
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
