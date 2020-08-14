import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {QuestionModel} from '../../interfaces';
import {AdminQuestionsService} from '../../services';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  questions: Partial<QuestionModel[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private questionsService: AdminQuestionsService) {
  }

  ngOnInit() {
    this.questionsService.getQuestionBySubject(this.data.subject).subscribe(questions => {
      this.questions = questions;
    });
  }

}
