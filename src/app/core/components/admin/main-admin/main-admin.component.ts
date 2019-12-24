import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from "@angular/material/dialog";

import {AdminAuthService} from '../services';
import {IUser} from '../interfaces';
import {UpdateProfileComponent} from "../update-profile/update-profile.component";

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
  adminInfo: IUser;

  constructor(private authAdminService: AdminAuthService,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit() {
    this.authAdminService.getAdminInfo().subscribe(value => {
      this.adminInfo = value.data
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
      data: {user:user}
    }).afterClosed().subscribe(()=>{
      this.ngOnInit()
    })
  }
}

