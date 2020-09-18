import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {IValidDate} from '../../../interface';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
  @Output() changedDate = new EventEmitter<IValidDate>();

  date: string;
  hourStep = 1;
  minuteStep = 30;

  startAtClear: string;
  closeAtClear: string;
  startAt: string;
  closeAt: string;

  statusTime: boolean;
  dateValidStatus = null;
  pickedDateStatus: boolean;

  timeForm: FormControl = this.createFormControl();
  timeForm2: FormControl = this.createFormControl();

  constructor() {
  }

  ngOnInit() {
  }

  timePickerChange(witchDate: boolean) {
    const timeForm: FormControl = witchDate ? this.timeForm : this.timeForm2;

    if (timeForm.value && timeForm.value.hour && timeForm.value.minute !== null) {
      const {hour, minute} = timeForm.value;

      const pickedTime = `${hour <= 9 ? `0${hour}` : hour}:${minute < 9 ? `0${minute}` : minute}:00`;
      const pickedData = `${this.date}T${pickedTime}.000Z`;
      const clearPickedData = `${this.date} ${pickedTime}`;

      this.statusTime = timeForm.errors.ok ? this.checkValidTime(clearPickedData) : null;

      this.checkValidDates(witchDate, clearPickedData, pickedData);
      this.changedDate.emit({
        start_at: this.startAt,
        close_at: this.closeAt,
        status: this.pickedDateStatus ? this.dateValidStatus ? this.statusTime : false : null,
      });
    }
  }

  getDate(status: boolean, clearDateStatus: boolean) {
    const today = new Date();
    const year = today.getFullYear();
    const month = `${today.getMonth() + 1}`.padStart(2, '0');
    const day = `${today.getDate()}`.padStart(2, '0');
    const time = `${today.getHours()}:${today.getMinutes()}:00`;

    if (!status && !clearDateStatus) {
      return [year, month, day].join('-');
    }

    if (status && !clearDateStatus) {
      return [year, month, day].join('-') + 'T' + time;
    }

    if (!status && clearDateStatus) {
      return [year, month, day].join('-') + ' ' + time;
    }
  }

  checkValidTime(pickedTime: string) {
    const today = this.getDate(false, true);

    return new Date(today).getTime() < new Date(pickedTime).getTime();
  }

  checkValidDates(statusWitchPicked: boolean, clearPickedData: string, pickedData: string) {
    if (statusWitchPicked) {
      this.startAtClear = clearPickedData;
      this.startAt = pickedData;
    } else {
      this.closeAtClear = clearPickedData;
      this.closeAt = pickedData;
    }

    if (this.startAt && this.closeAt) {
      this.dateValidStatus = new Date(this.startAtClear).getTime() < new Date(this.closeAtClear).getTime();
    }
  }

  dateChange() {
    this.timePickerChange(false);
    this.timePickerChange(true);

    const today = new Date().getFullYear();
    const pickedDate = new Date(this.date).getFullYear();
    const adequateDate = new Date(this.getDate(false, false)).getFullYear();

    today > pickedDate || pickedDate > adequateDate ? this.pickedDateStatus = false : this.pickedDateStatus = true;
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

      if (value.hour < 12 && value.minute <= 30) {
        return {tooEarly: true};
      }

      if ((value.hour > 22 && value.minute >= 0) || (value.hour >= 22 && value.minute >= 30) || value.hour === 0) {
        return {tooLate: true};
      }

      return {ok: true};
    });
  }
}
