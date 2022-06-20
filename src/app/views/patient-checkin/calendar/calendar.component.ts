import { Component, OnInit, ViewChild } from '@angular/core';
// import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, EventSettingsModel, PopupOpenEventArgs,TimelineViewsService, MonthAgendaService} from '@syncfusion/ej2-angular-schedule';
import { EventSettingsModel, WeekService, TimelineViewsService, MonthService,PopupOpenEventArgs,TimelineMonthService, View, WorkHoursModel, GroupModel, CurrentAction, ScheduleComponent } from '@syncfusion/ej2-angular-schedule';
import { DataManager, WebApiAdaptor, ODataV4Adaptor, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { ServiceService,endpoint } from '../../../service.service';
import { DropDownList } from '@syncfusion/ej2-dropdowns';"/home/mwangangi/Healthix/FE/admin/node_modules/@syncfusion/ej2-data/index"
import { createElement } from '@syncfusion/ej2-base';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { extend, Internationalization,isNullOrUndefined } from '@syncfusion/ej2-base';
// import { ToastrService } from 'ngx-toastr/toastr/toastr.service';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [WeekService, TimelineViewsService, MonthService, TimelineMonthService]
})
export class CalendarComponent implements OnInit {
token: string = sessionStorage.getItem('Token');
selectedDate: Date = new Date();
data={
  Subject:''
}
booking_event:any={
  StartTime:"",
  EndTime:"",
  clinic:"",
  Subject:"",
  id:"",


}
maxDate;
clinics;
public scheduleObj: ScheduleComponent;
private selectionTarget: Element;
@ViewChild('editEventModal', { static: false }) editEventModal: ModalDirective;
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
  clinic_selected: any;
  constructor( public service: ServiceService,private toast: ToastrService) {
   }

  ngOnInit() {
    this.getClinics()
  }
  getClinics(){
    this.service.getClinicsCalendar().subscribe((res)=>{
      this.clinics=res;
      this.ownerDataSource = res;
      console.log("data",this.ownerDataSource)
    })
  }

clinicClicked(item){
  this.clinic_selected=item;
  this.service.getClinicAppointments(item.id).subscribe(res=>{
    this.eventSettings= { dataSource: extend([], res, null, true) as Record<string, any>[] }
  },err=>{})

  }
onPopupOpen(args: PopupOpenEventArgs): void {
  var data=args.data
  var date=new Date(data.StartTime)
  this.booking_event=data
  var d=(date.getMonth()+1).toString()+"/"+date.getDate().toString()+"/"+date.getFullYear().toString()
  var t=date.getHours().toString()+":"+(date.getMinutes().toString().length==1 ? "0"+date.getMinutes().toString() :date.getMinutes().toString() )
  
  this.booking_event['StartTime']=d+" "+t
   date=new Date(data.EndTime)
   d=(date.getMonth()+1).toString()+"/"+date.getDate().toString()+"/"+date.getFullYear().toString()
   t=date.getHours().toString()+":"+(date.getMinutes().toString().length==1 ? "0"+date.getMinutes().toString() :date.getMinutes().toString() )
  this.booking_event['EndTime']=d+" "+t
  args.cancel=true;

  this.editEventModal.show()
  console.log("arguments",args.data)
  console.log("event selected",this.booking_event)
  
}
Reschedule(){
  console.log('backend data',this.booking_event)
  this.service.CalendarDataedit(this.booking_event).subscribe((res)=>{
      
    // console.log(res)
    this.toast.success('Success','Appointment rescheduled successfully' )
    this.editEventModal.hide()
   
  },(err)=>{
    this.toast.warning('Error','Appointment rescheduled failed' )
  })
}
public onDetailsClick(): void {
  this.onCloseClick();
  const data: Object = this.scheduleObj.getCellDetails(this.scheduleObj.getSelectedElements()) as Object;
  this.scheduleObj.openEditor(data, 'Add');
}
public onAddClick(): void {
 ;
}
public onEditClick(args: any): void {

}
public onDeleteClick(args: any): void {
 
}
public onCloseClick(): void {
  this.scheduleObj.quickPopup.quickPopupHide();
}



}






