import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '../../../services';
import {CustomSnackbarService, ErrorService} from '../../../../shared';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {UserService} from '../../../services';

@Component({
  selector: 'app-auth-user',
  templateUrl: './auth-user.component.html',
  styleUrls: ['./auth-user.component.scss']
})
export class AuthUserComponent implements OnInit {

  authForm: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder,
              private customSnackbarService: CustomSnackbarService,
              private authService: AuthService,
              private userService: UserService,
              private errorService: ErrorService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.formData();
  }

  formData() {
    this.authForm = this.fb.group({
      email: this.fb.control(null, [
        Validators.required,
        Validators.email
      ]),
      password: this.fb.control(null, [
        Validators.required
      ])
    });
  }

  login() {
    this.authService.authUser(this.authForm.value).subscribe(() => {
        this.userService.userInfo.subscribe(info => {
        this.dialog.closeAll();
        this.customSnackbarService.open('Логін успішний', 'success');
      },
      error => this.errorService.handleError(error));
  }
}
