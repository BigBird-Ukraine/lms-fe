import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Groups, ICity, IGroup, IIp, IRoom, ISettingRoom} from '../../../interface';
import {RoomsService} from '../../../services/rooms';
import {InfoHelperService} from '../../../services/questions';
import {IpService} from '../../../services/ip';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.scss']
})
export class EditRoomComponent implements OnInit {
  spinnerStatus = false;
  statusTime = true;

  settingRoom: ISettingRoom;
  room: IRoom;

  roomForm: FormGroup;

  citiesForAuto: ICity[] = [];
  groupForAuto: Groups[] = [];
  groups: any = [];
  groupsId: string[] = [];

  ips: IIp[];
  addressForAuto: IIp[];

  constructor(private roomService: RoomsService,
              private dialogRef: MatDialogRef<EditRoomComponent>,
              private fb: FormBuilder,
              private infoService: InfoHelperService,
              private ipService: IpService,
              @Inject(MAT_DIALOG_DATA) public data: IRoom
  ) {
    this.room = data;
    this.groups = data.groups;

    this.infoService.getCities().subscribe((cities: ICity[]) => this.citiesForAuto = cities);
    this.infoService.getGroups().subscribe((groups: IGroup[]) => this.groupForAuto = groups);
    this.ipService.getIps().subscribe(res => {
      this.ips = res;
      this.addressForAuto = this.ips.filter(ip => ip.city === this.room.city);
    });

    this.roomService.getSettingRoomsByParams({label: this.room.label}).subscribe(room => {
      this.settingRoom = room[0];

      this.roomForm = this.fb.group({
        description: this.fb.control(this.room.description, [Validators.required]),
        count_all_places: this.fb.control(this.room.count_all_places,
          [Validators.required,
            Validators.pattern(/^-?(0|[1-9]\d*)?$/),
            Validators.min(1),
            Validators.max(this.settingRoom.count_places)]),
        start_at: this.fb.control(this.room.start_at),
        close_at: this.fb.control(this.room.close_at),
        city: this.fb.control(this.room.city, [Validators.required]),
        groups: this.fb.array([...this.room.groups]),
        ip_address: this.fb.control(null)
      });

      this.roomForm.controls.city.valueChanges.subscribe((res) => {
        this.addressForAuto = this.ips.filter(ip => ip.city === res);
      });
    });
  }

  ngOnInit() {
  }

  editRoom() {
    const editRoom = this.roomForm.value;
    this.groups.forEach(group => {
      const [filterGroup] = this.groupForAuto.filter(groupRes => groupRes.label === group.label);
      this.groupsId.push(filterGroup._id);
    });
    editRoom.groups = this.groupsId;

    if (!editRoom.ip_address) {
      editRoom.ip_address = this.room.ip_address;
    }

    this.spinnerStatus = true;
    this.roomService.updateRoom(this.room._id, editRoom).subscribe(() => {
      this.spinnerStatus = false;
      this.dialogRef.close(true);
    });
  }

  changedDate($event: any) {
    if ($event.status) {
      this.roomForm.value.start_at = $event.start_at;
      this.roomForm.value.close_at = $event.close_at;
      this.statusTime = true;
    } else {
      this.statusTime = false;
    }
  }

  newGroups(group) {
    const label = group.target.value;

    if (label && label.length) {
      const status = this.groups.find(lab => lab.label === label);
      if (!status) {
        this.groups.push({label});
      }

    }
    group.target.value = '';
  }

  delGroup(label) {
    this.groups = this.groups.filter(group => group.label !== label);
  }
}
