import {Component, OnInit} from '@angular/core';

import {UserService} from '../../../services/user';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-confirm-mail',
  templateUrl: './confirm-mail.component.html',
  styleUrls: ['./confirm-mail.component.scss']
})
export class ConfirmMailComponent implements OnInit {
  status = false;
  alreadyActivatedStatus = false;

  constructor(private userService: UserService,
              private activateRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.userService.confirmUserMail(params.token).subscribe(res => {
        this.status = true;
        setTimeout(() => {
          window.close();
        }, 1500);
      },
        err => {
        this.alreadyActivatedStatus = true;
        });
    });

  }

}
