import {MatDialog} from '@angular/material';
import {Component, OnInit} from '@angular/core';

import {QuestionModel} from '../../../interface';
import {QuestionsService} from '../../../services';
import {ISuccessHttpResponse} from '../../../../shared';
import {ConfirmLayoutComponent} from '../../../../shared/components/confirm-layout/confirm-layout.component';
import {EditQuestionComponent} from '../edit-question/edit-question.component';
import {Router} from '@angular/router';


@Component({
  selector: 'app-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrls: ['./my-questions.component.scss']
})
export class MyQuestionsComponent implements OnInit {

  constructor(private questionService: QuestionsService,
              private dialog: MatDialog,
              private router: Router
  ) {
  }

  questions: QuestionModel[];

  ngOnInit() {
    this.questionService.getMyQuestions().subscribe((data: ISuccessHttpResponse) => {
      this.questions = data.data.questions;
    });
  }

  deleteQuestion(id: string) {
    const confirm = this.dialog.open(ConfirmLayoutComponent);

    confirm.afterClosed().subscribe((result) => {
      if (result) {
        this.questionService.deleteQuestionById(id).subscribe(() => {
          this.questionService.getMyQuestions().subscribe((data: ISuccessHttpResponse) => {
            this.questions = data.data.questions;
          });
        });
      }
    });
  }

  editQuestion(id: string) {
    const questionModels = this.questions.find(question => question._id === id);

    this.dialog.open(EditQuestionComponent, {
      data: questionModels,
      height: '800px',
      width: '700px',
    }).afterClosed().subscribe((result) => {
      if (result) {
        for (let i = 0; i < this.questions.length; i++) {
          if (this.questions[i]._id === result._id) {
            this.questions[i] = result;
          }
        }
      }
    });
  }
}
