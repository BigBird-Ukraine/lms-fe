import {Component, OnInit} from '@angular/core';
import {AdminAuthService} from '../services/admin-auth.service';
import {ErrorService} from '../../../../shared/services';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AdminInfo} from '../interfaces';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.scss']
})
export class MainAdminComponent implements OnInit {
  links = [
    {url: '/adminPanel/statistics', name: 'Статистика'},
    {url: '/adminPanel/users', name: 'Користувачі'},
    {url: '/adminPanel/groups', name: 'Групи'},
    {url: '/adminPanel/questions', name: 'Питання'},
    {url: '/adminPanel/courses', name: 'Курси'}
  ];
  adminInfo$: Observable<AdminInfo>;

  constructor(private authAdminService: AdminAuthService,
              private errorService: ErrorService,
              private router: Router) {
  }

  ngOnInit() {
    this.adminInfo$ = this.authAdminService.getAdminInfo();
  }

  logout() {
    this.authAdminService.logout().subscribe(() => {
        this.router.navigate(['admin']);
      },
      error => this.errorService.handleError(error)
    );
  }
}
