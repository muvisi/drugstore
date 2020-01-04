
import {ServiceService} from '../../../service.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import 'rxjs/add/operator/filter';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-triage-details',
  templateUrl: './triage-details.component.html',
  styleUrls: ['./triage-details.component.scss']
})
export class TriageDetailsComponent implements OnInit {
  @ViewChild('staticModal', {'static': true}) staticModal: ModalDirective;
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  form: FormGroup;
  @ViewChild('lower', {'static': true}) lower: ElementRef;
  @ViewChild('upper', {'static': true}) upper: ElementRef;
  @ViewChild('weight', {'static': true}) weight: ElementRef;
  @ViewChild('height', {'static': true}) height: ElementRef;
  @ViewChild('temperature', {'static': true}) temperature: ElementRef;
  @ViewChild('pulse', {'static': true}) pulse: ElementRef;
  @ViewChild('respiratory', {'static': true}) respiratory: ElementRef;
  visits: any = [];
  name;
  patientNumber;
  visitNumber;
  searchText;
  phone;
  patientName;
  triageSuccess = false;
  visit_no;
  Columns: string[] = ['sn','name','patient_no','visit_no','national_id','priority','phone','status','date','time']
  dataSource: any;
  constructor(public service: ServiceService, private toastr: ToastrService, private fb: FormBuilder,
  public navCtrl: NgxNavigationWithDataComponent) { }

  ngOnInit() {
    this.triagePatients();
  }
  addTriage(item) {
    console.log(item);
    this.navCtrl.navigate('/dashboard/patients/add-triage/', {data:{visit_no:item.visit_no,name:item.name,treatment:false}});
  }
  search(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  triagePatients() {
    this.service.triageList().subscribe((res) => {
      this.visits = res.results;
      this.dataSource = new MatTableDataSource <[]>(res.results);
      this.dataSource.paginator = this.paginator;
    }
    );
  }
  setVisit(item) {
    this.visit_no = item.visit_no;
    this.patientName = item.name;

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
