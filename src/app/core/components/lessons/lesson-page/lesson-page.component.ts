import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {CreateLessonComponent} from '../create-lesson/create-lesson.component';
import {UserService} from '../../../services/user';
import {IFullLesson, ILesson, IUserSubjectModel} from '../../../interface';
import {UserRolesEnum} from '../../../../shared/enums';
import {LessonsService} from '../../../services/lessons.service';

@Component({
  selector: 'app-lesson-page',
  templateUrl: './lesson-page.component.html',
  styleUrls: ['./lesson-page.component.scss']
})
export class LessonPageComponent implements OnInit {
  isTeacher: boolean;
  showAllLessons = false;
  lessonsList: ILesson[];
  lesson: ILesson;

  constructor(private dialog: MatDialog,
              private userService: UserService,
              private lessonService: LessonsService) {
  }

  ngOnInit() {
    this.userService.userInfo.subscribe((user: IUserSubjectModel) => {
      this.isTeacher = user.role_id === UserRolesEnum.TEACHER;
    });

    this.getLessons();
  }

  openForm() {
    this.dialog.open(CreateLessonComponent);
  }

  allLessons() {
    this.showAllLessons = !this.showAllLessons;
  }

  getLessons() {
    this.lessonService.getAllLessons().subscribe((lessons: IFullLesson) => {
      this.lessonsList = lessons.data.lesson;
    });
  }

  viewLesson(id: string) {
    this.lesson = this.lessonsList.find(lesson => lesson._id === id);
  }
}
