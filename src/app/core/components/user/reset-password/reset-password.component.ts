import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {CustomSnackbarService} from '../../../../shared/services';
import {regExp} from '../../../constans';
import {matchPassword} from '../../../../shared/validators';
import {AuthService} from '../../../services/auth';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup;
  hide = true;
  hide2 = true;

  constructor(private dialog: MatDialog,
              private customSnackbarService: CustomSnackbarService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.formData();
  }

  formData() {
    this.resetForm = this.fb.group({
        password: this.fb.control(null, [
          Validators.required,
          Validators.pattern(regExp.passwordRegexp),
          Validators.minLength(8)
        ]),
        confirmPassword: this.fb.control(null,
          [Validators.required])
      },
      {validators: matchPassword}
    );
  }

  resetPassword() {
    this.route.params.subscribe(params => {
      const {password} = this.resetForm.value;
      this.authService.resetPassword(params.token, password).subscribe(res => {
          this.customSnackbarService.open('Ваш пароль було змінено!', '');
          this.resetForm.reset();
          setTimeout(() => {
            window.close();
          }, 1500);
        },
        err => {
          this.customSnackbarService.open(err.error.error.message, '');
        });
    });
  }
}
