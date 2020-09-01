import {Component, Inject, OnInit} from '@angular/core';


import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AdminUsersService} from '../../services';
import {IPassedData} from '../../interfaces';

@Component({
  selector: 'app-admin-my-passed-test',
  templateUrl: './admin-my-passed-test.component.html',
  styleUrls: ['./admin-my-passed-test.component.scss']
})
export class AdminMyPassedTestComponent implements OnInit {

  userPassedTest: IPassedData;

  constructor(public userService: AdminUsersService,
              public dialogRef: MatDialogRef<AdminMyPassedTestComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.getInfo(this.data);
  }

  getInfo(userId: string) {
    this.userService.getUserPassedTest(userId )
      .subscribe((res) => {
        this.userPassedTest = res;
      });
  }

}
