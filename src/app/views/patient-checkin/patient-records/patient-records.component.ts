import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource , MatSort } from '@angular/material';

@Component({
  selector: 'app-patient-records',
  templateUrl: './patient-records.component.html',
  styleUrls: ['./patient-records.component.scss']
})
export class PatientRecordsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'status'];
// tslint:disable-next-line: no-use-before-declare
  dataSource = new MatTableDataSource<PeriodicElement>( ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() { }
  pageSizeOptions: number[] = [15, 25];
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  test() {
    console.log('testing row');
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Davis Mutinda', weight: 80, status: 'Active' },
  { position: 2, name: 'Faith Mwende', weight: 65, status: 'Active' },
  { position: 3, name: 'Stephen Mwangangi', weight: 56, status: 'Active' },

];
