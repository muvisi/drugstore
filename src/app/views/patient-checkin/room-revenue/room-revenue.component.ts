import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../../service.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-room-revenue',
  templateUrl: './room-revenue.component.html',
  styleUrls: ['./room-revenue.component.scss'],
  providers:[DatePipe]
})
export class RoomRevenueComponent implements OnInit {
  roomsColumns: string[] = ['sn','date','room','start', 'end','amount','type','staff'];
  dataSource;
  date;
  constructor(public service:ServiceService,public datePipe:DatePipe) { }
  ngOnInit() {
    this.getRoomsRevenue();
  }
  getRoomsRevenue(){
    this.service.roomRevenues().subscribe((res)=>{
      this.dataSource = new MatTableDataSource(res);
    })
  }
  onRoomRevenue(){
    this.service.roomDateRevenues({date:this.datePipe.transform(this.date,'yyyy-MM-dd')}).subscribe((res)=>{
      this.dataSource = new MatTableDataSource(res);
    })
  }
}
