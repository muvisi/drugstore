import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ServiceService } from '../../../service.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  roomColumns: string[] = ['sn','name', 'type', 'floor','status'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  rooms: MatTableDataSource<unknown>;
  constructor(public service:ServiceService) { }

  ngOnInit() {
    this.getRoom();
  }
  getRoom() {
    this.service.getRooms().subscribe((res) => {
      this.rooms = new MatTableDataSource(res.results);
      this.rooms.paginator =this.paginator;
    });
  }
searchRoom(text){
  this.service.searchRooms(text).subscribe((res) => {
    this.rooms = new MatTableDataSource(res.results);
    this.rooms.paginator =this.paginator;
  });
}
}


