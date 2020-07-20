import { Component, OnInit } from '@angular/core';
import {IEditLesson, ILesson, QuestionModel} from '../../../../interface';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {UserRolesEnum} from '../../../../../shared/enums';
import {AdminAuthService, AdminLessonService, AdminUsersService} from '../../services';
import {IUser} from '../../interfaces';
import {EditLessonComponent} from '../edit-lesson/edit-lesson.component';
import {AddQuestionToLessonComponent} from '../add-question-to-lesson/add-question-to-lesson.component';


@Component({
  selector: 'app-single-lesson',
  templateUrl: './single-lesson.component.html',
  styleUrls: ['./single-lesson.component.scss']
})
export class SingleLessonComponent implements OnInit {

  token = this.authService.getAccessToken();
  isAdmin: boolean;
  lesson: ILesson;
  id: string;

  constructor(private dialog: MatDialog,
              private userService: AdminUsersService,
              private authService: AdminAuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private lessonService: AdminLessonService) {
  }

  ngOnInit() {
    this.userService.getUserInfoByToken(this.token)
      .subscribe(() => {
        if (this.userService.userInfo.subscribe()) {
          this.userService.userInfo.subscribe((user: IUser) => {
            this.isAdmin = user.role_id === UserRolesEnum.ADMIN;
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
      value ? (this.lesson = value.data) : this.getLesson(this.id);
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

  startTest() {
    this.router.navigate([`adminPanel/lessons/${this.id}/test`]);
  }

}
