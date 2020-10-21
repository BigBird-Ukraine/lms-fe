import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {AdminRoomService} from '../../services';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ITable} from '../../interfaces';
import {DayPilot, DayPilotCalendarComponent} from 'daypilot-pro-angular';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  spinnerStatus = false;
  deleteStatus = false;

  tableUsers: ITable[];

  @ViewChild('calendar', {static: false})
  calendar: DayPilotCalendarComponent;

  events: any[] = [];
  config: DayPilot.CalendarConfig;

  constructor(private roomService: AdminRoomService,
              public dialogRef: MatDialogRef<TableComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.spinnerStatus = true;
    this.roomService.getUsersOfTables(this.data.roomId, this.data.tableNumber).subscribe(res => {
      this.tableUsers = res;
      this.spinnerStatus = false;
    }, err => this.spinnerStatus = false);
  }

  deleteUserBooking(rentStart: Date, idBooking: string) {
    this.spinnerStatus = true;
    this.roomService.deleteUserOfTable(rentStart, idBooking, this.data.roomId).subscribe(
      res => {
        this.tableUsers = this.tableUsers.filter(tb => tb._id !== idBooking);
        this.spinnerStatus = false;
        this.deleteStatus = true;
      },
      err => {
        this.spinnerStatus = false;
      }
    );
  }
}
