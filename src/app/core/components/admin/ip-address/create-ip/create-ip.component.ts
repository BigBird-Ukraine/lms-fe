import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';

import {CustomSnackbarService} from '../../../../../shared/services';
import {IAddress, ICity, IIp} from '../../interfaces';
import {AdminIpService} from '../../services';
import {AdminCityService} from '../../services/admin-city.service';

@Component({
  selector: 'app-create-ip',
  templateUrl: './create-ip.component.html',
  styleUrls: ['./create-ip.component.scss']
})
export class CreateIpComponent implements OnInit {

  form: FormGroup;
  citiesForAuto: ICity[];
  city: string;

  statusRenderingMap = true;

  constructor(private adminIpService: AdminIpService,
              private cityService: AdminCityService,
              private dialog: MatDialog,
              private snackbarService: CustomSnackbarService) {
  }

  ngOnInit() {
    this.cityService.getCities().subscribe(res => this.citiesForAuto = res);

    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.min(1)]),
      city: new FormControl(null, [Validators.required]),
      ip: new FormControl(null, [Validators.required, Validators.min(4)]),
      fullAddress: new FormControl(null),
    });

    this.form.controls.city.valueChanges.subscribe(() => {
      this.statusRenderingMap = false;
      setTimeout(() => {
        this.statusRenderingMap = true;
      }, 0);
    });
  }

  saveIp() {
    const ipAddress: IIp = this.form.value;

    this.adminIpService.createIp(ipAddress).subscribe(() => {
      this.snackbarService.open(`${this.form.value.title} створено`);
      this.dialog.closeAll();
    });
  }

  getCoordinates(data: any) {
    this.form.value.fullAddress = data as IAddress;
  }
}
