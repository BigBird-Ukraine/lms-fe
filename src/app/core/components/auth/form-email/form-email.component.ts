import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth';
import {MatDialog} from '@angular/material';
import {CustomSnackbarService} from '../../../../shared/services';

@Component({
  selector: 'app-form-email',
  templateUrl: './form-email.component.html',
  styleUrls: ['./form-email.component.scss']
})
export class FormEmailComponent implements OnInit {

  email = new FormControl(null, [Validators.email]);
  spinnerStatus = false;

  constructor(private authService: AuthService,
              private dialog: MatDialog,
              private customSnackbarService: CustomSnackbarService) {
  }

  ngOnInit() {
  }

  sendEmail() {
    this.spinnerStatus = true;
    this.authService.resetPasswordConfirm(this.email.value).subscribe(res => {
        this.dialog.closeAll();
        this.spinnerStatus = false;
      },
      err => {
        this.spinnerStatus = false;
        this.customSnackbarService.open(err.error.error.message, '');
      });
  }
}
