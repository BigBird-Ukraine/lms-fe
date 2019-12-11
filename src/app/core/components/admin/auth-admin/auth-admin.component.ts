import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomSnackbarService, ErrorService} from '../../../../shared/services';
import {AdminAuthService} from '../services/admin-auth.service';
import {AuthService} from '../../../services/auth';
import {ActivatedRoute, Params, Router} from '@angular/router';

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
              private errorService: ErrorService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.authService.logout().subscribe(() => {
        },
        error => this.errorService.handleError(error)
      );
    }

    if (this.authAdminService.isAuthenticated()) {
      this.authAdminService.logout().subscribe(() => {
        },
        error => this.errorService.handleError(error)
      );
    }
    this.route.queryParams.subscribe((params: Params) => {
      if (params['accessDenied']) {
        this.customSnackbarService.open('Спочатку авторизуйтесь', 'Ok');
      }
      if (params['sessionFiled']) {
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
      },
      error => this.errorService.handleError(error));
  }
}
