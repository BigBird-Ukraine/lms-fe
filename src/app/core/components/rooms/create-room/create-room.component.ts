import {Component, OnInit} from '@angular/core';
import {Groups, ICity, IRoom, IValidDate} from '../../../interface';
import {InfoHelperService} from '../../../services/questions';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoomsService} from '../../../services/rooms';
import {CustomSnackbarService} from '../../../../shared/services';
import {MatDialogRef} from '@angular/material';

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

  citiesForAuto: Partial<ICity>[] = [];

  constructor(private infoService: InfoHelperService, private fb: FormBuilder,
              private roomService: RoomsService, private customSnackbarService: CustomSnackbarService,
              private dialogRef: MatDialogRef<CreateRoomComponent>) {
    this.roomForm = this.fb.group({
      label: this.fb.control(null, [Validators.required]),
      description: this.fb.control(null, [Validators.required]),
      count_all_places: this.fb.control(null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.min(1)]),
      start_at: this.fb.control(null),
      close_at: this.fb.control(null),
      city: this.fb.control(null, [Validators.required]),
      groups: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.infoService.getCities().subscribe((cities: ICity[]) => this.citiesForAuto = cities);
    this.infoService.getGroups().subscribe((groups: Groups[]) => this.groupForAuto = groups);
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
      this.dialogRef.close(false);
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
}
