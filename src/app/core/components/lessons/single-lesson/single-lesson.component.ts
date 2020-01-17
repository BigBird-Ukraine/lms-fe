import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ActivatedRoute} from '@angular/router';

import {EditLessonComponent} from '../edit-lesson/edit-lesson.component';
import {IEditLesson, ILesson, QuestionModel} from '../../../interface';
import {LessonsService} from '../../../services/lessons';
import {UserRolesEnum} from '../../../../shared/enums';
import {UserService} from '../../../services/user';
import {AuthService} from '../../../services/auth';
import {AddQuestionToLessonComponent} from '../add-question-to-lesson/add-question-to-lesson.component';

@Component({
  selector: 'app-single-lesson',
  templateUrl: './single-lesson.component.html',
  styleUrls: ['./single-lesson.component.scss']
})
export class SingleLessonComponent implements OnInit {

  token = this.authService.getAccessToken();
  isTeacher: boolean;
  lesson: ILesson;
  id: string;

  constructor(private dialog: MatDialog,
              private userService: UserService,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private lessonService: LessonsService) {
  }

  ngOnInit() {
    this.userService.getUserInfoByToken(this.token)
      .subscribe(() => {
        if (this.userService.userInfo.subscribe()) {
          this.userService.userInfo.subscribe(user => {
            this.isTeacher = user.role_id === UserRolesEnum.TEACHER;
          });
        }
      });

    this.id = this.activatedRoute.snapshot.params.id;
    this.getLesson(this.id);
  }

  getLesson(id) {
    this.lessonService.getLessonById(id).subscribe((lessonInfo: IEditLesson) => {
      this.lesson = lessonInfo.data;
    });
  }

  editLesson() {
    this.dialog.open(EditLessonComponent, {
      data: {lesson: this.lesson}
    }).afterClosed().subscribe((value: IEditLesson) => {
      this.lesson = value.data;
    });
  }

  addQuestionToLesson() {
    this.dialog.open(AddQuestionToLessonComponent, {
      data: this.lesson.questions_id
    }).afterClosed().subscribe((questions: QuestionModel[]) => {
      const data = {
        NewQuestions_id: [],
      };
      if (questions) {
        questions.forEach(question => data.NewQuestions_id.push(question._id));
        this.lessonService.addQuestionsToLesson(this.id, data).subscribe();
      }
    });
  }
}
