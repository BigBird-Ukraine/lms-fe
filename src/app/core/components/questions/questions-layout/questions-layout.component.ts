import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, FormArray, FormControl} from '@angular/forms';

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
  check: any;
  count = true;

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
      question_list: this.fb.array([])
    });
  }

  getData() {
    this.activatedRoute.queryParams.subscribe((params: object) => {
      this.questionsService.findQuestionByParams(params).subscribe((questions: QuestionData) => {
        this.questions = questions.data.questions;
        this.questions.forEach((el) => {
          const questionListArr = (this.questionForm.get('question_list')) as FormArray;
          const control = this.fb.group({
            question: this.fb.control(el._id),
            answer: this.fb.array([])
          });
          const answersArr = (control.get('answer')) as FormArray;
          el.answers.forEach(singleAnswer => {
            const answerControl = new FormGroup({
              _id: new FormControl(singleAnswer._id),
              value: new FormControl(singleAnswer.value),
              checked: new FormControl(false)
            });
            answersArr.push(answerControl);
          });
          questionListArr.push(control);
        });
      });
    });
  }

  formTest() {
    let xxx = (this.questionForm.get('question_list') as FormArray).controls
      .map(a => {
        let aaa = (a.get('answer') as FormArray).controls.map(o => {
          if (o.get('checked').value === true) {
            return o.get('_id').value;
          }});
        (a.get('answer') as FormArray).controls = aaa;
      });

    console.log(xxx);
  }

  checkTest(test) {
    console.log(test);
  }

}
