import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {IUser, IUserModel} from '../../interfaces';
import {UserStatusEnum} from '../../../../../shared/enums';
import {CustomSnackbarService} from '../../../../../shared/services';
import {AdminUsersService} from '../../services';
import {UpdateUserComponent} from '../update-user/update-user.component';
import {UpdateProfileComponent} from "../../update-profile/update-profile.component";

@Component({
  selector: 'app-user-out',
  templateUrl: './user-out.component.html',
  styleUrls: ['./user-out.component.scss']
})
export class UserOutComponent implements OnInit {
  @Input() users: IUserModel;
  isBlocked = UserStatusEnum.BLOCKED;

  updatedAt: string = new Date().toString();

  constructor(private adminUsersService: AdminUsersService,
              private dialog: MatDialog,
              private snackbarService: CustomSnackbarService) {
  }

  ngOnInit() {
  }


  blockUser(user: IUser): void {
    const index: number = this.users.data.indexOf(user);

    if (user.status_id === UserStatusEnum.ACTIVE) {
      this.adminUsersService.blockUser(user._id).subscribe(() => {
        this.snackbarService.open('Користувача заблоковано');
        this.users.data[index].status_id = UserStatusEnum.BLOCKED;
        this.users.data[index].updated_at = this.updatedAt;
      });
    }
  }

  unBlockUser(user: IUser): void {
    const index: number = this.users.data.indexOf(user);

    if (user.status_id === UserStatusEnum.BLOCKED) {
      this.adminUsersService.unBlockUser(user._id).subscribe(() => {
        this.snackbarService.open('Користувача розблоковано');
        this.users.data[index].status_id = UserStatusEnum.ACTIVE;
        this.users.data[index].updated_at = this.updatedAt;
      });
    }
  }

  delete(user: IUser): void {
    const index: number = this.users.data.indexOf(user);
    this.adminUsersService.deleteUser(user._id).subscribe(() => {
      this.snackbarService.open('Користувач видалений');
      this.users.data.splice(index, 1);
    });

  }

  openEditForm(user: IUser) {
    this.dialog.open(UpdateUserComponent, {
      data: {
        user,
        users: this.users
      }
    });
  }

  updateProfile(user: IUser) {
    this.dialog.open(UpdateProfileComponent, {
      data: user
    })
  }

}
