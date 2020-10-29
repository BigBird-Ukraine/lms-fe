import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import {HelperService} from '../../../../../shared/services/helper.service';
import {CalendarComponent} from '../../../rooms/calendar/calendar.component';
import {AdminRoomService, AdminUsersService} from '../../services';
import {TableComponent} from '../table/table.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  room: any;

  startAt: Date;
  closeAt: Date;

  constructor(private route: ActivatedRoute,
              private dialog: MatDialog,
              private userService: AdminUsersService,
              private roomsService: AdminRoomService,
              private dateHelperService: HelperService) {
  }

  ngOnInit() {
    this.route.data
      .subscribe(
        res => {
          this.room = res.singleRoomAdminResolverService;
          this.startAt = this.dateHelperService.getDateWithoutTimeZone(this.room.start_at);
          this.closeAt = this.dateHelperService.getDateWithoutTimeZone(this.room.close_at);
        });
  }

  openForm(tableNumber: number) {
    this.dialog.open(TableComponent, {
        width: '90vw',
        height: '90vh',
        data: {
          tableNumber,
          roomId: this.room._id,
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
}
