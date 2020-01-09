import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {QuestionsService} from '../../../services';
import {QuestionData, QuestionModel} from '../../../interface';

@Component({
  selector: 'app-questions-layout',
  templateUrl: './questions-layout.component.html',
  styleUrls: ['./questions-layout.component.scss']
})
export class QuestionsLayoutComponent implements OnInit {

  questions: QuestionModel[];
  questionForm: FormGroup;

  constructor(private questionsService: QuestionsService,
              private activatedRoute: ActivatedRoute
              private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.getData();
    this.formData();
  }

  formData() {
    this.questionForm = this.fb.group({
      correct: this.fb.control(null)
    });
  }

  getData() {
    this.activatedRoute.queryParams.subscribe((params: object) => {
        this.questionsService.findQuestionByParams(params).subscribe((questions: QuestionData) => {
          this.questions = questions.data.questions;
        });
      });
  }
}
