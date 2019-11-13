import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../../service.service';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss']
})
export class ClaimsComponent implements OnInit {
  displayedColumns: string[] = ['sn','member','patient_number','visit_number','insurance_company','member_number','visit_type','amount'];
  dataSource;
  patient_number;
  member;
  visit_number;
  member_number;
  insurance_company;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  loading = true;
  claims =[];
  date: Date;
  constructor(public service: ServiceService, public navCtrl: NgxNavigationWithDataComponent) { }

  ngOnInit() {
    this.getClaims();
  }
  
  getClaims() {
    this.service.getClaims().subscribe((res) => {
      this.claims = res.results;
      this.claimsData(this.claims);
      this.loading = false
    }
    );
  }
  search(filterValue: any){
  console.log(filterValue)
  this.service.searchClaims(filterValue).subscribe(res =>{
     this.claimsData(res.results);
  });
  }
  claimsData(items){
    this.dataSource = new MatTableDataSource(items);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }  

  claimDetails(item) {
    console.log(item);
    this.navCtrl.navigate('/dashboard/claims/claim-detail', { id: item.id });
  }
  onSelect(item){
    this.navCtrl.navigate('/dashboard/claims/claim-detail', { id: item.item.id });
  }

}
