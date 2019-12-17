import {Component, OnInit} from '@angular/core';

import {QuestionModel} from '../../../interface';
import {QuestionsService} from '../../../services';
import {ISuccessHttpResponse} from '../../../../shared';
import {ConfirmLayoutComponent} from '../../../../shared/components/confirm-layout/confirm-layout.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrls: ['./my-questions.component.scss']
})
export class MyQuestionsComponent implements OnInit {

  constructor(private questionService: QuestionsService,
              private dialog: MatDialog
  ) {
  }

  questions: QuestionModel[] = [];

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
}
