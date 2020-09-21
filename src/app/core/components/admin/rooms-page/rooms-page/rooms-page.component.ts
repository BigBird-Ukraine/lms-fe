import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {ISettingRoom} from '../../interfaces';
import {CreateSettingsRoomComponent} from '../create-settings-room/create-settings-room.component';
import {AdminRoomService} from '../../services/admin-room.service';

@Component({
  selector: 'app-rooms-page',
  templateUrl: './rooms-page.component.html',
  styleUrls: ['./rooms-page.component.scss']
})
export class RoomsPageComponent implements OnInit {
  settingRooms: ISettingRoom[];

  constructor(private dialog: MatDialog, private roomService: AdminRoomService) {
  }

  ngOnInit() {
    this.roomService.getSettingsRoom().subscribe((settingsRooms: ISettingRoom[]) => {
      this.settingRooms = settingsRooms;
    });
  }

  createSettingRoom() {
    this.dialog.open(CreateSettingsRoomComponent).afterClosed().subscribe(
      (res) => res && this.ngOnInit())
    ;
  }

  editSettingRoom(id: string) {

  }

  deleteSettingRoom(id: string) {

  }
}
