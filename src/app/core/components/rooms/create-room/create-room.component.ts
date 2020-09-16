import {Component, OnInit} from '@angular/core';
import {Groups, ICity} from '../../../interface';
import {InfoHelperService} from '../../../services/questions';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {
  roomForm: FormGroup;

  minDate = this.getDate();
  spinnerStatus = false;

  group: Groups[] = [];
  groupForAuto: Groups[] = [];

  citiesForAuto: Partial<ICity>[] = [];

  constructor(private infoService: InfoHelperService, private fb: FormBuilder) {
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
    const text = group.target.value;

    if (text.length) {
      this.group.push(text);
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
    this.roomForm.value.groups = this.group;
    console.log(this.roomForm.value);
  }
}
