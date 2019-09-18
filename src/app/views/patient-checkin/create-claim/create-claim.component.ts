import { Component, OnInit , ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../../../service.service';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-create-claim',
  templateUrl: './create-claim.component.html',
  styleUrls: ['./create-claim.component.scss'],
  providers: [DatePipe]
})
export class CreateClaimComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Code', 'Cost', 'Delete'];
  drugColumns: string[] = ['Name', 'Strength', 'Form', 'Quantity', 'Delete'];
  @ViewChild(MatSort, { 'static': true}) sort: MatSort;
  claimForm: FormGroup;
  dataSource;
  dataSource1;
  submitted = false;
  selectedOption: any = {};
  selectedDrug: any = {};
  selectedTest: any = {};
  labtest = [];
  procedures = [];
  schemes = [];
  drugs = [];
  prescription = [];
  test: any = [];
  services: any = [];
  payers = [];
  payerId;
  schemeId;
  member;
  members = [];
  selectedDiagnosis: any = {};
  diagnosesList = [];
  diagnosis = [];
  patient: any = {};
  proceduresCost = 0;
  labCost = 0;
  drugsCost = 0;
  totalAmount = 0;
  dataSource2;
  dataSource3;
  constructor(private formBuilder: FormBuilder, public service: ServiceService, private datePipe: DatePipe, public toastr: ToastrService,
  public navCtrl: NgxNavigationWithDataComponent) {
   }

   ngOnInit() {
    this.claimForm = this.formBuilder.group({
        name: ['', Validators.required],
        insurance: ['', Validators.required],
        scheme: ['', Validators.required],
        visit_number: ['', Validators.required],
        check_out: ['', Validators.required],
        // charge_date: ['', Validators.required],
        check_in: ['', Validators.required],
        patient_number: ['', Validators.required],
        hospital: ['', Validators.required],
        visit_type: ['', Validators.required],
        doctor: ['', Validators.required],
    });
this.getTests();
this.getServices();
this.getPrescription();
this.Payers();
this.getDiagnoses();
}

// convenience getter for easy access to form fields
get f() { return this.claimForm.controls; }

Payers() {
  this.service.getPayers().subscribe((res) => {
    this.payers = res.results;
  }
  );
}
OnPayer(item) {
  console.log(item.item);
  this.payerId = item.item.id;
  this.service.getSchemes(this.payerId).subscribe((res) => {
   this.schemes = res.results;
  });
}
payerSearch(text) {
  console.log(text);
  this.service.searchPayers(text).subscribe((res) => {
    console.log(res);
    this.payers = res.results;
  }
  );
}
onDiagnosis(item) {
  this.selectedDiagnosis = item.item;
  // console.log(this.diagnosis.findIndex(obj => obj === this.selectedDiagnosis));
  if (this.diagnosis.findIndex(obj => obj === this.selectedDiagnosis) === -1) {
    this.diagnosis.push(this.selectedDiagnosis);
  }
  this.selectedDiagnosis = {};
  }
