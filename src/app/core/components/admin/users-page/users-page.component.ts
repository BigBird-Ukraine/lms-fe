import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AdminUsersService} from '../services';
import {UserRolesEnum} from '../../../../shared/enums';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
  buttons = [
    {name: 'Адміністратори', routerLink: 'admins', role: UserRolesEnum.ADMIN},
    {name: 'Вчителі', routerLink: 'teachers', role: UserRolesEnum.TEACHER},
    {name: 'Студенти', routerLink: 'students', role: UserRolesEnum.STUDENT},
  ];
  getUsers: any;


  constructor(private adminUsersService: AdminUsersService,
              private router: Router) {
  }

  ngOnInit() {
    this.router.navigate(['/adminPanel/users/admins']);
    this.adminUsersService.getAllByRole(UserRolesEnum.ADMIN).subscribe(value => {
      this.getUsers = value;
    });
  }

  getUserByRole(role) {
    this.adminUsersService.getAllByRole(role).subscribe(value => {
      this.getUsers = value;
    });
  }


  getAll() {
    this.adminUsersService.getAll().subscribe(value => {
      this.getUsers = value;
    });
  }
}
