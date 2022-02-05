import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../../service.service';

@Component({
  selector: 'app-sedgrick',
  templateUrl: './sedgrick.component.html',
  styleUrls: ['./sedgrick.component.scss']
})
export class SedgrickComponent implements OnInit {
  data:any={}
    hospital='AAR HOSPITAL'
    constructor(private route: ActivatedRoute,public service:ServiceService) { }
  
    ngOnInit() {
      this.service.getInsurance(this.route.snapshot.params.id).subscribe((res)=>{
        console.log(res);
        this.data = res;
      })
    }  
   printPage() {
    window.print();
  }
  getData(){
    
  //     this.service.getApadata().subscribe(
  //       (res)=>{
  //        this.dataSource=res;
  //        console.log("datasource",res)
    
  //       },

  }

}
