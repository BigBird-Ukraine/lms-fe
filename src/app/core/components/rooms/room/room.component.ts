import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import {ICutRoom} from '../../../interface';
import {UserService} from '../../../services/user';
import {RoomsService} from '../../../services/rooms';
import {CalendarComponent} from '../calendar/calendar.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  room: ICutRoom;

  startAt: Date;
  closeAt: Date;

  constructor(private route: ActivatedRoute,
              private dialog: MatDialog,
              private userService: UserService,
              private roomsService: RoomsService) {
  }

  ngOnInit() {
    this.route.data
      .subscribe(
        res => {
          this.room = res.singleRoomResolverService;
          this.startAt = this.getDateWithoutTimeZone(this.room.start_at);
          this.closeAt = this.getDateWithoutTimeZone(this.room.close_at);
        });
  }

  openForm(tableNumber: number) {
    this.dialog.open(CalendarComponent, {
        width: '90vw',
        height: '90vh',
        data: {
          tableNumber,
          roomId: this.room._id,
          roomCloseAt: this.room.close_at,
          roomStartAt: this.room.start_at,
          userInfo: this.userService.userInfo.value
        },
        disableClose: true
      }
    ).afterClosed().subscribe((res) => {
      if (res) {
        this.roomsService.getSingleRoom(this.room._id).subscribe((room) => {
          this.room = room;
        });
      }
    });
  }


  getDateWithoutTimeZone(dateZ: string) {
    const dTimezone = new Date();
    const offset = dTimezone.getTimezoneOffset() / 60;
    const date = new Date(Date.parse(dateZ));
    date.setHours(date.getHours() + offset);
    return date;
  }

  checkBookedTables(tableNumber: number) {
    const iBookUser = this.room.idPlaces.find(id => id === tableNumber);
    return !!iBookUser;
  }

}
