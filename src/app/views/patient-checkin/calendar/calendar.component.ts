import { Component, OnInit, ViewChild } from '@angular/core';
// import { EventSettingsModel, WeekService, TimelineViewsService, MonthService,PopupOpenEventArgs,TimelineMonthService, View, WorkHoursModel, GroupModel, DayService } from '@syncfusion/ej2-angular-schedule';
import { DataManager, WebApiAdaptor, ODataV4Adaptor, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { ServiceService,endpoint } from '../../../service.service';

import { ActivatedRoute } from '@angular/router';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { extend, Internationalization,isNullOrUndefined } from '@syncfusion/ej2-base';
import {
    ScheduleComponent, ActionEventArgs, PopupOpenEventArgs, EventRenderedArgs, RenderCellEventArgs, DragAndDropService,
    TimelineViewsService, GroupModel, EventSettingsModel, ResizeService, TimeScaleModel, WorkHoursModel, View, WeekService, DayService, MonthService, TimelineMonthService, CurrentAction
  } from '@syncfusion/ej2-angular-schedule';
  // import { quickInfoTemplateData } from './data';
  // import { quickInfoTemplateData } from './data';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [DayService,WeekService, TimelineViewsService, MonthService, TimelineMonthService]
})
export class CalendarComponent implements OnInit {
  @ViewChild('scheduleObj', { static: true })
  public scheduleObj: ScheduleComponent;
  @ViewChild('addButtonObj', { static: true })
  public addButtonObj: ButtonComponent;
  @ViewChild('editButtonObj', { static: true })
  public editButtonObj: ButtonComponent;
  @ViewChild('deleteButtonObj', { static: true })
  public deleteButtonObj: ButtonComponent;
token: string = sessionStorage.getItem('Token');
selectedDate: Date = new Date();
private selectionTarget: Element;

setView: View ='MonthAgenda';
scheduleHours: WorkHoursModel  = { highlight: true, start: '08:00', end: '05:00' };
public workWeekDays: number[] = [6];
setViews: View[] = ['TimelineWeek','TimelineMonth','Month','MonthAgenda'];
dataManager: DataManager = new DataManager({
  url: endpoint+'api/calendar/?speciality='+this.route.snapshot.params.speciality,



  crudUrl: endpoint+'api/calendar/',
  adaptor: new UrlAdaptor,
  headers: [{ 'Authorization': 'Bearer ' + this.token}]
});
public eventSettings: EventSettingsModel = { dataSource: this.dataManager };

public scheduleViews: View[] = [ 'Month','Agenda' ];
public showWeekend: boolean = true;

  constructor( public service: ServiceService,private route: ActivatedRoute) {
   }


   

  ngOnInit() {
    console.log("RESPONSE HERE",this.dataManager.dataSource.data)
   
  }
  

onPopupOpen(args: PopupOpenEventArgs): void {
 
}
public onCloseClick(): void {
  this.scheduleObj.quickPopup.quickPopupHide();
}
public onDeleteClick(args: any): void {
  this.onCloseClick();
  if (this.selectionTarget) {
  const eventData: { [key: string]: Object } = this.scheduleObj.getEventDetails(this.selectionTarget) as { [key: string]: Object };
  let currentAction: CurrentAction;
  if (!isNullOrUndefined(eventData.RecurrenceRule) && eventData.RecurrenceRule !== '') {
      currentAction = args.target.classList.contains('e-delete-series') ? 'DeleteSeries' : 'DeleteOccurrence';
  }
  this.scheduleObj.deleteEvent(eventData, currentAction);
  }
}
public onAddClick(): void {
  this.onCloseClick();
  console.log('tunaadd data')
  const data: Object = this.scheduleObj.getCellDetails(this.scheduleObj.getSelectedElements()) as Object;
  const eventData: { [key: string]: Object } = this.scheduleObj.eventWindow.getObjectFromFormData('e-quick-popup-wrapper');
  this.scheduleObj.eventWindow.convertToEventData(data as { [key: string]: Object }, eventData);
  eventData.Id = this.scheduleObj.eventBase.getEventMaxID() as number + 1;
  this.scheduleObj.addEvent(eventData);
}

public onEditClick(args: any,$event): void {
  console.log($event)
//   if (this.selectionTarget) {
// let eventData: { [key: string]: Object } = this.scheduleObj.getEventDetails(this.selectionTarget) as { [key: string]: Object };
// console.log("target",this.selectionTarget)
// console.log('EVENT DATA',eventData)
let currentAction: CurrentAction = 'Save';

// console.log("TEST", eventData);

// this.scheduleObj.openEditor(eventData, currentAction);
// console.log('objs',this.scheduleObj)

}
public onDetailsClick(): void {
  this.onCloseClick();
  const data: Object = this.scheduleObj.getCellDetails(this.scheduleObj.getSelectedElements()) as Object;
  this.scheduleObj.openEditor(data, 'Add');
}
}
