import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

import {AuthService} from '../../../services';
import {CustomSnackbarService} from '../../../../shared';
import {FormEmailComponent} from '../form-email/form-email.component';

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
              public dialogRef: MatDialogRef<AuthUserComponent>,
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
    this.authService.authUser(this.authForm.value).subscribe((value) => {
      this.dialogRef.close(value);
      this.customSnackbarService.open('Логін успішний', 'success');
    }, (err) => {
      this.customSnackbarService.open(err.error.error.message, '');
    });
  }

  resetPassword() {
    this.dialog.open(FormEmailComponent);
  }
}
