import {Component, Inject, OnInit} from '@angular/core';
import {IUser} from '../../interfaces';
import {AdminUsersService} from '../../services';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: Partial<IUser[]>;

  constructor(private userService: AdminUsersService, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.data.typeRequest === 1 ? this.getActiveUsers() : this.getBlockedUsers();
  }

  getActiveUsers() {
    this.userService.getUsersByStatus('1').subscribe(activeUsers => this.users = activeUsers);
  }

  getBlockedUsers() {
    this.userService.getUsersByStatus('2').subscribe(blockedUsers => this.users = blockedUsers);

  }
}
