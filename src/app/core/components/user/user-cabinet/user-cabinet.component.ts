import {Component, OnInit} from '@angular/core';

import {UserService} from '../../../services/user';
import {AuthService} from '../../../services/auth';
import {IUserSubjectModel} from '../../../interface';

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
              private authService: AuthService) {
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
}
