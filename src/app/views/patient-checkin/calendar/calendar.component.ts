import { Component, OnInit } from '@angular/core';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, EventSettingsModel, PopupOpenEventArgs} from '@syncfusion/ej2-angular-schedule';
import { DataManager, WebApiAdaptor, ODataV4Adaptor, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { ServiceService } from '../../../service.service';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { createElement } from '@syncfusion/ej2-base';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
})
export class CalendarComponent implements OnInit {
public selectedDate: Date = new Date();
// private dataManager: DataManager = new DataManager({
//    url: 'http://localhost:8000/appointments/appointment_list/',
//    adaptor: new ODataV4Adaptor
// });
// private dataQuery: Query = new Query();
// public eventSettings: EventSettingsModel = { dataSource: this.dataManager, query: this.dataQuery };
private dataManager: DataManager = new DataManager({
  url: 'http://134.209.199.123/appointments/appointment_list/', // 'controller/actions'
  crudUrl: 'http://localhost:8000/appointments/appointment_list/',
  adaptor: new UrlAdaptor
});
public eventSettings: EventSettingsModel = { dataSource: this.dataManager,
  fields: {
    id: 'Id',
    subject: { name: 'Subject', title: 'Patient Name'},
    location: { name: 'Location', title: 'Appointment Location'},
    description: { name: 'Description', title: 'Appointment Description' },
  }
}
  constructor( public service: ServiceService) { }

  ngOnInit() {

  }
  onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'Editor') {
        // Create required custom elements in initial time
        if (!args.element.querySelector('.custom-field-row')) {
            let row: HTMLElement = createElement('div', { className: 'custom-field-row' });
            let formElement: HTMLElement = args.element.querySelector('.e-schedule-form');
            formElement.firstChild.insertBefore(row, args.element.querySelector('.e-title-location-row'));
            let container: HTMLElement = createElement('div', { className: 'custom-field-container' });
            let inputEle: HTMLInputElement = createElement('input', {
                className: 'e-field', attrs: { name: 'EventType' }
            }) as HTMLInputElement;
            container.appendChild(inputEle);
            row.appendChild(container);
            let dropDownList: DropDownList = new DropDownList({
                dataSource: [
                    { text: 'Public Event', value: 'public-event' },
                    { text: 'Maintenance', value: 'maintenance' },
                    { text: 'Commercial Event', value: 'commercial-event' },
                    { text: 'Family Event', value: 'family-event' }
                ],
                fields: { text: 'text', value: 'value' },
                value: (<{ [key: string]: Object }>(args.data)).EventType as string,
                floatLabelType: 'Always', placeholder: 'Event Type'
            });
            dropDownList.appendTo(inputEle);
            inputEle.setAttribute('name', 'EventType');
        }
    }
}
}
