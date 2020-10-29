import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

import {RoomsService} from '../../../services/rooms';
import {IRoom} from '../../../interface';
import {HelperService} from '../../../../shared/services/helper.service';
import {DeleteComponent} from '../../../../shared/components/delete/delete.component';
import {IoSocketService} from '../../../../shared/ioSockets/io-socket.service';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.scss']
})
export class MyBookingComponent implements OnInit {

  myBooking: Partial<IRoom[]>;
  address: any;
  ip: string;

  constructor(private dialogRef: MatDialogRef<MyBookingComponent>,
              private roomService: RoomsService,
              private dialog: MatDialog,
              public dateHelperService: HelperService,
              public socketService: IoSocketService) {
    socketService.removeUserOfTable(res => {
      const rentStart = new Date(res.rent_start).getTime();
      this.myBooking = this.myBooking.map((bk => {
          return {
            ...bk,
            booked_users: bk.booked_users.filter(bu => {
              const rentS = new Date(bu.rent_start).getTime();
              return rentStart !== rentS;
            })
          };
        })
      );
      this.socketService.setSpinnerStatus(false);
    });
  }

  ngOnInit() {
    this.roomService.getMyBooking().subscribe(res => {
      this.dateHelperService.getIPAddress().subscribe(resIp => {
        this.ip = resIp.ip;
        this.getMyGeolocation();
        this.myBooking = res;
      });
    });
  }

  cancelBooking(data, roomId: string) {
    this.dialog.open(DeleteComponent, {
      data: 'ваше бронювання ?..'
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.socketService.setSpinnerStatus(true);
        this.socketService.joinToTable({room: roomId + '/' + data.table_number});

        this.socketService.cancelBook({
          table_number: data.table_number,
          room_id: roomId,
          rent_start: data.rent_start,
          room: roomId + '/' + data.table_number,
        }).subscribe();
      }
    });
  }

  checkConfirmStatus(rentStatus: number) {
    if (rentStatus) {
      return true;
    }
  }

  checkDates(rentStart: string, rentStatus: number, rentEnd: string) {
    if (rentStatus) {
      return true;
    } else {
      const curDate = new Date().getTime();
      const rentS = this.dateHelperService.getDateWithoutTimeZone(rentStart);
      const rentE = this.dateHelperService.getDateWithoutTimeZone(rentEnd);

      return !(curDate >= rentS.getTime() && curDate <= rentE.getTime());
    }
  }

  confirmBooking(roomId: string, tableNumber: number, id: string) {
    this.socketService.setSpinnerStatus(true);
    this.roomService.confirmBooking(roomId, tableNumber, {_id: id, address: this.address, ip: this.ip}).subscribe(res => {
        this.myBooking = this.myBooking.map((bk => {
            return {
              ...bk,
              booked_users: bk.booked_users.map(bu => {
                if (bu._id === id) {
                  bu.confirm_status = 1;
                }
                return bu;
              })
            };
          })
        );
        this.socketService.setSpinnerStatus(false);
      },
      err => this.socketService.setSpinnerStatus(false));
  }

  getMyGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: Position) => {
          this.address = {latitude: position.coords.latitude, longitude: position.coords.longitude};
        });
    }
  }


}
