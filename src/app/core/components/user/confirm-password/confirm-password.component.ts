import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.scss']
})
export class ConfirmPasswordComponent implements OnInit {
  status = false;
  err = '';

  constructor(private userService: UserService,
              private activateRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.userService.confirmChangedPassword(params.token).subscribe(res => {
          this.status = true;
          setTimeout(() => {
            window.close();
          }, 1500);
        },
        err => {
          this.err = err.error.error.message;
        });
    });

  }

}
