import {Component, OnInit} from '@angular/core';

import {AuthService, UserService} from '../../services';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  userName = '';
  token = this.authService.getAccessToken();
  userInfo = this.userService.userInfo;

  constructor(private authService: AuthService,
              private userService: UserService
  ) {
  }

  ngOnInit() {

    this.userService.getUserInfoByToken(this.token)
      .subscribe(() => {
        if (this.userInfo.subscribe() && this.authService.isAuthenticated()) {
          this.userInfo.subscribe(user => {
            this.userName = user.name;
          });
        }
        // else {
        //   this.userService.getUserInfoByToken(this.token).subscribe();
        //   this.userInfo.subscribe(user => {
        //     this.userName = user.name;
        //   });
        // }
      });
  }
}

