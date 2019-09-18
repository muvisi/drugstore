import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from '../../../service.service';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss']
})
export class LabComponent implements OnInit {
  displayedColumns: string[] = ['created', 'patient', 'visit', 'doctor', 'name'];
  dataSource;

  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;

  constructor( public service: ServiceService) { }

  ngOnInit() {
    this.requests();
  }
  requests() {
    this.service.getLabRequests().subscribe((res) => {
    console.log(res);
    this.dataSource = new MatTableDataSource <[]>(res);
    this.dataSource.paginator = this.paginator;
    });
  }
applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  view(data) {
    console.log(data);
  }
}
