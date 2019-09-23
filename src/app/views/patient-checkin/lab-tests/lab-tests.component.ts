import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from '../../../service.service';

@Component({
  selector: 'app-lab-tests',
  templateUrl: './lab-tests.component.html',
  styleUrls: ['./lab-tests.component.scss']
})
export class LabTestsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  searchText;
  dataSource;
  Columns = ['order_number', 'test_name', 'test_code', 'section_code', 'doctor', 'status', 'location_code', 'patient_type'];
  constructor( public service: ServiceService) { }

  ngOnInit() {
    this.orders();
  }
  search(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  orders() {
    this.service.labTests().subscribe((res) => {
this.dataSource = new MatTableDataSource<[]>(res.results);
 this.dataSource.paginator = this.paginator;
    });
  }
}
