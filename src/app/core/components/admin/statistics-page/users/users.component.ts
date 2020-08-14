import {Component, OnInit} from '@angular/core';
import {IUser} from '../../interfaces';
import {AdminStatisticsService, AdminUsersService} from '../../services';
import {IUserStatistics} from '../../interfaces/statistics.interface';
import {QuestionComponent} from '../question/question.component';
import {MatDialog} from '@angular/material';
import {UserComponent} from '../user/user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  usersStatistic: IUserStatistics;

  constructor(private userService: AdminUsersService,
              private statisticService: AdminStatisticsService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.userService.getUsersStatics().subscribe(usersStatistic => {
      this.usersStatistic = usersStatistic;
      this.statisticService.setDisplayPage();
    });
  }

  openForm(typeRequest: number, count: number) {
    if (count > 0) {
      this.dialog.open(UserComponent, {
        width: '90%',
        data: {
          typeRequest
        }
      });
    }
  }
}
