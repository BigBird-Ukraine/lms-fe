import {Component, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Inject} from '@angular/core';


import {IUser} from '../../interfaces';
import {UserRolesEnum} from '../../../../../shared/enums';
import {AdminUsersService} from '../../services';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  roles = [
    {name: 'Адміністратор', value: UserRolesEnum.ADMIN},
    {name: 'Вчитель', value: UserRolesEnum.TEACHER},
    {name: 'Студент', value: UserRolesEnum.STUDENT}
  ];
  urlOfAll = '/adminPanel/users/all';

  constructor(
    private adminUsersService: AdminUsersService,
    @Inject(MAT_DIALOG_DATA) public user: IUser,
    @Inject(MAT_DIALOG_DATA) public users: any
  ) {
  }

  ngOnInit() {
  }


  changeRole(user: IUser, role, roleId: number) {
    // const index: number = this.users.data.indexOf(user);
    // const roleId: number = role.value;


    if (roleId === UserRolesEnum.ADMIN) {
      this.adminUsersService.makeAdmin(user._id).subscribe(() => {
      });
    }

    if (roleId === UserRolesEnum.STUDENT) {
      this.adminUsersService.makeStudent(user._id).subscribe(() => {
      });
    }

    if (roleId === UserRolesEnum.TEACHER) {
      this.adminUsersService.makeTeacher(user._id).subscribe(() => {
      });
    }
    // this.adminUsersService.changeRole(user._id, role.value).subscribe(() => {
    //   this.roles.forEach(value => {
    //
    //     if (value.value === roleId) {
    //       this.snackbarService.open(`Роль змнінено на "${value.name}"`);
    //     }
    //
    //   });
    //   this.users.data[index].role_id = roleId;
    //
    //   if (this.router.url !== this.urlOfAll) {
    //     this.users.data.splice(index, 1);
    //   } else {
    //     this.users.data[index].updated_at = this.updatedAt;
    //   }
    // });
  }
}
