import { Component, OnInit} from '@angular/core';
import { ServiceService } from '../../../service.service';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss']
})
export class LabComponent implements OnInit {
  report: any = { };
  constructor( public service: ServiceService, public navCtrl: NgxNavigationWithDataComponent) { }

  ngOnInit() {
    this.getReports();
  }
  getReports() {
    this.service.labReport().subscribe((res) => {
      this.report = res;
    });
  }
  viewOrders(status) {
    this.navCtrl.navigate('/dashboard/lab-orders/', {status: status});
  }
  labTests() {
    this.navCtrl.navigate('/dashboard/lab-tests');
  }
}
