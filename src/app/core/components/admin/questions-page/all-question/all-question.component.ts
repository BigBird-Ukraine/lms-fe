import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {QuestionModel} from '../../../../interface';
import {ISuccessHttpResponse} from '../../../../../shared/models/interfaces';
import {ConfirmLayoutComponent} from '../../../../../shared/components/confirm-layout/confirm-layout.component';
import {AdminQuestionsService} from '../../services';
import {EditQuestionComponent} from '../edit-question/edit-question.component';

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
