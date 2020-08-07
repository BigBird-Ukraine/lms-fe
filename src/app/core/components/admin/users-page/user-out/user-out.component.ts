import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {IUser, IUserModel} from '../../interfaces';
import {UserRolesEnum, UserStatusEnum} from '../../../../../shared/enums';
import {CustomSnackbarService} from '../../../../../shared/services';
import {AdminUsersService} from '../../services';
import {ChangeRoleUserComponent} from '../change-role-user/change-role-user.component';
import {UpdateProfileComponent} from "../update-profile/update-profile.component";
import {DeleteComponent} from "../../../../../shared/components/delete/delete.component";

@Component({
  selector: 'app-user-out',
  templateUrl: './user-out.component.html',
  styleUrls: ['./user-out.component.scss']
})
export class UserOutComponent implements OnInit {
  @Input() data: IUserModel;
  isBlocked = UserStatusEnum.BLOCKED;
  roles = [
    {name: 'Адміністратор', value: UserRolesEnum.ADMIN},
    {name: 'Вчитель', value: UserRolesEnum.TEACHER},
    {name: 'Студент', value: UserRolesEnum.STUDENT}
  ];

  updatedAt: string = new Date().toString();

  constructor(private adminUsersService: AdminUsersService,
              private dialog: MatDialog,
              private snackbarService: CustomSnackbarService) {
  }

  ngOnInit() {
  }


  blockUser(user: IUser): void {
    const index: number = this.data.users.indexOf(user);

    if (user.status_id === UserStatusEnum.ACTIVE) {
      this.adminUsersService.blockUser(user._id).subscribe(() => {
        this.snackbarService.open('Користувача заблоковано');
        this.data.users[index].status_id = UserStatusEnum.BLOCKED;
        this.data.users[index].updated_at = this.updatedAt;
      });
    }
  }

  unBlockUser(user: IUser): void {
    const index: number = this.data.users.indexOf(user);

    if (user.status_id === UserStatusEnum.BLOCKED) {
      this.adminUsersService.unBlockUser(user._id).subscribe(() => {
        this.snackbarService.open('Користувача розблоковано');
        this.data.users[index].status_id = UserStatusEnum.ACTIVE;
        this.data.users[index].updated_at = this.updatedAt;
      });
    }
  }

  delete(user: IUser): void {
    this.dialog.open(DeleteComponent, {
      data: `${user.surname} ${user.name}`
    }).afterClosed().subscribe(value => {
      if (value) {
        const index: number = this.data.users.indexOf(user);
        this.adminUsersService.deleteUser(user._id).subscribe(() => {
          this.snackbarService.open('Користувач видалений');
          this.data.users.splice(index, 1);
        });
      }
    })
  }

  openEditForm(user: IUser) {
    this.dialog.open(ChangeRoleUserComponent, {
      data: user
    }).afterClosed().subscribe((role: UserRolesEnum) => {

      if (role) {
        const index: number = this.data.users.indexOf(user);
        this.data.users[index].role_id = role;
      }
    });
  }

  updateProfile(user: IUser) {
    this.dialog.open(UpdateProfileComponent, {
      data: {user: user}
    }).afterClosed().subscribe((value: IUser) => {
      if (value) {
        const index: number = this.data.users.indexOf(user);
        this.data.users[index] = value;
      }
    })
  }

  private getNameOfRole(role: UserRolesEnum): string {
    return this.roles[role - 1].name;
  }
}
