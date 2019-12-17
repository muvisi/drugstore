import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ServiceService } from '../../../service.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-stock-level',
  templateUrl: './stock-level.component.html',
  styleUrls: ['./stock-level.component.scss']
})
export class StockLevelComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(ModalDirective, {static: true}) staticModal: ModalDirective;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  loading:any;
  displayedColumns: string[] = ['sn','name', 'generic_name', 'therapeutic_class', 'strength', 'form', 'status', 'quantity', 'cost'];
  dataSource;
  drug: any = {};
  constructor(public service: ServiceService) { }

  ngOnInit() {
    this.drugs();
  }
  drugs() {
    this.service.getDrugs().subscribe((res) => {
      this.loader(res.results);
    });
  }
  applySearch(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
loader(items){
      this.dataSource = new MatTableDataSource<any>(items);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
}
loadMedicines(item) {
console.log(item);
this.drug = item;
this.staticModal.show();
}
onSubmit(){
  
  this.loading = true;
  this.service.loadDrug(this.drug).subscribe((res)=>{
    console.log(res);
    this.staticModal.hide();
    this.loading= false;
    this.drugs();
  })
  
}
search(data){
  this.service.searchHospitalDrugs(data).subscribe((res)=>{
    this.loader(res.results);
  });
}
}

