import { Component, OnInit } from '@angular/core';
import { EventSettingsModel, WeekService, TimelineViewsService, MonthService,PopupOpenEventArgs,TimelineMonthService, View, WorkHoursModel, GroupModel, DayService } from '@syncfusion/ej2-angular-schedule';
import { DataManager, WebApiAdaptor, ODataV4Adaptor, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { ServiceService,endpoint } from '../../../service.service';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { createElement } from '@syncfusion/ej2-base';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { ActivatedRoute } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [DayService,WeekService, TimelineViewsService, MonthService, TimelineMonthService]
})
export class CalendarComponent implements OnInit {
token: string = sessionStorage.getItem('Token');
selectedDate: Date = new Date();

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
    console.log("RESPONSE HERE",this.dataManager)
   
  }
  

onPopupOpen(args: PopupOpenEventArgs): void {
 
}


}
// import { ServiceService } from '../../../service.service';

// import { Component, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
// import { extend, isNullOrUndefined } from '@syncfusion/ej2-base';
// import {
//   ScheduleComponent, ActionEventArgs, PopupOpenEventArgs, EventRenderedArgs, RenderCellEventArgs, DragAndDropService,
//   TimelineViewsService, GroupModel, EventSettingsModel, ResizeService, TimeScaleModel, WorkHoursModel, View
// } from '@syncfusion/ej2-angular-schedule';
// import { ActivatedRoute } from '@angular/router';
// // import { roomData } from './data';
// @Component({
//   selector: 'app-calendar',
//   templateUrl: './calendar.component.html',
//   styleUrls: ['./calendar.component.scss'],
//    providers: [TimelineViewsService, ResizeService, DragAndDropService]

//   // providers: [DayService,WeekService, TimelineViewsService, MonthService, TimelineMonthService]
// })



// export class CalendarComponent {
//   public selectedDate: Date = new Date(2021, 7, 2);
//   public timeScale: TimeScaleModel = { interval: 180, slotCount: 4 };
//   public workHours: WorkHoursModel = { start: '08:00', end: '18:00' };
//   public currentView: View = 'TimelineWeek';
//   public group: GroupModel = {
//     enableCompactView: false,
//     // resources: ['MeetingRoom']
   
//   };
//   dataSource:any={}
//   data;
//   Description
//   EndTime
//   StartTime
//   Subject
//   public resourceDataSource: Record<string, any>[] = [
//     // { text: this.dataSource, id: 1, color: '#ea7a57', capacity: 20, type: 'Conference' },
//     // { text: 'Tweety', id: 2, color: '#7fa900', capacity: 7, type: 'Cabin' },
//     // { text: 'Nestle', id: 3, color: '#5978ee', capacity: 5, type: 'Cabin' },
//     // { text: 'Phoenix', id: 4, color: '#fec200', capacity: 15, type: 'Conference' },
//     // { text: 'Mission', id: 5, color: '#df5286', capacity: 25, type: 'Conference' },
//     // { text: 'Hangout', id: 6, color: '#00bdae', capacity: 10, type: 'Cabin' },
//     // { text: 'Rick Roll', id: 7, color: '#865fcf', capacity: 20, type: 'Conference' },
//     // { text: 'Rainbow', id: 8, color: '#1aaa55', capacity: 8, type: 'Cabin' },
//     // { text: 'Swarm', id: 9, color: '#df5286', capacity: 30, type: 'Conference' },
//     // { text: 'Photogenic', id: 10, color: '#710193', capacity: 25, type: 'Conference' }
//   ];
//   constructor(private route: ActivatedRoute,public service:ServiceService,) { }

//   ngOnInit(){
//     this.service.CalendarData(this.route.snapshot.params.id).subscribe((res)=>{
//       this.dataSource=res;
     
     
//       console.log("HEALTHIX",res[0].Description)
//       console.log("MMMMM",this.dataSource)
//       this.Description=res[0].Description
//       this.StartTime=res[0].StartTime
//       this.EndTime=res[0].EndTime
//       this.Subject=res[0].Subject
      
      
//     })
    
//     }  
   
   
//       // this.service.CalendarData(this.data).subscribe((res) => {
//       //   this.dataSource=res
//       //   console.log("RESP DATA",res)
     
      
//       //   });
  
//   // }
//   public allowMultiple = true;
//   dataManager: DataManager = new DataManager({
  
// });
// public eventSettings: EventSettingsModel = { dataSource: this.dataManager };

//   // public eventSettings: EventSettingsModel = {
//   //   dataSource:{}
//   //   fields: {
//   //     id: 'Id',
//   //     subject: { title: 'Summary', name: 'Subject' },
//   //     location: { title: 'Location', name: 'Location' },
//   //     description: { title: 'Comments', name: 'Description' },
//   //     startTime: { title: 'From', name: 'StartTime' },
//   //     endTime: { title: 'To', name: 'EndTime' }
//   //   }
//   // };

//   // @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;



//   public isReadOnly(endDate: Date): boolean {
//     return (endDate < new Date(2021, 6, 31, 0, 0));
//   }

//   // public onPopupOpen(args: PopupOpenEventArgs): void {
//   //   const data: Record<string, any> = args.data as Record<string, any>;
//   //   if (args.type === 'QuickInfo' || args.type === 'Editor' || args.type === 'RecurrenceAlert' || args.type === 'DeleteAlert') {
//   //     const target: HTMLElement = (args.type === 'RecurrenceAlert' ||
//   //       args.type === 'DeleteAlert') ? args.element[0] : args.target;
//   //     if (!isNullOrUndefined(target) && target.classList.contains('e-work-cells')) {
//   //       if ((target.classList.contains('e-read-only-cells')) ||
//   //         (!this.scheduleObj.isSlotAvailable(data))) {
//   //         args.cancel = true;
//   //       }
//   //     } else if (!isNullOrUndefined(target) && target.classList.contains('e-appointment') &&
//   //       (this.isReadOnly(data.EndTime as Date))) {
//   //       args.cancel = true;
//   //     }
//   //   }
//   // }

//   // public onActionBegin(args: ActionEventArgs): void {
//   //   if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
//   //     let data: Record<string, any>;
//   //     if (args.requestType === 'eventCreate') {
//   //       data = (args.data[0] as Record<string, any>);
//   //     } else if (args.requestType === 'eventChange') {
//   //       data = (args.data as Record<string, any>);
//   //     }
//   //     if (!this.scheduleObj.isSlotAvailable(data)) {
//   //       args.cancel = true;
//   //     }
//   //   }
//   // }

//   public onRenderCell(args: RenderCellEventArgs): void {
//     if (args.element.classList.contains('e-work-cells')) {
//       if (args.date < new Date(2021, 6, 31, 0, 0)) {
//         args.element.setAttribute('aria-readonly', 'true');
//         args.element.classList.add('e-read-only-cells');
//       }
//     }
//     if (args.elementType === 'emptyCells' && args.element.classList.contains('e-resource-left-td')) {
//       const target: HTMLElement = args.element.querySelector('.e-resource-text') as HTMLElement;
//       target.innerHTML = '<div class="name">Rooms</div><div class="type">Type</div><div class="capacity">Capacity</div>';
//     }
//   }

//   public onEventRendered(args: EventRenderedArgs): void {
//     const data: Record<string, any> = args.data;
//     if (this.isReadOnly(data.EndTime as Date)) {
//       args.element.setAttribute('aria-readonly', 'true');
//       args.element.classList.add('e-read-only');
//     }
//   }

// }

