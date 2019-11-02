import { Component, OnInit } from '@angular/core';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import { ServiceService } from '../../../service.service';
@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})
export class HospitalComponent implements OnInit {
  templateDrivenForm = 'This is contenteditable text for template-driven form';
  displayedColumns: string[] = ['day', 'opening_hours', 'closing_hours', 'status','edit'];
  branch: any ={};
  selectedDay:any ={}
  dataSource=[ 
  ];
  weekDays=[
  {day:'Monday',value:1},
  {day:'Tuesday',value:2},
  {day:'Wednesday',value:3},
  {day:'Thursday',value:4},
  {day:'Friday',value:5},
  {day:'Saturday',value:6},
  {day:'Sunday',value:7},
]
  constructor( public navCtrl: NgxNavigationWithDataComponent, public service : ServiceService) { 
    this.branch = this.navCtrl.get('data')
    console.log(this.branch)
  }

  ngOnInit() {
  }
  submit(){
   
    this.selectedDay.id = this.branch.id;
    console.log(this.selectedDay)
    this.service.setHours(this.selectedDay).subscribe((res)=>{
      console.log(res);
      this.selectedDay = {};
      this.getDetails();
    })
  }
  getDetails(){
    this.service.getHospital(this.branch.id).subscribe((res)=>{
      this.branch = res;
    })
  }
}
