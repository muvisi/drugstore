import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})
export class HospitalComponent implements OnInit {
  displayedColumns: string[] = ['day', 'opening_hours', 'closing_hours', 'status','edit'];
  dataSource=[
    {"day":"Monday","opening_hours":"8:00","closing_hours":"5:00","status":"open"},

  ];
  constructor() { }

  ngOnInit() {
  }

}
