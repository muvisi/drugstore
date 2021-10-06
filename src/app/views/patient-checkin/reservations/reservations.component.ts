import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../../service.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  Columns: string[] = ['sn','date', 'start', 'end','room','type','staff','startsession','endsession','edit'];
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  dataSource: MatTableDataSource<unknown>;
  constructor(public service:ServiceService,public router:Router) { }
  ngOnInit() {
    this.reservations();
  }
  reservations(){
    this.service.reservationList().subscribe((res)=>{
      this.dataSource = new MatTableDataSource(res.results);
      this.dataSource.paginator = this.paginator;    
    })
    }
    search(text){
      this.service.reservationListSearch(text).subscribe((res)=>{
        this.dataSource = new MatTableDataSource(res.results);
        this.dataSource.paginator = this.paginator;    
      })
    }
    edit(element){
      this.router.navigate(['/dashboard/reservations/',element.id])

    }
    activate(element){
      this.service.startReservation(element.id).subscribe((res)=>{
        console.log(res);
        element.status=res.status;
      });

    }
    deactivate(element){
      this.service.endReservation(element.id).subscribe((res)=>{
        console.log(res);
        element.status=res.status;
      });


    }
    cancel(element){
      this.service.cancelReservation(element.id).subscribe((res)=>{
        element.status=res.status;
      });


    }
}
