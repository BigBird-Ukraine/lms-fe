import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {CreateLessonComponent} from '../create-lesson/create-lesson.component';
import {UserService} from '../../../services/user';
import {IUserSubjectModel} from '../../../interface';
import {UserRolesEnum} from '../../../../shared/enums';

@Component({
  selector: 'app-lesson-page',
  templateUrl: './lesson-page.component.html',
  styleUrls: ['./lesson-page.component.scss']
})
export class LessonPageComponent implements OnInit {
  isTeacher: boolean;

  constructor(private dialog: MatDialog,
              private userService: UserService) {
  }

  ngOnInit() {
    this.userService.userInfo.subscribe((user: IUserSubjectModel) => {
      this.isTeacher = user.role_id === UserRolesEnum.TEACHER;
    });
  }

  openForm() {
    this.dialog.open(CreateLessonComponent);
  }
}
