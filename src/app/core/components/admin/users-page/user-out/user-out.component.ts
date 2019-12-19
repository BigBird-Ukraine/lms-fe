import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {IUser, IUserModel} from '../../interfaces';
import {UserRolesEnum, UserStatusEnum} from '../../../../../shared/enums';
import {AdminUsersService} from '../../services';
import {CustomSnackbarService} from '../../../../../shared/services';

@Component({
  selector: 'app-user-out',
  templateUrl: './user-out.component.html',
  styleUrls: ['./user-out.component.scss']
})
export class UserOutComponent implements OnInit {
  @Input() users: IUserModel;
  isBlocked = UserStatusEnum.BLOCKED;
  roles = [
    {name: 'Адміністратор', value: UserRolesEnum.ADMIN},
    {name: 'Вчитель', value: UserRolesEnum.TEACHER},
    {name: 'Студент', value: UserRolesEnum.STUDENT}
  ];
  urlOfAll = '/adminPanel/users/all';
  updatedAt: string = new Date().toString();

  constructor(private adminUsersService: AdminUsersService,
              private snackbarService: CustomSnackbarService,
              private router: Router) {
  }

  ngOnInit() {
  }


  changeStatus(user: IUser): void {
    const index: number = this.users.data.indexOf(user);
    if (user.status_id === UserStatusEnum.ACTIVE || user.status_id === UserStatusEnum.BLOCKED) {
      if (user.status_id === UserStatusEnum.ACTIVE) {
        this.adminUsersService.blockUser(user._id).subscribe(() => {
          this.snackbarService.open('Користувача заблоковано');
          this.users.data[index].status_id = UserStatusEnum.BLOCKED;
        });
      } else {
        this.adminUsersService.unBlockUser(user._id).subscribe(() => {
          this.snackbarService.open('Користувача розблоковано');
          this.users.data[index].status_id = UserStatusEnum.ACTIVE;
        });
      }
      this.users.data[index].updated_at = this.updatedAt;
    }
  }

  delete(user: IUser): void {
    const index: number = this.users.data.indexOf(user);
    this.adminUsersService.deleteUser(user._id).subscribe(() => {
      this.snackbarService.open('Користувач видалений');
      this.users.data.splice(index, 1);
    });

  }

  changeRole(user: IUser, role) {
    const index: number = this.users.data.indexOf(user);
    const roleId: number = role.value;
    this.adminUsersService.changeRole(user._id, role.value).subscribe(() => {
      this.roles.forEach(value => {

        if (value.value === roleId) {
          this.snackbarService.open(`Роль змнінено на "${value.name}"`);
        }

      });
      this.users.data[index].role_id = roleId;

      if (this.router.url !== this.urlOfAll) {
        this.users.data.splice(index, 1);
      } else {
        this.users.data[index].updated_at = this.updatedAt;
      }
    });
  }
}
