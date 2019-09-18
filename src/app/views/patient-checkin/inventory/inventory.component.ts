import { Component, OnInit } from '@angular/core';


const data = {
  chart: {
    subcaption: 'Sales For the year 2017',
    yaxisname: '(in thousands)',
    decimals: '1',
    theme: 'fusion'
  },
  data: [
    {
      label: 'Jan',
      value: '1466000'
    },
    {
      label: 'Feb',
      value: '1147800'
    },
    {
      label: 'Mar',
      value: '532200'
    },
    {
      label: 'Apr',
      value: '395000'
    },
    {
      label: 'May',
      value: '250200'
    },
    {
      label: 'Jun',
      value: '224600'
    },
    {
      label: 'jul',
      value: '215200'
    },
    {
      label: 'Aug',
      value: '135200'
    },
    {
      label: 'Sep',
      value: '117807'
    },
    {
      label: 'Oct',
      value: '82000'
    },
    {
      label: 'Nov',
      value: '82000'
    }, {
      label: 'Dec',
      value: '82000'
    }
  ]
};


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  width = 460;
  height = 240;
  type = 'column3d';
  dataFormat = 'json';
  dataSource = data;
  constructor() { }

  ngOnInit() {
  }

}
