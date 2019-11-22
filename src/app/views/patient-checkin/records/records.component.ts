import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../service.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  patient:any= {}
  constructor(public service: ServiceService) { }

  ngOnInit() {
  }
 submit(){
   this.service.createRecord(this.patient).subscribe((res)=>{
     console.log('www',res);
   })
 }
}
