import { Component, OnInit } from '@angular/core';
// import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, EventSettingsModel, PopupOpenEventArgs,TimelineViewsService, MonthAgendaService} from '@syncfusion/ej2-angular-schedule';
import { EventSettingsModel, WeekService, TimelineViewsService, MonthService,PopupOpenEventArgs,TimelineMonthService, View, WorkHoursModel, GroupModel } from '@syncfusion/ej2-angular-schedule';
import { DataManager, WebApiAdaptor, ODataV4Adaptor, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { ServiceService,endpoint } from '../../../service.service';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { createElement } from '@syncfusion/ej2-base';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [WeekService, TimelineViewsService, MonthService, TimelineMonthService]
})
export class CalendarComponent implements OnInit {
token: string = sessionStorage.getItem('Token');
selectedDate: Date = new Date();

setView: View ='MonthAgenda';
scheduleHours: WorkHoursModel  = { highlight: true, start: '08:00', end: '05:00' };
public workWeekDays: number[] = [6];
setViews: View[] = ['Day','TimelineDay','Week','TimelineWeek','TimelineMonth','Month','MonthAgenda'];

// dataManager: DataManager = new DataManager({
//   url: endpoint+'api/calendar/',
//   crudUrl: endpoint+'api/calendar/',
//   adaptor: new UrlAdaptor,
//   headers: [{ 'Authorization': 'Bearer ' + this.token}]
// });
dataManager: DataManager = new DataManager({
  url: endpoint+'api/calreport/',
  crudUrl: endpoint+'api/calreport/',
  adaptor: new UrlAdaptor,
  headers: [{ 'Authorization': 'Bearer ' + this.token}]
});
public eventSettings: EventSettingsModel = { dataSource: this.dataManager };
public eventSettings1: EventSettingsModel = { dataSource: this.dataManager };
public scheduleViews: View[] = ['Week', 'WorkWeek', 'Month', 'TimelineWeek', 'TimelineWorkWeek'];
public showWeekend: boolean = true;

  constructor( public service: ServiceService) {
   }

// public eventSettings: EventSettingsModel = { dataSource: this.dataManager };
  //  eventSettings: EventSettingsModel = {
  //   dataSource:this.dataManager
    
  //  }
   

  ngOnInit() {
   
  }

onPopupOpen(args: PopupOpenEventArgs): void {
 
}
}
