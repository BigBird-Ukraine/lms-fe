import { Component, OnInit } from '@angular/core';
import {AdminCityService} from '../../services/admin-city.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {CustomSnackbarService} from '../../../../../shared/services';

@Component({
  selector: 'app-add-city-admin',
  templateUrl: './add-city-admin.component.html',
  styleUrls: ['./add-city-admin.component.scss']
})
export class AddCityAdminComponent implements OnInit {
  form: FormGroup;

  constructor(private adminCityService: AdminCityService,
              private dialog: MatDialog,
              private snackbarService: CustomSnackbarService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.min(1)]),
      country: new FormControl(null, [Validators.required, Validators.min(2)]),
    });
  }

  saveCity() {
    this.adminCityService.saveCity(this.form.value).subscribe(() => {
      this.snackbarService.open(`Місто ${this.form.value.title} створено`);
      this.dialog.closeAll();
    });
  }

}
