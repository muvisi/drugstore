import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../../service.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  customer:any={};
  Columns: string[] = ['sn','date', 'start', 'end','type','staff'];
  dataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private route: ActivatedRoute,public service:ServiceService) { }

  ngOnInit() {
    this.getUser(this.route.snapshot.params.id);
    this.reservations(this.route.snapshot.params.id);
  }
getUser(id){
  this.service.getUser(id).subscribe((res)=>{
    this.customer = res;
  })
}
reservations(id){
  this.service.reservationByStaff(id).subscribe((res)=>{
    this.dataSource = new MatTableDataSource(res.results);
    this.dataSource.paginator = this.paginator;
  })
  }
}
