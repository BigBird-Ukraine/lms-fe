import { Component, OnInit } from '@angular/core';
import {MyPassedTestComponent} from '../my-passed-test.component';
import {MatDialog} from '@angular/material';
import {AuthService} from '../../../../services/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-passed-test-wrapper',
  templateUrl: './my-passed-test-wrapper.component.html',
  styleUrls: ['./my-passed-test-wrapper.component.scss']
})
export class MyPassedTestWrapperComponent implements OnInit {

  constructor(private dialog: MatDialog,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.dialog.open(MyPassedTestComponent, {
      data: this.authService.getAccessToken(),
      height: '100%'
    }).afterClosed().subscribe(res => this.router.navigate(['']));
  }

}
