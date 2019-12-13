import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';

import {CitiesEnum} from '../../../enums';
import {AdminGroupsService} from '../../../../core/components/admin/services';

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

  constructor(private groupsService: AdminGroupsService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      label: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required])
    });
  }

  save() {
    this.groupsService.save(this.form.value).subscribe(() => {
      this.dialog.closeAll();

    });
  }
}
