import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';

import {IRoom, ISettingRoom} from '../../interfaces';
import {CreateSettingsRoomComponent} from '../create-settings-room/create-settings-room.component';
import {AdminRoomService} from '../../services/admin-room.service';
import {CreateRoomComponent} from "../create-room/create-room.component";


@Component({
    selector: 'app-rooms-page',
    templateUrl: './rooms-page.component.html',
    styleUrls: ['./rooms-page.component.scss']
})
export class RoomsPageComponent implements OnInit {
    settingRooms: ISettingRoom[];
    roomsList: IRoom[];

    roomsForAutocomplete: string[] = [];
    filterRoomForm: FormGroup;
    isFiltered = false;

    constructor(private dialog: MatDialog,  private fb: FormBuilder, private roomService: AdminRoomService) {
    }

    ngOnInit() {
        this.roomService.getSettingsRoom().subscribe((settingsRooms: ISettingRoom[]) => {
            this.settingRooms = settingsRooms;
        });

        this.roomService.getRooms().subscribe((rooms: IRoom[]) => {
            this.roomsList = rooms;
        });

        this.filterRoomForm = this.fb.group({
            label: this.fb.control(null)
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

    showFiltered() {

    }

    openForm() {
      this.dialog.open(CreateRoomComponent, {width: '100vw', height: '100vh'}).afterClosed().subscribe(
          (res) => res && this.ngOnInit())
      ;
    }

    editRoom(id: string) {

    }

    deleteRoom(id: string) {

    }

    showRoom(id: string) {

    }
}
