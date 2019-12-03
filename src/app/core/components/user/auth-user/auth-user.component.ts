import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '../../../services/auth/auth.service';
import {ErrorService} from '../../../../shared/services/error.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-auth-user',
  templateUrl: './auth-user.component.html',
  styleUrls: ['./auth-user.component.scss']
})
export class AuthUserComponent implements OnInit {

  authForm: FormGroup;
  hide = true;
  error = null;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
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
      this.dialog.closeAll();
      },
      error => {
        this.error = error.error.error.message;
        this.errorService.handleError(this.error);
        console.log(error.error.error.message);
      }
    );
  }
}
