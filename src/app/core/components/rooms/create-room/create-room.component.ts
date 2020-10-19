import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';

import {Groups, IIp, IRoom, ISettingRoom, IUser, IValidDate, UserModel} from '../../../interface';
import {InfoHelperService} from '../../../services/questions';
import {RoomsService} from '../../../services/rooms';
import {CustomSnackbarService} from '../../../../shared/services';
import {IpService} from '../../../services/ip';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {

  roomForm: FormGroup;
  startAt: string;
  closeAt: string;

  spinnerStatus = false;
  confirmStatus = false;

  group: string[] = [];
  groupForAuto: Groups[] = [];
  groupsId: string[] = [];

  citiesForAuto: string[] = [];
  addressForAuto: IIp[];
  settingRoomForAuto: Partial<ISettingRoom[]>;

  fullSettingRoom: ISettingRoom;

  ips: IIp[];

  constructor(private infoService: InfoHelperService, private fb: FormBuilder,
              private roomService: RoomsService, private customSnackbarService: CustomSnackbarService,
              private ipService: IpService, private dialogRef: MatDialogRef<CreateRoomComponent>) {
  }

  ngOnInit() {
    this.infoService.getGroups().subscribe((groups: Groups[]) => this.groupForAuto = groups);
    this.roomService.selectSettingRoomsByParams('{"label": "1"}').subscribe(settingRooms => {
      this.settingRoomForAuto = settingRooms;
    });
    this.ipService.getIps().subscribe(res => {
      this.ips = res;
    });
  }

  createRoom() {
    const room: IRoom = this.roomForm.value;
    room.groups = this.groupsId;
    room.start_at = this.startAt;
    room.close_at = this.closeAt;

    this.spinnerStatus = true;
    this.roomService.createRoom(room).subscribe(() => {
      this.spinnerStatus = false;
      this.customSnackbarService.open('Кімнату додано', '');
      this.dialogRef.close(true);
    }, err => {
      this.spinnerStatus = false;
      this.customSnackbarService.open(err.error.error.message, '');
    });
  }

  newGroups(group) {
    const label = group.target.value;

    if (label.length) {
      const [filterGroup] = this.groupForAuto.filter(groupRes => groupRes.label === label);
      this.group.push(label);
      this.groupsId.push(filterGroup._id);
    }
    group.target.value = '';
  }

  changedDate(changedDate: IValidDate) {
    const {start_at, close_at, status} = changedDate;

    if (status) {
      this.startAt = start_at;
      this.closeAt = close_at;
      this.confirmStatus = true;
    } else {
      this.confirmStatus = false;
    }
  }

  getFullSettingRoom(event: any) {
    const {id, label} = event.value;

    this.roomService.getSettingRoomsById(id).subscribe(room => {
      this.citiesForAuto = [...room[0].cities];
      this.roomForm = this.fb.group({
        label: this.fb.control(label),
        description: this.fb.control(null, [Validators.required]),

        count_all_places: this.fb.control(room[0].count_places,
          [Validators.required,
            Validators.pattern(/^-?(0|[1-9]\d*)?$/),
            Validators.min(1),
            Validators.max(room[0].count_places)]),

        start_at: this.fb.control(null),
        close_at: this.fb.control(null),
        city: this.fb.control(null, [Validators.required]),
        groups: this.fb.array([]),
        ip_address: this.fb.control(null)
      });

      this.roomForm.controls.city.valueChanges.subscribe((res) => {
        this.addressForAuto = this.ips.filter(ip => ip.city === res);
      });
      this.fullSettingRoom = room[0];
    });
  }

  delGroup(label: string) {
    this.group = this.group.filter(group => group !== label);
  }
}
