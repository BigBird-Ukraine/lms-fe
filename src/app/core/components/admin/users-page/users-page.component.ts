import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup} from "@angular/forms";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";

import {AdminUsersService} from '../services';
import {UserRolesEnum} from "../../../../shared/enums";
import {IPaginator, IUserModel} from "../interfaces";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})

export class UsersPageComponent implements OnInit {
  getUsers: IUserModel;
  form: FormGroup;
  params: any;
  length: number;
  pageSize: number = 50;
  pageIndex: number = 0;
  roles = [
    {name: 'Всі', value: ''},
    {name: 'Адміністратор', value: UserRolesEnum.ADMIN},
    {name: 'Вчитель', value: UserRolesEnum.TEACHER},
    {name: 'Студент', value: UserRolesEnum.STUDENT},
  ];


  constructor(private adminUsersService: AdminUsersService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null),
      surname: new FormControl(null),
      email: new FormControl(null),
      phone_number: new FormControl(null),
      role_id: new FormControl(null)
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

    this.router.navigate(['/adminPanel/users'], {
      queryParams: {
        ...this.form.value,
        pageSize: this.pageSize,
        pageIndex: this.pageIndex
      }
    });

    this.route.queryParams
      .subscribe((params: Params) => {
        this.params = params;
      });

    setTimeout(() => {
      this.adminUsersService.getAll(this.params)
        .subscribe(value => {
          this.length = value.data.count;
          this.getUsers = value.data;
        })
    }, 200);
  }

  inputFilter() {
    // this.form.statusChanges.pipe(
    //   debounceTime(1000),
    //   distinctUntilChanged(),
    //   tap(() => {
    //     return this.getFilteredUsers()
    //   })
    // ).subscribe()
    this.getFilteredUsers();
  }
}
