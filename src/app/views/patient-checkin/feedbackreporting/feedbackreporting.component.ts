import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../../service.service';

@Component({
  selector: 'app-feedbackreporting',
  templateUrl: './feedbackreporting.component.html',
  styleUrls: ['./feedbackreporting.component.scss']
})
export class FeedbackreportingComponent implements OnInit {
  AllColumns: string[] = ['sn','date','patient','service','phone','rating','comments',"visit_type","status","type"]
  dataSourceCall;
  dataSource;
  calledpatientdataSource;
  notcalledpatientdataSource;
  
  selected;
  // space=" ,";
 complimentdataSource;
  issuesdataSource;
  
  singlepatientdataSource;
  AllColumns2: string[] = ['sn','compliment','count']
  AllColumns1: string[] = ['sn','issue','count']
  AllColumns4:string[] = ['sn','client','phone','type','issues','status','types']

  constructor(private service: ServiceService,public router: Router) { }

  ngOnInit() {
    this. getIssuesData()
    this.getComplimentsData()
    this.getSiglePatientDATA()
    this.getAllCalledPatient()
    this.getAllnotCalledPatient()
  }
  getIssuesData(){
    this.service.getIssuesData("").subscribe(res=>{
      this.issuesdataSource=res;
      console.log('data',this.issuesdataSource)
    },err=>{})
}
getAllCalledPatient(){
  this.service.calledpatients().subscribe(res=>{
    this.calledpatientdataSource=res;
    console.log('data',this.calledpatientdataSource)
  },err=>{})
}
getAllnotCalledPatient(){
  this.service.notcalledpatients().subscribe(res=>{
    this.notcalledpatientdataSource=res;
    console.log('data',this.notcalledpatientdataSource)
  },err=>{})
}
getComplimentsData(){
  this.service.getComlimentData("").subscribe(res=>{
    this.complimentdataSource=res;
    console.log('data',this.complimentdataSource)
  },err=>{})
}
getSiglePatientDATA(){
  this.service.getSiglePatientData().subscribe(res=>{
    this.singlepatientdataSource=res;
    console.log('data',this.singlepatientdataSource)
  },err=>{})

}
clickRow(item){
  console.log(item)
  this.selected=item.id
  console.log(this.selected)
  this.router.navigate(['/dashboard/call-patients/',item.id])

  
}

}
