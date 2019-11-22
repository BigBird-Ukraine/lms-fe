import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {QuestionsService} from '../../../services/questions/questions.service';
import {QuestionModel} from '../../../interface';

@Component({
  selector: 'app-questions-layout',
  templateUrl: './questions-layout.component.html',
  styleUrls: ['./questions-layout.component.scss']
})
export class QuestionsLayoutComponent implements OnInit {

  questions: QuestionModel[];

  constructor(private questionsService: QuestionsService,
              private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.questionsService.findQuestionByParams(params).subscribe(questions => {
        this.questions = questions.data.questions;
      });
    });
  }
}
