import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {RoomsService} from '../../../services/rooms';
import {IBookRoomSetting, IBookUserFull, IValidDate} from '../../../interface';

@Component({
  selector: 'app-book-user',
  templateUrl: './book-user.component.html',
  styleUrls: ['./book-user.component.scss']
})
export class BookUserComponent implements OnInit {
  tableSetting: IBookRoomSetting;
  bookBtnStatus = false;

  startAtForm: FormControl;
  closeAtForm: FormControl;

  constructor(private roomService: RoomsService,
              @Inject(MAT_DIALOG_DATA) public data: IBookRoomSetting
  ) {
    this.tableSetting = data;
    // this.startAtForm = this.createFormControl();
    // this.closeAtForm = this.createFormControl();
  }

  ngOnInit() {
  }

  setBookBtnStatus() {
    this.bookBtnStatus = !this.bookBtnStatus;
  }

  // createFormControl() {
  //   return new FormControl('', (control: FormControl) => {
  //     const {value} = control;
  //
  //     if (!value || (!value.minute && value.minute !== 0)) {
  //       return null;
  //     }
  //
  //     if (value.minute % 30 !== 0) {
  //       return {invalidMinute: true};
  //     }
  //
  //     if (value.hour < this.settingRoom.roomStartAt.hour ||
  //       value.hour === this.settingRoom.roomStartAt.hour &&
  //       value.minute < this.settingRoom.roomStartAt.minute) {
  //       return {tooEarly: true};
  //     }
  //
  //     if (value.hour > this.settingRoom.roomCloseAt.hour ||
  //       value.hour === this.settingRoom.roomCloseAt.hour &&
  //       value.minute > this.settingRoom.roomCloseAt.minute) {
  //       return {tooLate: true};
  //     }
  //
  //     return {ok: true};
  //   });
  // }

  // getFullDate(form: FormControl) {
  //   const formData = form.value;
  //   const fullDate = this.settingRoom.date;

  //
  //   fullDate.setHours(formData.hour);
  //   fullDate.setMinutes(formData.minute);
  //   return fullDate;
  // }


  bookPlace() {

  }
}
