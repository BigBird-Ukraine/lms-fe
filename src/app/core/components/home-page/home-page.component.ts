import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {RegistrationComponent} from '../user/registration/registration.component';
import {AuthUserComponent} from '../user/auth-user/auth-user.component';
import {AuthService, UserService} from '../../services';
import {UserRoleEnum} from '../../enums';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  userName = '';
  isStudent: boolean;
  token = this.authService.getAccessToken();
  userInfo = this.userService.userInfo;

  constructor(private dialog: MatDialog,
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
            this.isStudent = user.role_id === UserRoleEnum.STUDENT;
          });
        }
        // else {
        //   this.userService.getUserInfoByToken(this.token).subscribe();
        //   this.userInfo.subscribe(user => {
        //     this.userName = user.name;
        //     this.isStudent = user.role_id === UserRoleEnum.STUDENT;
        //   });
        // }
      });

  }

  openRegForm() {
    this.dialog.open(RegistrationComponent);
  }

  openLogForm() {
    this.dialog.open(AuthUserComponent);
  }

  logout() {
    this.authService.logout().subscribe();
  }

}
