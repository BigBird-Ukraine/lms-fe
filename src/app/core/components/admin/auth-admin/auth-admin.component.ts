import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {CustomSnackbarService} from '../../../../shared/services';
import {AdminAuthService} from '../services';
import {AuthService} from '../../../services/auth';

@Component({
  selector: 'app-auth-admin',
  templateUrl: './auth-admin.component.html',
  styleUrls: ['./auth-admin.component.scss']
})
export class AuthAdminComponent implements OnInit {
  authForm: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder,
              private authAdminService: AdminAuthService,
              private authService: AuthService,
              private customSnackbarService: CustomSnackbarService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.authService.logout().subscribe(() => {
        }
      );
    }

    if (this.authAdminService.isAuthenticated()) {
      this.authAdminService.logout().subscribe(() => {
        }
      );
    }
    this.route.queryParams.subscribe((params: Params) => {
      if (params.accessDenied) {
        this.customSnackbarService.open('Спочатку авторизуйтесь', 'Ok');
      }
      if (params.sessionFiled) {
        this.customSnackbarService.open('Сесія закінчилась', 'Ok');
      }
    });

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
    this.authAdminService.authAdmin(this.authForm.value).subscribe(() => {
        this.customSnackbarService.open('Логін успішний', 'success');
        this.router.navigate(['/adminPanel/statistics']);
      });
  }
}
