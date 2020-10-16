import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';

import {CustomSnackbarService} from '../../../../../shared/services';
import {IRoom} from '../../interfaces';
import {AdminIpService} from '../../services';

@Component({
  selector: 'app-create-ip',
  templateUrl: './create-ip.component.html',
  styleUrls: ['./create-ip.component.scss']
})
export class CreateIpComponent implements OnInit {

  form: FormGroup;

  constructor(private adminIpService: AdminIpService,
              private dialog: MatDialog,
              private snackbarService: CustomSnackbarService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.min(1)]),
      ip: new FormControl(null, [Validators.required, Validators.min(4)]),
      address: new FormControl(null),
    });
  }

  saveIp() {
    this.adminIpService.createIp(this.form.value).subscribe(() => {
      this.snackbarService.open(`Ip ${this.form.value.title} створено`);
      this.dialog.closeAll();
    });
  }

  getCoordinates(data: Partial<IRoom>) {
    this.form.value.address = data.address;
  }
}
