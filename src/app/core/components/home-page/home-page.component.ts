import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {RegistrationComponent} from '../user/registration/registration.component';
import {AuthUserComponent} from '../user/auth-user/auth-user.component';
import {AuthService} from '../../services';
import {ErrorService} from '../../../shared';
import {UserService} from '../../services';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  userName = '';

  constructor(private dialog: MatDialog,
              private authService: AuthService,
              private userService: UserService,
              private errorService: ErrorService
  ) {
  }

  ngOnInit() {
    this.userService.getUserInfoByToken(this.authService.getAccessToken())
      .subscribe((user) => {
          console.log(user);
        },
        error => this.errorService.handleError(error));

    this.userService.getUserInfoByToken(this.authService.getAccessToken()).subscribe(user =>
      this.userName = user.name);
  }

  openRegForm() {
    this.dialog.open(RegistrationComponent);
  }

  openLogForm() {
    this.dialog.open(AuthUserComponent);
  }

  logout() {
    this.authService.logout().subscribe(() => {
      },
      error => this.errorService.handleError(error)
    );
  }

}
