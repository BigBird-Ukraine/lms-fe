import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {QuestionModel} from '../../../../interface';
import {ISuccessHttpResponse} from '../../../../../shared/models/interfaces';
import {ConfirmLayoutComponent} from '../../../../../shared/components/confirm-layout/confirm-layout.component';
import {AdminQuestionsService} from '../../services';

@Component({
  selector: 'app-all-question',
  templateUrl: './all-question.component.html',
  styleUrls: ['./all-question.component.scss']
})
export class AllQuestionComponent implements OnInit {


  constructor(private questionService: AdminQuestionsService,
              private dialog: MatDialog
  ) {
  }

  questions: QuestionModel[] = [];

  ngOnInit() {
    this.questionService.getAllQuestion().subscribe((data: ISuccessHttpResponse) => {
      this.questions = data.data.questions;
    });
  }

  deleteQuestion(id: string) {
    const confirm = this.dialog.open(ConfirmLayoutComponent);

    confirm.afterClosed().subscribe((result) => {
      if (result) {
        this.questionService.deleteQuestionById(id).subscribe(() => {
          this.questionService.getAllQuestion().subscribe((data: ISuccessHttpResponse) => {
            this.questions = data.data.questions;
          });
        });
      }
    });
  }

}
