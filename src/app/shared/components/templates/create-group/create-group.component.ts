import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CitiesEnum} from '../../../enums/cities.enum';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {
  form: FormGroup;
  cities = [
    {name: 'Львів', value: CitiesEnum.LVIV},
    {name: 'Київ', value: CitiesEnum.KYIV}
  ];

  constructor() {
  }

  ngOnInit() {
    this.form = new FormGroup({
      label: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required])
    });
  }

  save() {

  }
}
