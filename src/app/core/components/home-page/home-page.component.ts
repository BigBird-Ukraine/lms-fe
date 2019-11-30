import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {RegistrationComponent} from '../user/registration/registration.component';
import {AuthUserComponent} from '../user/auth-user/auth-user.component';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private dialog: MatDialog,
              private authService: AuthService) {
  }

  ngOnInit() {
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
