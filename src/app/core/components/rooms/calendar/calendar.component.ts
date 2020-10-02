import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {DayPilot, DayPilotCalendarComponent} from 'daypilot-pro-angular';
import {DatePipe} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

import {RoomsService} from '../../../services/rooms';
import {IBookRoomSetting, IBookUserFull} from '../../../interface';
import {ConfirmLayoutComponent} from '../../../../shared/components/confirm-layout/confirm-layout.component';
import {CustomSnackbarService} from '../../../../shared/services';
import {DeleteComponent} from '../../../../shared/components/delete/delete.component';
import {IoSocketService} from '../../../../shared/ioSockets/io-socket.service';


@Component({
  selector: 'app-calendar-component',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [DatePipe]
})
export class CalendarComponent implements OnInit {
  @Input() tableSetting: IBookRoomSetting;

  @ViewChild('calendar', {static: false})
  calendar: DayPilotCalendarComponent;

  events: any[] = [];
  config: DayPilot.CalendarConfig;
  status = false;
  closeStatus = false;

  bonedNgOnInit = this.ngOnInit.bind(this);
  bonedRefreshEvents = this.refreshEvents.bind(this);
  bonedSetCloseStatus = this.setCloseStatus.bind(this);


  constructor(private roomService: RoomsService,
              private datePipe: DatePipe,
              private dialog: MatDialog,
              private dialogRef: MatDialogRef<CalendarComponent>,
              private customSnackbarService: CustomSnackbarService,
              private ioService: IoSocketService,
              @Inject(MAT_DIALOG_DATA) public data: IBookRoomSetting) {
    this.tableSetting = data;

    ioService.joinToTable(data.roomId + '/' + data.tableNumber);
    ioService.addBookedUser((res) => {
      if (res.bookUserTable) {
        console.log(res);
        this.fillEvents([res.bookUserTable]);
      }
    });
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
    const {_id} = this.tableSetting.userInfo;
    bookedUsers.forEach(bUser => {
      const start = this.formatDate(bUser.rent_start);
      const end = this.formatDate(bUser.rent_end);
      this.events.push(
        {
          _id: bUser._id,
          start,
          end,
          user_id: bUser.user_id._id,
          text: bUser.user_id.name ?  `${bUser.user_id.name} ${bUser.user_id.surname}` : bUser.user_id,
          backColor: bUser.user_id._id === _id && '#FCB57A'
        }
      );
    });
  }

  setConfigs() {
    const {_id} = this.tableSetting.userInfo;
    const roomService = this.roomService;
    const dialog = this.dialog;
    const tableSetting = this.tableSetting;
    const bonedNgOnInit = this.bonedNgOnInit;
    const bonedRefreshEvents = this.bonedRefreshEvents;
    const customSnackbarService = this.customSnackbarService;
    const bonedSetCloseStatus = this.bonedSetCloseStatus;
    const socketService = this.ioService;

    this.config = {
      viewType: 'Day',
      timeFormat: 'Clock24Hours',
      dayEndsHour: new Date(tableSetting.roomCloseAt).getUTCHours() + 1,
      dayBeginsHour: new Date(tableSetting.roomStartAt).getUTCHours(),
      startDate: tableSetting.roomStartAt.toString(),
      allowEventOverlap: false,
      allowMultiSelect: false,
      eventMoveHandling: 'Disabled',
      eventResizeHandling: 'Disabled',

      onTimeRangeSelected(args) {
        const confirm = dialog.open(ConfirmLayoutComponent);
        confirm.afterClosed().subscribe((result) => {
          if (result) {
            socketService.bookTable({
              bookUserTable: {
                rent_start: args.start + 'Z',
                rent_end: args.end + 'Z',
                table_number: tableSetting.tableNumber,
                user_id: _id
              },
              room_id: tableSetting.roomId,
              room: tableSetting.roomId + '/' + tableSetting.tableNumber
            }).subscribe(res => {
              bonedRefreshEvents();
              bonedNgOnInit();
            });
          }
        });
      },

      onEventClick(args) {
        const data = args.e.data;
        if (data.user_id === tableSetting.userInfo._id) {
          dialog.open(DeleteComponent).afterClosed().subscribe((result) => {
            if (result) {
              roomService.deleteBookedUser(data._id, tableSetting.roomId).subscribe(
                () => {
                  bonedRefreshEvents();
                  bonedNgOnInit();
                  bonedSetCloseStatus(true);
                },
                err => customSnackbarService.open(err.error.error.message)
              );
            }
          });
        }
      }
    };
  }

  refreshEvents() {
    this.status = false;
    this.events = [];
  }

  setCloseStatus(value) {
    this.closeStatus = value;
  }
}
