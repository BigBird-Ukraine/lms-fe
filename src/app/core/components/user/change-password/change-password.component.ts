import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {regExp} from '../../../constans';
import {matchPassword} from '../../../../shared/validators';
import {UserService} from '../../../services/user';
import {CustomSnackbarService} from '../../../../shared/services';
import {IChangePassword} from '../../../interface';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  hide = true;
  hide2 = true;
  hide3 = true;

  spinnerStatus = false;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private customSnackbarService: CustomSnackbarService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.formData();
  }

  formData() {
    this.changePasswordForm = this.fb.group({
        old_password: this.fb.control(null, [
          Validators.required,
          Validators.pattern(regExp.passwordRegexp),
          Validators.minLength(8)
        ]),
        password: this.fb.control(null, [
          Validators.required,
          Validators.pattern(regExp.passwordRegexp),
          Validators.minLength(8)
        ]),
        confirmPassword: this.fb.control(null,
          [Validators.required]),
        photo_path: ''
      },
      {validators: matchPassword}
    );
  }

  changePassword() {
    const passwords: IChangePassword = {
      new_password: this.changePasswordForm.value.password,
      password: this.changePasswordForm.value.old_password,
    };
    this.spinnerStatus = true;

    this.userService.changePassword(passwords).subscribe(res => {
        this.customSnackbarService.open('Success, check your mail for confirm', 'Success');
        this.spinnerStatus = false;
        this.dialog.closeAll();
      },
      err => {
        this.spinnerStatus = false;
        this.customSnackbarService.open(err.error.error.message, '');
      });
  }
}
