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
selectedDate: Date = new Date();
setView: View ='MonthAgenda';
scheduleHours: WorkHoursModel  = { highlight: true, start: '08:00', end: '05:00' };
workWeekDays: number[] = [1,2,3,4,5];
setViews: View[] = ['Day','TimelineDay','Week','TimelineWeek','TimelineMonth','Month','MonthAgenda'];
dataManager: DataManager = new DataManager({
  url: endpoint+'appointments/appointments/',
  crudUrl: endpoint+'appointments/appointment_list/',
  adaptor: new UrlAdaptor
});
eventSettings: EventSettingsModel = { dataSource: this.dataManager
}
group: GroupModel = { resources: ['Owners'] };
ownerDataSource: Object[] = [];
  constructor( public service: ServiceService) {
   }

  ngOnInit() {
    this.getCounsellors()
  }
  getCounsellors(){
    this.service.getcounsellors().subscribe((res)=>{
      this.ownerDataSource = res.results;
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