deleteDiagnosis(item) {
  this.diagnosis.splice(this.diagnosis.indexOf(item), 1);
}
getDiagnoses() {
  this.service.allDiagnoses().subscribe((res) => {
    this.diagnosesList = res.results;
    });
 }

 searchDiagnosis(text) {
   this.service.searchDiagnosis(text).subscribe((res) => {
     console.log(res);
    this.diagnosesList = res.results;
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
search(text) {
  this.service.searchMember(this.schemeId, text).subscribe((res) => {
    console.log('jk', res);
    this.members = res.results;
  });
}
OnMember(item) {
  console.log(item.item);
  this.patient.id = item.item.id;

}
getServices() {
  this.service.getProcedures().subscribe((res) => {
    this.services = res.results;
  });
}
onSelect(event) {
      this.selectedOption = event.item;
      console.log(this.procedures.findIndex(obj => obj.code === this.selectedOption.code));
      if (this.procedures.findIndex(obj => obj.code === this.selectedOption.code)) {
      this.procedures.push(this.selectedOption);
      let tot = 0;
      this.procedures.forEach(element => {
      // tslint:disable-next-line: radix
      const cost = parseInt(element.cost);
      tot += cost;
      });
      this.proceduresCost = tot;
      }
      this.dataSource1 = new MatTableDataSource(this.procedures);
      this.totalAmount = this.proceduresCost + this.labCost + this.drugsCost;
      this.selectedOption = {};
}

onSubmit() {
    this.submitted = true;
}
getPrescription() {
  this.service.prescriptions().subscribe((res) => {
  this.drugs = res.results;
  });
  }
searchPrescription(text) {
  this.service.searchPrescriptions(text).subscribe((res) => {
    this.drugs = res.results;
  });
}
getTests() {
    this.service.getTests().subscribe((res) => {
      this.test = res.results;
    });
  }
  OnSelectTest(item) {
    this.selectedTest = item.item;
    if (this.labtest.findIndex(obj => obj.code === this.selectedTest.code)) {
      this.labtest.push(this.selectedTest);
      let tot = 0;
      this.labtest.forEach(element => {
      // tslint:disable-next-line: radix
      const cost = parseInt(element.cost);
      tot += cost;
      console.log('ss', cost);
       });
       this.labCost = tot;
    }
    this.selectedTest = {};
    this.dataSource = new MatTableDataSource(this.labtest);
    this.totalAmount = this.proceduresCost + this.labCost + this.drugsCost;
  }

 deleteLab(item) {
  this.labtest.splice(this.labtest.indexOf(item), 1);
  let tot = 0;
  this.labtest.forEach(element => {
  // tslint:disable-next-line: radix
  const cost = parseInt(element.cost);
  tot += cost;
  console.log('ss', cost);
   });
  this.labCost = tot;
  this.dataSource = new MatTableDataSource(this.labtest);
  this.totalAmount = this.proceduresCost + this.labCost + this.drugsCost;
 }

 deleteProcedure(item) {
  this.procedures.splice(this.procedures.indexOf(item), 1);
  let tot = 0;
  this.procedures.forEach(element => {
  // tslint:disable-next-line: radix
  const cost = parseInt(element.cost);
  tot += cost;
   });
  this.proceduresCost = tot;
  this.dataSource1 = new MatTableDataSource(this.procedures);
  this.totalAmount = this.proceduresCost + this.labCost + this.drugsCost;
 }
 deleteDrug(item) {
  this.prescription.splice(this.prescription.indexOf(item), 1);
  let tot = 0;
  this.prescription.forEach(element => {
  // tslint:disable-next-line: radix
  const cost = parseInt(element.cost);
  tot += cost;
   });
  this.proceduresCost = tot;
  this.dataSource3 = new MatTableDataSource(this.procedures);
  this.totalAmount = this.proceduresCost + this.labCost + this.drugsCost;
 }
searchTest(text) {
    console.log(text);
    this.service.searchTest(text).subscribe((res) => {
      this.test = res.results;
    });
  }
  addPrescription() {
    if (this.prescription.findIndex(obj => obj.code === this.selectedDrug.code)) {
      this.prescription.push(this.selectedDrug);
      let tot = 0;
      this.prescription.forEach(element => {
      // tslint:disable-next-line: radix
      const cost = parseInt(element.cost);
      tot += cost;
      console.log('ss', cost);
       });
       this.drugsCost = tot;
    }
    this.dataSource2 = new MatTableDataSource(this.prescription);
    this.selectedDrug = {};
    this.totalAmount = this.proceduresCost + this.labCost + this.drugsCost;
  }
  onDrug(item) {
    console.log(item);
    this.selectedDrug = item.item ;
  }
  savePrescription() {
    console.log('ok');
  }
  searchProcedure(text) {
    console.log(text);
      this.service.searchProcedure(text).subscribe((res) => {
      this.services = res.results;
    });
    }

    submitClaim() {
    this.patient.check_out = this.datePipe.transform(this.patient.check_out, 'yyyy-MM-dd');
    this.patient.check_in = this.datePipe.transform(this.patient.check_in, 'yyyy-MM-dd');
    const data = {
      'diagnosis': this.diagnosis,
      'prescriptions': this.prescription,
      'tests': this.labtest,
      'services': this.procedures,
      'patient': this.patient
    };
    console.log(data);
    this.service.createSingleClaim(data).subscribe((res) => {
      this.submitted = true;
      this.toastr.success('Successfully Created Claim');
      this.navCtrl.navigate('/dashboard/claims');
      this.ngOnInit();
      console.log(res);
      this.labtest = [];
      this.patient = [];
      this.procedures = [];
      this.prescription = [];
      this.diagnosis = [];

    });
    }
}
