import { Component, OnInit, TemplateRef , ViewChild} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ServiceService } from '../../../service.service';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, from } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
selector: 'app-triage',
templateUrl: './diagnosis.component.html',
styleUrls: ['./diagnosis.component.scss'],
providers: [DatePipe]
})
export class DiagnosisComponent implements OnInit {
@ViewChild('diagnosis', {static: true}) diagnosis: ModalDirective;
@ViewChild('labmodal', {static: true}) labmodal: ModalDirective;
@ViewChild('proceduremodal', {static: true}) proceduremodal: ModalDirective;
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
@ViewChild('paginator2', {static: true}) paginator2: MatPaginator;
@ViewChild('paginator3', {static: true}) paginator3: MatPaginator;
data;
procedureColumns: string[] = ['Sn','Procedure', 'Category', 'Bill Number', 'Invoice', 'Cost', 'Status', 'Quantity','delete'];
diagnosisColumns: string[] = ['Sn','Diagnosis', 'Code'];
drugColumns: string[] = ['name', 'generic_name','dosage','frequency', 'duration', 'route','notes','form','delete'];
frequencies = ['2 hrs','4hrs','6hrs','8hrs','12hrs','24hrs','1 day','2 days'];
historyDiagnosis=['sn','name','code','date'];
historyServices=['sn','service','bill_number','invoice','cost'];
historyDrugs: string[] = ['sn','name', 'generic_name','form','strength','refils','date'];
triage = {};
id;
loading;
drugName;
test;
isFamilyIssues;
isHealthIssues;
isMedication;
isVisit;
allergyName;
name;
patientInfo: any = {};
diagnoses = [];
labTest: any = {};
tests: any = [];
services;
selectedTest: any = {};
dataSource;
diagnosisList;
diagnosesList;
selectedOption: any = {};
selected: string;
allergies = [];
title: String;
pressureSource;
prescriptions;
weight;
tempSource;
type = 'thermometer';
dataFormat = 'json';
user;
drugs;
dosage;
allergy: any = {};
selectedDrug: any = { };
labAmount = 0;
proceduresAmount = 0;
prescriptionAmount =0;

constructor(public navCtrl: NgxNavigationWithDataComponent, public service: ServiceService,
private router: Router, private toastr: ToastrService, private datePipe: DatePipe) {
this.id = this.navCtrl.get('id');
this.patient();
this.user = JSON.parse(sessionStorage.getItem('user'));
if (this.id === undefined) {
  this.router.navigate(['/dashboard/patients/diagnosis&treatment']);
}
}

ngOnInit() {
this.loading = true;
this.getServices();
console.clear();
this.getDiagnoses();
this.alleryList();
this.getPrescription();
this.getDosage();
this.getTest();
console.clear();
}
onDiagnosis(item) {
this.selectedOption = item.item;
this.selectedOption.visit_no = this.patientInfo.visit_no;
this.service.saveDiagnosis(this.selectedOption).subscribe((res) => {
console.log(res);
this.selectedOption = {};
this.toastr.success('successfully added diagnosis');
this.patient();
}, (error) => {
  this.toastr.error('Failed to add diagnosis');
});
}
onAllergy(item) {
this.allergy = item.item;
  }
addAllergy() {
  this.allergy.visit_no = this.patientInfo.visit_no;
  this.service.addAllergy(this.allergy).subscribe((res) => {
    console.log(res);
    this.toastr.success('Successfully added allergy');
    this.patient();
  });
}
  getDosage() {
    this.service.getDosage().subscribe((res) => {
      this.dosage = res.results;

    });
  }

savePrescription() {
  console.log(this.selectedDrug)
  const data = {
    'visit_no': this.patientInfo.visit_no,
    'data': this.selectedDrug,
    'hospital': this.user.hospital
  };
 this.service.savePrescription(data).subscribe((res) => {
   this.selectedDrug = { };
  this.toastr.success('sucessfully added prescription');
  this.patient();

 });
   }
getTest() {
  this.service.getTests().subscribe((res) => {
    this.test = res.results;
  });
}
  searchTest(text) {
    console.log(text);
    this.service.searchTest(text).subscribe((res) => {
      this.test = res.results;
    });
  }
OnSelectTest(item) {
  console.log(item.item);
  this.selectedTest = item.item;
  this.selectedTest.visit_no = this.patientInfo.visit_no;
  this.service.labRequest(this.selectedTest).subscribe((res) => {
    console.log(res);
    this.toastr.success('successfully added lab request');
    this.selectedTest = {};
    this.patient();
  },
  (error) => {
    this.toastr.error('Lab request not submited');
  }
  );
}

getDiagnoses() {
this.service.allDiagnoses().subscribe((res) => {
this.diagnosesList = res.results;
});
}

onDrug(item) {
this.selectedDrug = item.item;
console.log(this.selectedDrug);
}
submitClaim() {
this.service.closeClaim({'id': this.patientInfo.visit_no}).subscribe((res) => {
console.log(res);
});
}
patient() {
const data = {
'id': this.id
};

this.service.getVisit(data).subscribe((res) => {
this.patientInfo = res;
this.loading = false;
this.labAmount = 0;
this.proceduresAmount = 0;
this.prescriptionAmount = 0;
this.patientInfo.lab_test.forEach(element => {
  this.labAmount += element.rate;
});
this.patientInfo.procedures.forEach(element => {
  this.proceduresAmount += element.rate
});
this.data = new MatTableDataSource<[]>(this.patientInfo.procedures);
this.data.paginator = this.paginator;
this.diagnosisList = new MatTableDataSource<[]>(this.patientInfo.diagnosis);
this.diagnosisList.paginator = this.paginator2;
this.prescriptions = new MatTableDataSource<[]>(this.patientInfo.prescription);
this.prescriptions.paginator = this.paginator3;
this.weight = res.triage[0].weight;

this.pressureSource = {
'chart': {
'subcaption': 'Weight',
'lowerLimit': '0',
'upperLimit': '200',
'showValue': '1',
'numberSuffix': 'Kgs',
'theme': 'fusion',
'showToolTip': '0'
},
// Gauge Data

'colorRange': {
'color': [{
  'minValue': '0',
  'maxValue': '75',
  'code': '#62B58F'
}, {
  'minValue': '75',
  'maxValue': '100',
  'code': '#FFC533'
}, {
  'minValue': '100',
  'maxValue': '200',
  'code': '#F2726F'
}]
},
'dials': {
'dial': [{
  'value': this.weight
}]
}
};


this.dataSource = {
chart: {
subcaption: 'Temperature',
lowerlimit: '0',
upperlimit: '40',
numbersuffix: '°C',
thmfillcolor: '#008ee4',
showgaugeborder: '1',
gaugebordercolor: '#008ee4',
gaugeborderthickness: '2',
plottooltext: 'Temperature: <b>$datavalue</b> ',
theme: 'fusion',
showvalue: '1'
},
value: this.patientInfo.triage[0].temperature
};
this.tempSource = {
chart: {
subcaption: 'Height Readings',
xAxisName: 'visits',
yAxisName: 'Centimetres',
numberSuffix: 'cm',
theme: 'fusion'
},
data: [
{ label: '1', value: this.patientInfo.triage[0].height },
]
};
}
);
}
getServices() {
  this.service.getProcedures().subscribe((res) => {
    this.services = res.results;
  });
}

getPrescription() {
this.service.prescriptions().subscribe((res) => {
this.drugs = res.results;
});
}
searchPrescription(text){
  this.service.searchPrescriptions(text).subscribe((res)=>{
    this.drugs = res.results;
  })
}
searchProcedure(text) {
console.log(text);
  this.service.searchProcedure(text).subscribe((res) => {
  this.services = res.results;
});
}
alleryList() {
this.service.getAllergy().subscribe((res) => {
console.log('allergy', res);
this.allergies = res.results;
});
}

deleteDiagnosis(obj: {}) {
const index: number = this.diagnoses.indexOf(obj);
if (index !== -1) {
this.diagnoses.splice(index, 1);
}
}
  onSelect(event) {
    this.selectedOption = event.item;
    this.selectedOption.visit_no = this.patientInfo.visit_no;
  }

  deleteItem(obj) {
    console.log(obj);
    if(obj.status == '1'){
      this.toastr.info('You cannot Delete already paid Service Can only Reverse')
      return;
    }
    this.service.deleteBillItem(obj.id).subscribe((res) => {
      this.toastr.success('Successfuly Bill Item');
      this.patient();
    });
  }
  saveService() {
    this.selectedOption.date = this.datePipe.transform(this.selectedOption.date, 'yyyy-MM-dd');
    console.log(this.selectedOption)
    this.service.generateBill(this.selectedOption).subscribe((res) => {
      console.log(res);
      this.patient();
      this.selectedOption = {};
      this.name = '';
    });
  }
saveClaim() {
const data = {
'id': this.id,
'diagnoses': this.diagnoses,
};
console.log(data);
this.service.saveClaim(data).subscribe((res) => {
this.router.navigate(['/dashboard/register']);
});
}
}
