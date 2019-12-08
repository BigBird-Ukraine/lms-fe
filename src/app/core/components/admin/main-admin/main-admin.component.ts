import {Component, OnInit} from '@angular/core';
import {AuthAdminService} from '../../../services/auth/auth-admin.service';
import {ErrorService} from '../../../../shared/services';
import {Router} from '@angular/router';

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
    {url: '/adminPanel/questions', name: 'Питання'}
  ];

  constructor(private authAdminService: AuthAdminService,
              private errorService: ErrorService,
              private router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    this.authAdminService.logout().subscribe(() => {
      this.router.navigate(['admin']);
      },
      error => this.errorService.handleError(error)
    );
  }
}
