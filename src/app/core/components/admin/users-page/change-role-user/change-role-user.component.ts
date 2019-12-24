import {Component, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Inject} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";


import {IUser} from '../../interfaces';
import {UserRolesEnum} from '../../../../../shared/enums';
import {AdminUsersService} from '../../services';
import {CustomSnackbarService} from "../../../../../shared/services";

@Component({
  selector: 'change-role-user',
  templateUrl: './change-role-user.component.html',
  styleUrls: ['./change-role-user.component.scss']
})
export class ChangeRoleUserComponent implements OnInit {

  roles = [
    {name: 'Адміністратор', value: UserRolesEnum.ADMIN},
    {name: 'Вчитель', value: UserRolesEnum.TEACHER},
    {name: 'Студент', value: UserRolesEnum.STUDENT}
  ];

  constructor(
    private adminUsersService: AdminUsersService,
    public dialogRef: MatDialogRef<ChangeRoleUserComponent>,
    private snackbarService:CustomSnackbarService,
    @Inject(MAT_DIALOG_DATA) public user: IUser,
  ) {
  }

  ngOnInit() {
  }


  changeRole(user: IUser, role, roleId: number) {
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
    this.snackbarService.open('Роль змінено!!!');
    this.dialogRef.close(roleId);
  }
}
