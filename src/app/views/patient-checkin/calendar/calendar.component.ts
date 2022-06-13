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
scheduleHours: WorkHoursModel  = { highlight: true, start: '08:00', end: '06:00' };
workWeekDays: number[] = [0,1,2,3,4,5,6];
setViews: View[] = ['Day','TimelineDay','Week','TimelineWeek','TimelineMonth','Month','MonthAgenda'];
dataManager: DataManager = new DataManager({
  url: endpoint+'api/clinics-appointments/',
  adaptor: new UrlAdaptor,
  headers: [{ 'Authorization': 'Bearer ' + this.token}]
});
eventSettings: EventSettingsModel = { dataSource: this.dataManager
}
group: GroupModel = { resources: ['Clinics'] };
ownerDataSource: Object[] = [];
  constructor( public service: ServiceService) {
   }

  ngOnInit() {
    this.getClinics()
  }
  getClinics(){
    this.service.getClinicsCalendar().subscribe((res)=>{
      this.ownerDataSource = res;
    })
  }

onPopupOpen(args: PopupOpenEventArgs): void {
  if (args.type === 'Editor') {
      let statusElement: HTMLInputElement = args.element.querySelector('#EventType') as HTMLInputElement;
      if (!statusElement.classList.contains('e-dropdownlist')) {
          let dropDownListObject: DropDownList = new DropDownList({
              placeholder: 'Choose status', value: statusElement.value,
              dataSource: ['New', 'Requested', 'Confirmed']
          });
          dropDownListObject.appendTo(statusElement);
          statusElement.setAttribute('name', 'EventType');
      }
      let startElement: HTMLInputElement = args.element.querySelector('#StartTime') as HTMLInputElement;
      if (!startElement.classList.contains('e-datetimepicker')) {
          new DateTimePicker({ value: new Date(startElement.value) || new Date() }, startElement);
      }
      let endElement: HTMLInputElement = args.element.querySelector('#EndTime') as HTMLInputElement;
      if (!endElement.classList.contains('e-datetimepicker')) {
          new DateTimePicker({ value: new Date(endElement.value) || new Date() }, endElement);
      }
  }
}




}
