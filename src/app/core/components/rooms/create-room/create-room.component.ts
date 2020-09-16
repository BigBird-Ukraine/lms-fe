import {Component, OnInit} from '@angular/core';
import {Groups, ICity, IGroup, IRoom} from '../../../interface';
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

  minDate = this.getDate();
  spinnerStatus = false;

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
      count_all_places: this.fb.control(null, [
        Validators.required,
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        Validators.min(1)
      ]),
      start_at: this.fb.control(null, [Validators.required]),
      close_at: this.fb.control(null, [Validators.required]),
      city: this.fb.control(null, [Validators.required]),
      groups: this.fb.array([]),
    });
  }


  ngOnInit() {
    this.getCities();
    this.getGroups();
  }

  getGroups() {
    this.infoService.getGroups().subscribe((groups: Groups[]) => this.groupForAuto = groups);
  }

  getCities() {
    this.infoService.getCities().subscribe((cities: ICity[]) => this.citiesForAuto = cities);
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


  getDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = `${today.getMonth() + 1}`.padStart(2, '0');
    const day = `${today.getDate()}`.padStart(2, '0');
    const time = `T${today.getHours()}:${today.getMinutes()}`;
    return [year, month, day].join('-') + time;
  }

  createRoom() {
    const room: IRoom = this.roomForm.value;
    room.groups = this.groupsId;

    this.spinnerStatus = true;
    this.roomService.createRoom(room).subscribe(res => {
      this.spinnerStatus = false;
      this.customSnackbarService.open('Кімнату додано', '');
      this.dialogRef.close(true);
    }, err => {
      this.spinnerStatus = false;
      this.customSnackbarService.open(err.error.error.message, '');
      this.dialogRef.close(false);
    });
  }

  checkValidCloseDate() {
    const {start_at, close_at} = this.roomForm.value;
    return new Date(start_at) > new Date(close_at);
  }
}
