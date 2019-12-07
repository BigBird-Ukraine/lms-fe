import {Component, OnInit} from '@angular/core';

import {QuestionModel} from '../../../interface';
import {QuestionsService} from '../../../services';
import {ISuccessHttpResponse, ErrorService} from '../../../../shared';

@Component({
  selector: 'app-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrls: ['./my-questions.component.scss']
})
export class MyQuestionsComponent implements OnInit {

  constructor(private questionService: QuestionsService,
              private errorService: ErrorService
  ) {
  }

  questions: QuestionModel[] = [];

  ngOnInit() {
    this.questionService.getMyQuestions().subscribe((data: ISuccessHttpResponse) => {
      this.questions = data.data.questions;
    },
        error => this.errorService.handleError(error));
  }

  deleteQuestion(id: string) {
    this.questionService.deleteQuestionById(id).subscribe(() => {
      this.questionService.getMyQuestions().subscribe((data: ISuccessHttpResponse) => {
        this.questions = data.data.questions;
      },
          error => this.errorService.handleError(error));
    },
      error => this.errorService.handleError(error));
  }
}
