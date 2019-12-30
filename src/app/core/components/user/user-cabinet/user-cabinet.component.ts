import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {UserService} from '../../../services/user';
import {AuthService} from '../../../services/auth';
import {IUserSubjectModel} from '../../../interface';
import {EditUserComponent} from '../edit-user/edit-user.component';
import {config} from '../../../../shared/config';

@Component({
  selector: 'app-user-cabinet',
  templateUrl: './user-cabinet.component.html',
  styleUrls: ['./user-cabinet.component.scss']
})
export class UserCabinetComponent implements OnInit {
  user: Partial<IUserSubjectModel>;
  token = this.authService.getAccessToken();
  userInfo = this.userService.userInfo;
  path = config.authUrl;

  userMail: string; // should takes from subject
  userPhone: string; // should takes from subject
  userPhoto: string; // should takes from subject

  constructor(private userService: UserService,
              private authService: AuthService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.userService.getUserInfoByToken(this.token)
      .subscribe(() => {
        if (this.userInfo.subscribe()) {
          this.userInfo.subscribe((user) => {
            this.user = user;
          });
        }
      });
  }

  openEditing() {
    this.dialog.open(EditUserComponent, {
      data: {user: this.user}
    }).afterClosed().subscribe((value) => {
      if (value) {
        this.userMail = value.data.email;
        this.userPhone = value.data.phone_number;
        this.userPhoto = value.data.photo_path;
      }
    });
  }
}
