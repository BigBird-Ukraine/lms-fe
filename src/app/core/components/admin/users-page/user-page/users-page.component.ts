import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, switchMap, take} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {AdminUsersService} from '../../services';
import {UserRolesEnum} from '../../../../../shared/enums';
import {IPaginator, IUserModel} from '../../interfaces';
import {MatDialog} from '@angular/material';
import {CreateUserComponent} from '../create-user/create-user.component';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})

export class UsersPageComponent implements OnInit {
  getUsers: IUserModel;
  form: FormGroup;
  length: number;
  pageSize = 50;
  pageIndex = 0;
  subject = new Subject<any>();
  roles = [
    {name: 'Всі', value: ''},
    {name: 'Адміністратор', value: UserRolesEnum.ADMIN},
    {name: 'Вчитель', value: UserRolesEnum.TEACHER},
    {name: 'Студент', value: UserRolesEnum.STUDENT},
  ];

  createFormsStatus = false;


  constructor(private adminUsersService: AdminUsersService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog
  ) {
    this.subject.pipe(
      debounceTime(500)
    ).subscribe(() => this.getFilteredUsers());
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(''),
      surname: new FormControl(''),
      population_point: new FormControl(''),
      email: new FormControl(''),
      phone_number: new FormControl(''),
      role_id: new FormControl('')
    });
    this.getFilteredUsers();
  }

  getFilteredUsers(event?: Partial<IPaginator>) {
    if (event) {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
    } else {
      this.pageIndex = 0;
    }

    this.getUsers = null;

    const keys = Object.keys(this.form.value);
    keys.forEach(value => {
      if (!this.form.value[value]) {
        delete this.form.value[value];
      }
    });

    this.router.navigate(['/admin/adminPanel/users'], {
      queryParams: {
        ...this.form.value,
        pageSize: this.pageSize,
        pageIndex: this.pageIndex
      }
    });

    this.route.queryParams.pipe(
      switchMap(value => {
        return this.adminUsersService.getAll(value);
      }),
      take(1),
    ).subscribe(value => {
      this.length = value.data.count;
      this.getUsers = value.data;
    });
  }

  reset() {
    this.ngOnInit();
  }

  setCreateFormsStatus() {
    this.createFormsStatus = !this.createFormsStatus;
  }

  createUser() {
    this.dialog.open(CreateUserComponent).afterClosed().subscribe(res => {
      if (res) {
        this.reset();
      }
    });
  }
}
