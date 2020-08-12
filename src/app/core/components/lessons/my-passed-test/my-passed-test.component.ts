import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user';
import {AuthService} from '../../../services/auth';

@Component({
  selector: 'app-my-passed-test',
  templateUrl: './my-passed-test.component.html',
  styleUrls: ['./my-passed-test.component.scss']
})
export class MyPassedTestComponent implements OnInit {

  userPassedTest: IPassedData;

  constructor(public userService: UserService, private authService: AuthService) {
  }

  ngOnInit() {
    this.getInfo();
  }

  getInfo() {
    this.userService.getUserPassedTest(this.authService.getAccessToken())
      .subscribe((res) => {
        this.userPassedTest = res.passed_tests;
      });
  }

}
