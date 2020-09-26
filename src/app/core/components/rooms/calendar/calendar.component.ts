import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DayPilot, DayPilotCalendarComponent} from 'daypilot-pro-angular';
import {DatePipe} from '@angular/common';

import {RoomsService} from '../../../services/rooms';
import {IBookRoomSetting, IBookUserFull} from '../../../interface';


@Component({
  selector: 'app-calendar-component',
  template: `
    <daypilot-calendar *ngIf="status" [config]="config" [events]="events" #calendar></daypilot-calendar>`,
  styles: [``],
  providers: [DatePipe]
})
export class CalendarComponent implements OnInit {
  @Input() tableSetting: IBookRoomSetting;

  @ViewChild('calendar', {static: false})
  calendar: DayPilotCalendarComponent;

  events: any[] = [];
  config: DayPilot.CalendarConfig;
  status = false;

  constructor(private roomService: RoomsService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.roomService.getBookTable(this.tableSetting.roomId, this.tableSetting.tableNumber)
      .subscribe(bookedUsers => {
        this.setConfigs();
        this.fillEvents(bookedUsers);
        this.status = true;
      });
  }

  formatDate(dateZ: Date) {
    const fullDateZ = new Date(dateZ);
    fullDateZ.setHours(fullDateZ.getHours() - 3);

    return this.datePipe.transform(fullDateZ, 'yyyy-MM-ddTHH-mm-ss');
  }

  fillEvents(bookedUsers: IBookUserFull[]) {
    let index = 0;
    bookedUsers.forEach(bUser => {
      const start = this.formatDate(bUser.rent_start);
      const end = this.formatDate(bUser.rent_end);
      index++;

      this.events.push({id: index, start, end, text: `${bUser.user_id.name} ${bUser.user_id.surname}`});
    });
  }

  setConfigs() {
    this.config = {
      viewType: 'Day',
      timeFormat: 'Clock24Hours',
      dayEndsHour: new Date(this.tableSetting.roomCloseAt).getUTCHours() + 1,
      dayBeginsHour: new Date(this.tableSetting.roomStartAt).getUTCHours(),
      startDate: this.tableSetting.roomStartAt.toString()
    };
  }

}
