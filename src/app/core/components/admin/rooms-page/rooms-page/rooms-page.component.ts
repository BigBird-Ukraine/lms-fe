import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';

import {IRoom, ISettingRoom} from '../../interfaces';
import {CreateSettingsRoomComponent} from '../create-settings-room/create-settings-room.component';
import {AdminRoomService} from '../../services';
import {CreateRoomComponent} from '../create-room/create-room.component';
import {EditRoomComponent} from '../edit-room/edit-room.component';
import {ActivatedRoute, Router} from '@angular/router';

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

  constructor(private dialog: MatDialog,
              private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private roomService: AdminRoomService) {
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

  deleteSettingRoom(id: string) {
    this.roomService.deleteSettingRoom(id).subscribe(res => {
      this.settingRooms = this.settingRooms.filter(room => room._id !== id);
    });
  }

  showFiltered() {
    this.isFiltered = true;
    const keys = Object.keys(this.filterRoomForm.value);

    keys.forEach(key => {
      if (!this.filterRoomForm.value[key]) {
        delete this.filterRoomForm.value[key];
      }
    });

    this.router.navigate(['/admin/adminPanel/rooms'], {
      queryParams: {
        ...this.filterRoomForm.value
      }
    });

    this.activatedRoute.queryParams.subscribe((params: object) => {
      this.roomService.getRoomsByParams(params).subscribe((roomsData: IRoom[]) => {
        if (roomsData) {
          this.roomsList = roomsData;
        } else {
          this.roomsList = [];
        }
      });
    });
    this.filterRoomForm.reset();
  }

  openForm() {
    this.dialog.open(CreateRoomComponent, {width: '100vw', height: '100vh'}).afterClosed().subscribe(
      (res) => res && this.ngOnInit())
    ;
  }

  editRoom(room) {
    this.dialog.open(EditRoomComponent, {
      data: room,
      width: '90vw',
      height: '90vh'
    }).afterClosed().subscribe(res => res && this.ngOnInit());
  }

  showRoom(id: string) {
    this.router.navigate([`/admin/adminPanel/rooms/${id}`]);
  }

  deleteRoom(id: string) {
    this.roomService.deleteRoom(id).subscribe(res => {
      this.roomsList = this.roomsList.filter(room => room._id !== id);
    });
  }
}
