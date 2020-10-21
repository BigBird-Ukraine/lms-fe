import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import {ICutRoom} from '../../../interface';
import {UserService} from '../../../services/user';
import {RoomsService} from '../../../services/rooms';
import {CalendarComponent} from '../calendar/calendar.component';
import {HelperService} from '../../../../shared/services/helper.service';
import {IoSocketService} from '../../../../shared/ioSockets/io-socket.service';
import {CustomSnackbarService} from '../../../../shared/services';
import {ConfirmLayoutComponent} from '../../../../shared/components/confirm-layout/confirm-layout.component';
import {HelperTextComponent} from '../../../../shared/components/helper-text/helper-text.component';

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
              private roomsService: RoomsService,
              private dateHelperService: HelperService,
              private ioService: IoSocketService) {
  }

  ngOnInit() {
    this.route.data
      .subscribe(
        res => {
          this.room = res.singleRoomResolverService;
          this.startAt = this.dateHelperService.getDateWithoutTimeZone(this.room.start_at);
          this.closeAt = this.dateHelperService.getDateWithoutTimeZone(this.room.close_at);
          this.ioService.joinToTable(null);
        });
  }

  openForm(tableNumber: number) {
    this.dialog.open(CalendarComponent, {
        width: '90vw',
        height: '60vh',
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

  checkBookedTables(tableNumber: number) {
    const iBookUser = this.room.idPlaces.find(id => id === tableNumber);
    return !!iBookUser;
  }

  openHelper() {
   this.dialog.open(HelperTextComponent, {
     width: '60%'
   });
  }
}
