import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';

import {AuthService, UserService} from '../../../services';
import {CustomSnackbarService} from '../../../../shared';

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
          this.dialog.closeAll();
          this.customSnackbarService.open('Логін успішний', 'success');
        });
    }

}
