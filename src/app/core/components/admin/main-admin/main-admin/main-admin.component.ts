import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import {AdminAuthService} from '../../services';
import {IUser} from '../../interfaces';
import {UpdateProfileComponent} from '../../users-page/update-profile/update-profile.component';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.scss']
})
export class MainAdminComponent implements OnInit {
  links = [
    {url: '/admin/adminPanel', name: 'Статистика'},
    {url: '/admin/adminPanel/users', name: 'Користувачі'},
    {url: '/admin/adminPanel/questions', name: 'Питання'},
    {url: '/admin/adminPanel/groups', name: 'Групи'},
    {url: '/admin/adminPanel/courses', name: 'Курси'},
    {url: '/admin/adminPanel/modules', name: 'Модулі'},
    {url: '/admin/adminPanel/lessons', name: 'Уроки'},
    {url: '/admin/adminPanel/rooms', name: 'Кімнати'},
    {url: '/admin/adminPanel/cities', name: 'Міста'},
    {url: '/admin/adminPanel/ips', name: 'IP Адреси'}
  ];
  adminInfo: IUser;

  constructor(private authAdminService: AdminAuthService,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit() {
    this.authAdminService.getAdminInfo().subscribe(value => {
      this.adminInfo = value;
    });
  }

  logout() {
    this.authAdminService.logout().subscribe(() => {
        this.router.navigate(['admin']);
      }
    );
  }

  updateProfile(user: IUser) {
    this.dialog.open(UpdateProfileComponent, {
      data: {user}
    }).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
}

