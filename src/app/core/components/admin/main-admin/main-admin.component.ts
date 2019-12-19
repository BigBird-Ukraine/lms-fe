import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

import {AdminAuthService} from '../services';
import {IUser} from '../interfaces';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.scss']
})
export class MainAdminComponent implements OnInit {
  links = [
    {url: '/adminPanel/statistics', name: 'Статистика'},
    {url: '/adminPanel/users', name: 'Користувачі'},
    {url: '/adminPanel/questions', name: 'Питання'},
    {url: '/adminPanel/groups', name: 'Групи'},
    {url: '/adminPanel/courses', name: 'Курси'},
    {url: '/adminPanel/modules', name: 'Модулі'}

  ];
  adminInfo$: Observable<IUser>;

  constructor(private authAdminService: AdminAuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.adminInfo$ = this.authAdminService.getAdminInfo();
  }

  logout() {
    this.authAdminService.logout().subscribe(() => {
        this.router.navigate(['admin']);
      }
    );
  }
}
