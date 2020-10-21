import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

import {AdminRoomService} from '../../services/admin-room.service';
import {CustomSnackbarService} from '../../../../../shared/services';
import {ICity} from '../../interfaces';
import {AdminCityService} from '../../services/admin-city.service';

@Component({
  selector: 'app-create-settings-room',
  templateUrl: './create-settings-room.component.html',
  styleUrls: ['./create-settings-room.component.scss']
})
export class CreateSettingsRoomComponent implements OnInit {
  form: FormGroup;
  startAtForm: FormControl = this.createFormControl();
  closeAtForm: FormControl = this.createFormControl();

  statusTime = false;
  spinnerStatus = false;

  hourStep = 1;
  minuteStep = 30;

  citiesForAuto: ICity[];
  cities: Partial<ICity[]> = [];

  constructor(private dialog: MatDialog,
              private dialogRef: MatDialogRef<any>,
              private customSnackbarService: CustomSnackbarService,
              private roomService: AdminRoomService,
              private cityService: AdminCityService
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      label: new FormControl(null, [Validators.required, Validators.min(1)]),
      start_at: new FormControl(null, [Validators.min(1)]),
      close_at: new FormControl(null, [Validators.min(1)]),
      count_places: new FormControl(null, [Validators.required, Validators.min(1), Validators.pattern('^[0-9]{1,3}$')]),
      cities: new FormControl([])
    });

    this.cityService.getCities().subscribe(res => this.citiesForAuto = res);
  }

  saveSettingRoom() {
    const roomSetting = this.form.value;
    roomSetting.start_at = this.startAtForm.value;
    roomSetting.close_at = this.closeAtForm.value;
    roomSetting.cities = this.cities;

    this.roomService.createSettingRoom(roomSetting).subscribe(() => {
      this.spinnerStatus = false;
      this.customSnackbarService.open('Настройки на кімнату додано', '');
      this.dialogRef.close(true);
    }, err => {
      this.spinnerStatus = false;
      this.customSnackbarService.open(err.error.error.message, '');
      this.dialogRef.close(false);
    });


  }

  createFormControl() {
    return new FormControl('', (control: FormControl) => {
      const {value} = control;

      if (!value || (!value.minute && value.minute !== 0)) {
        return null;
      }

      if (value.minute % 30 !== 0) {
        return {invalidMinute: true};
      }
    });
  }

  timePickerChange() {
    const startFullDate = this.startAtForm.value && this.getFullDate(this.startAtForm.value).getTime();
    const closeFullDate = this.closeAtForm.value && this.getFullDate(this.closeAtForm.value).getTime();

    startFullDate < closeFullDate ? this.statusTime = true : this.statusTime = false;
  }

  getFullDate(time: { hour: number; minute: number; second: number }) {
    const date = new Date('2020/01/01');
    date.setHours(time.hour);
    date.setMinutes(time.minute);
    date.setSeconds(time.second);

    return date;
  }

  newCity(city) {
    const text = city.target.value;

    if (text.length) {
      this.cities.push(text);
    }
    city.target.value = '';
  }

  delCity(city) {
    const index = this.cities.findIndex(delCity => delCity === city);

    this.cities.splice(index, 1);
  }
}
