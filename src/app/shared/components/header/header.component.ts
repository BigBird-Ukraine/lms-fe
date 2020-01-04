import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';

import {AuthService} from '../../../core/services/auth';
import {UserService} from '../../../core/services/user';
import {UserRolesEnum} from '../../enums';
import {RegistrationComponent} from '../../../core/components/user/registration/registration.component';
import {AuthUserComponent} from '../../../core/components/user/auth-user/auth-user.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName = '';
  userId: string;
  isStudent: boolean;
  isTeacher: boolean;
  token = this.authService.getAccessToken();
  userInfo = this.userService.userInfo;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.userService.getUserInfoByToken(this.token)
      .subscribe(() => {
        if (this.userInfo.subscribe()) {
          this.userInfo.subscribe(user => {
            this.userName = user.name;
            this.userId = user._id;
            this.isStudent = user.role_id === UserRolesEnum.STUDENT;
            this.isTeacher = user.role_id === UserRolesEnum.TEACHER;
          });
        }
      });
  }

  openRegForm() {
    this.dialog.open(RegistrationComponent);
  }

  openLogForm() {
    this.dialog.open(AuthUserComponent).afterClosed().subscribe(value => {
      this.userService.getUserInfoByToken(value.data.accessToken)
        .subscribe(() => {
          if (this.userInfo.subscribe()) {
            this.userInfo.subscribe(user => {
              this.userName = user.name;
              this.isStudent = user.role_id === UserRolesEnum.STUDENT;
            });
          }
        });
    });
  }

  logout() {
    this.authService.logout().subscribe();
    this.redirectToHome();
  }

  redirectToHome() {
    this.router.navigateByUrl('/');
  }
}
