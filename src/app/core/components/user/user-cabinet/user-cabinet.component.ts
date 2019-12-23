import {Component, OnInit} from '@angular/core';

import {UserService} from '../../../services/user';
import {AuthService} from '../../../services/auth';
import {IUserSubjectModel} from '../../../interface';
import {MatDialog} from '@angular/material';
import {EditUserComponent} from '../edit-user/edit-user.component';

@Component({
  selector: 'app-user-cabinet',
  templateUrl: './user-cabinet.component.html',
  styleUrls: ['./user-cabinet.component.scss']
})
export class UserCabinetComponent implements OnInit {
  user: Partial<IUserSubjectModel>;
  token = this.authService.getAccessToken();
  userInfo = this.userService.userInfo;

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
    this.dialog.open(EditUserComponent);
  }
}
