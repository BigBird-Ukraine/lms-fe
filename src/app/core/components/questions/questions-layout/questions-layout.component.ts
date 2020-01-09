import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatCheckboxChange} from '@angular/material';

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
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.getData();
    this.formData();
  }

  formData() {
    this.questionForm = this.fb.group({
      data: this.fb.array([])
    });
  }

  getData() {
    this.activatedRoute.queryParams.subscribe((params: object) => {
      this.questionsService.findQuestionByParams(params).subscribe((questions: QuestionData) => {
        this.questions = questions.data.questions;
      });
    });
  }

  formTest() {
    const test = this.questionForm.value;
    this.checkTest(test);
  }

  checkTest(test) {
    console.log(test);
  }

  onCheckChange(event: MatCheckboxChange, question) {
    const dataArray: FormArray = this.questionForm.get('data') as FormArray;
    const control = this.fb.group({
      question: this.fb.control(null),
      answer: this.fb.array([])
    });

    if (event.checked) {
      control.get('question').patchValue(question._id);
      (control.get('answer') as FormArray).push(new FormControl(event.source.value));
      dataArray.push(control);
    }

  }
}
