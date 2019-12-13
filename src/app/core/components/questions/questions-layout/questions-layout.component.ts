import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {QuestionsService} from '../../../services';
import {QuestionData, QuestionModel} from '../../../interface';

@Component({
  selector: 'app-questions-layout',
  templateUrl: './questions-layout.component.html',
  styleUrls: ['./questions-layout.component.scss']
})
export class QuestionsLayoutComponent implements OnInit {

  questions: QuestionModel[];

  constructor(private questionsService: QuestionsService,
              private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.activatedRoute.queryParams.subscribe((params: object) => {
        this.questionsService.findQuestionByParams(params).subscribe((questions: QuestionData) => {
          this.questions = questions.data.questions;
        });
      });
  }
}
