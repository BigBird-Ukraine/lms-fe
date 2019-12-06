import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {catchError} from 'rxjs/operators';

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
  token = this.authService.getAccessToken();
  userInfo = this.userService.userInfo;

  constructor(private dialog: MatDialog,
              private authService: AuthService,
              private userService: UserService,
              private errorService: ErrorService
  ) {
  }

  ngOnInit() {

    this.userService.getUserInfoByToken(this.token)
      .pipe(
        catchError((err) =>
          this.errorService.handleError(err)
        )
      )
      .subscribe(() => {
        if (this.userInfo.subscribe()) {
          this.userInfo.subscribe(name => this.userName = name.name);
        } else {
          this.userService.getUserInfoByToken(this.token).subscribe();
          this.userInfo.subscribe(name => this.userName = name.name);
        }
      });

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
