import { Component, OnInit } from '@angular/core';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DataManager, WebApiAdaptor, ODataV4Adaptor, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { ServiceService } from '../../../service.service';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
})
export class CalendarComponent implements OnInit {

  // public readonly: boolean = true;
  // private dataManager: DataManager = new DataManager({
  //    url: 'http://localhost:8000/appointments/appointment_list/',
  //    crudUrl: 'http://localhost:8000/appointments/appointment_list/',
  //    adaptor: new UrlAdaptor
  // });
 public selectedDate: Date = new Date(2019, 9, 21);
    public eventSettings: EventSettingsModel = {
        dataSource: [
        {
            Id: 1,
            Subject: 'Explosion of Betelgeuse Star',
            StartTime: new Date(2019,10,21, 9, 30),
            EndTime: new Date(2019, 10,21, 11, 0)
        }]
    };
  constructor( public service: ServiceService) { }

  ngOnInit() {
    console.log(new Date())
    this.service.getEvents().subscribe((res)=>{
      console.log(res);
    })
  }
  onCreate($event){
    console.log($event);
  
  }
}
