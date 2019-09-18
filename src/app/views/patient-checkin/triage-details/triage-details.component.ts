
import {ServiceService} from '../../../service.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import 'rxjs/add/operator/filter';
@Component({
  selector: 'app-triage-details',
  templateUrl: './triage-details.component.html',
  styleUrls: ['./triage-details.component.scss']
})
export class TriageDetailsComponent implements OnInit {
  @ViewChild('staticModal', {'static': true}) staticModal: ModalDirective;
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
  constructor(public service: ServiceService, private toastr: ToastrService, private fb: FormBuilder,
  public navCtrl: NgxNavigationWithDataComponent) { }

  ngOnInit() {

    const lowerLimit = 70;
    const upperLimit = 150;
    const weightLimit = 34;
    const heightLimit = 30;
    const temperatureLimit = 25;
    const pulseLimit = 90;

    this.form = this.fb.group({
      lower: ['', [Validators.required, Validators.maxLength(lowerLimit)]],
      upper: ['', [Validators.required, Validators.maxLength(upperLimit)]],
      weight: ['', [Validators.required, Validators.maxLength(weightLimit)]],
      height: ['', [Validators.required, Validators.maxLength(heightLimit)]],
      temperature: ['', [Validators.required, Validators.maxLength(heightLimit)]],
      pulse: ['', [Validators.required, Validators.maxLength(heightLimit)]],
      respiratory: ['', [Validators.required, Validators.maxLength(heightLimit)]],
      // height: ['', [Validators.required, Validators.maxLength(heightLimit)]]
    });
    console.log(this.form.get('lower'));
    if (this.form.get('lower').value > 50) {
      console.log(this.lower.nativeElement.value = 50 / 60);
    }
    this.form.get('lower').valueChanges
      .filter((value: number) => value >= lowerLimit && value < 100)
      .subscribe(() => this.upper.nativeElement.focus());

    this.form.get('upper').valueChanges
      .filter((value: number) => value >= upperLimit)
      .subscribe(() => this.weight.nativeElement.focus());
    this.form.get('weight').valueChanges
      .filter((value: number) => value >= weightLimit)
      .subscribe(() => this.height.nativeElement.focus());
      this.form.get('height').valueChanges
        .filter((value: number) => value >= heightLimit)
      .subscribe(() => this.temperature.nativeElement.focus());
     this.form.get('temperature').valueChanges
       .filter((value: number) => value >= temperatureLimit)
      .subscribe(() => this.pulse.nativeElement.focus());
    this.form.get('pulse').valueChanges
      .filter((value: number) => value <= pulseLimit)
      .subscribe(() => this.respiratory.nativeElement.focus());
    this.triagePatients();
  }
  addTriage(item) {
    console.log(item);
    this.navCtrl.navigate('/dashboard/patients/add-triage/', {data: item });
  }
  triageDetails() {
    const triage = {
      'blood_pressure': this.lower.nativeElement.value + '/' + this.upper.nativeElement.value,
      'weight': this.weight.nativeElement.value,
      'pulse': this.pulse.nativeElement.value,
      'height': this.height.nativeElement.value,
      'temperature': this.temperature.nativeElement.value,
      'respiratory': this.respiratory.nativeElement.value,
    };
    const data = {
      'visit_number': this.visit_no,
      'triage': triage
    };
    this.service.triageDetail(data).subscribe((res) => {
      console.log('success');
      this.toastr.success('Successfully saved Triage details');
      this.ngOnInit();
      this.staticModal.hide();
    });
  }
  triagePatients() {
    this.service.triageList().subscribe((res) => {
      this.visits = res.results;
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
