import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../../service.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  Columns: string[] = ['sn','date', 'start', 'end','type','staff'];
  @ViewChild('pagination', {static: true}) paginator: MatPaginator;
  dataSource: MatTableDataSource<unknown>;
  constructor(public service:ServiceService) { }
  ngOnInit() {
    this.reservations();
  }
  reservations(){
    this.service.reservationList().subscribe((res)=>{
      this.dataSource = new MatTableDataSource(res.results);
      this.dataSource.paginator = this.paginator;    
    })
    }
}
