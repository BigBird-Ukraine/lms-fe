import {Component, Inject, OnInit} from '@angular/core';

import {UserService} from '../../../services/user';
import {IPassedData} from '../../../interface';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-my-passed-test',
  templateUrl: './my-passed-test.component.html',
  styleUrls: ['./my-passed-test.component.scss']
})
export class MyPassedTestComponent implements OnInit {

  userPassedTest: IPassedData;

  constructor(public userService: UserService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.getInfo(this.data);
  }

  getInfo(userId: string) {
    this.userService.getUserPassedTest(userId)
      .subscribe((res) => {
        this.userPassedTest = res;
      });
  }

}
