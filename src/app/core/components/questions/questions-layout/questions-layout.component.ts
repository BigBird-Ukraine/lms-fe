import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, FormArray, FormControl} from '@angular/forms';

import {QuestionsService, TestService} from '../../../services';
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
              private fb: FormBuilder,
              private testService: TestService
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
              value:  new FormControl(singleAnswer.value),
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
    const questionListArr = {
      question_list: []
    };

    let answers = '';

    (this.questionForm.get('question_list') as FormArray).controls.forEach(question => {
        const control = {
          question_id: null,
          chosen_answers: []
        };
        control.question_id = question.get('question').value;
        (question.get('answer') as FormArray).controls.forEach(answer => {
          if (answer.get('checked').value === true) {
            answers = answer.get('_id').value;
            control.chosen_answers.push(answers);
          }
        });
        questionListArr.question_list.push(control);
      }
    );

    this.checkTest(questionListArr);
  }

  checkTest(test) {
    this.testService.sendTests(test).subscribe();
  }

}
