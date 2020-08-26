import {Component, OnInit} from '@angular/core';
import {IUser, QuestionModel, ITest} from '../../../interface';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';

import {QuestionsService} from '../../../services/questions';
import {TestService} from '../../../services/tests';
import {LessonTestResultComponent} from '../lesson-test-result/lesson-test-result.component';
import {UserService} from '../../../services/user';

@Component({
  selector: 'app-lesson-test',
  templateUrl: './lesson-test.component.html',
  styleUrls: ['./lesson-test.component.scss']
})
export class LessonTestComponent implements OnInit {

  questions: QuestionModel[];
  cutQuestions: Partial<QuestionModel>[] = [];
  questionForm: FormGroup;
  maxMark: number;
  id: string;

  constructor(private questionsService: QuestionsService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private testService: TestService,
              private dialog: MatDialog,
              private userService: UserService,
              private router: Router
  ) {
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getData();
    this.formData();
  }

  formData() {
    this.questionForm = this.fb.group({
      question_list: this.fb.array([])
    });
  }

  getData() {
    this.testService.getTestByLessonId(this.id).subscribe((questions: ITest) => {
      this.maxMark = questions.data.maxMark;
      this.questions = questions.data.questions;
      this.questions.forEach((el) => {
        this.cutQuestions.push({question: el.question, description: el.description, level: el.level, subject: el.subject});
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

    this.checkTest(this.id, questionListArr);
  }

  checkTest(id, test) {
    const {question_list} = test;
    this.testService.sendTests(id, question_list, this.cutQuestions).subscribe((value: IUser) => {
        this.dialog.open(LessonTestResultComponent, {
          data: value
        }).afterClosed().subscribe(res => {
          this.router.navigate([`lessons/${id}`]);
        });
      }
    );
  }
}
