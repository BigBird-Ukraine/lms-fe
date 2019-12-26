import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AdminUsersService} from '../services';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
  getUsers: any;


  constructor(private adminUsersService: AdminUsersService,
              private router: Router) {
  }

  ngOnInit() {
    this.router.navigate(['/adminPanel/users/all']);
    this.adminUsersService.getAll().subscribe(value => {
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
