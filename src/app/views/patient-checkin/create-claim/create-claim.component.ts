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
  appointmentForm: FormGroup;
  dataSource;
  dataSource1;
  submitted = false;
  student=false;
  appointment_submitted= false;
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
  proceduresCost = 0;
  labCost = 0;
  drugsCost = 0;
  totalAmount = 0;
  dataSource2;
  dataSource3;
  id:any;
  dobDate;
  maxDate= new Date();
  patients = [];
  counsolers =[];

  counsellling_type=[
    {
      type:"Couples",
      code:201,
      value:"couple"

    },
    {
      type:"Family",
      code:202,
      value:"family"

    },  
    {
      type:"Children",
      code:203,
      value:"children"

    },  {
      type:"Groups",
      code:204,
      value:"group"

    },
    {
      type:"Webinars",
      code:205,
      value:"webinar"

    },
    {
      type:"Individual",
      code:206,
      value:"individual"

    },  {
      type:"Students",
      code:207,
      value:"student"

    }

  ]
  constructor(private formBuilder: FormBuilder, public service: ServiceService, private datePipe: DatePipe, public toastr: ToastrService,
  public navCtrl: NgxNavigationWithDataComponent) {
   }

   ngOnInit() {
    this.claimForm = this.formBuilder.group({
        patient_name: ['', Validators.required],
        member_number: ['', Validators.required],
        insurance_company: ['', Validators.required],
        scheme_name: ['', Validators.required],
        check_out: ['', Validators.required],
        nhif_number: [''],
        phone: [''],
        check_in: ['', Validators.required],
        visit_type: ['OUTPATIENT', Validators.required],
        doctor: ['', Validators.required],
    });
    this.appointmentForm = this.formBuilder.group({
      phone: ['',Validators.required],
      type: ['', Validators.required],
      time: ['', Validators.required],
      reason: ['', Validators.required],
      first_name: ['', Validators.required],
      other_names: [''],
      doc_type: ['', Validators.required],
      last_name: ['', Validators.required],
      gender: ['Female', Validators.required],
      email: ['',Validators.email],
      dob: ['', Validators.required],
      priority: ['3', Validators.required],
      residence: [''],
      national_id: ['',Validators.required],
      passport_no: [''],
      occupation: [''],
      no:[],
      code:['+254',Validators.required],
      visit_type:['NEW',Validators.required],
      date:['',Validators.required]
    });
this.getTests();
this.getServices();
this.getPrescription();
this.Payers();
this.getDiagnoses();
this.getPatients();
this.getCounselors();
}
getCounselors(){
  this.service.getAppointmentUsers().subscribe((res)=>{
    this.counsolers = res.results;
  })
}

get f() { return this.claimForm.controls; }
get af() { return this.appointmentForm.controls; }
getPatients(){
  this.service.patientVisit().subscribe((res)=>{
    this.patients = res.results;
  })
}
Payers() {
  this.service.getPayers().subscribe((res) => {
    this.payers = res.results;
  }
  );
}
onVisit(item){
  const data = item.item;
  this.diagnosis =data.diagnosis;
  this.claimForm.patchValue({check_in: new Date(data.check_in),check_out:new Date(data.check_in),patient_name:data.name});

}
OnPayer(item) {
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
  this.id = item.item.id;

}
getServices() {
  this.service.getProviderServices().subscribe((res) => {
    this.services = res.results;
  });
}
searchServices(text) {
  this.service.getProviderServicesQuery(text).subscribe((res) => {
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
appointmentTypeSelected(value){
  
  if(value=="student")this.student=true;else this.student=false;
}
onAppointmentsubmit() {
  this.appointment_submitted = true;
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
  hasWhiteSpace(s) {
    return (/\s/).test(s);
  }
  onTextChange(value){
    if(this.hasWhiteSpace(value)){
      
        var s=value.split(" ");
        if(s.length==2){
        this.appointmentForm.patchValue({
          'first_name':s[0],
          'last_name':s[1]
  
        });}
        else{
          this.appointmentForm.patchValue({
            'first_name':s[0],
            'last_name':s[1],
            'other_names':s[2]
    
          });
        }
    }else{
      this.appointmentForm.patchValue({
        'first_name':value
      })
    }
      
  }
  searchProcedure(text) {
    console.log(text);
      this.service.searchProcedure(text).subscribe((res) => {
      this.services = res.results;
    });
    }

    submitClaim() {
     let patient = this.claimForm.value
     patient.id = this.id;

    const data = {
      'diagnosis': this.diagnosis,
      'services': this.procedures,
      'payer':this.payerId,
      'member':patient,
      'appointment':this.appointmentForm.value
      
    };
    this.service.createSingleClaim(data).subscribe((res) => {
      console.log(res);
      this.submitted = true;
      this.appointment_submitted=false
      this.toastr.success('Successfully Created Claim');
      this.navCtrl.navigate('/dashboard/eclaims-dashboard/checking');
      this.ngOnInit();
      console.log(res);
      this.labtest = [];
      this.procedures = [];
      this.prescription = [];
      this.diagnosis = [];


    });
    }
}
