import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatCheckboxChange, MatDialog} from '@angular/material';

import {AdminQuestionsService} from '../../services';
import {AdminTestService} from '../../services/admin-test.service';
import {LessonsTestResultComponent} from '../lessons-test-result/lessons-test-result.component';
import {ITest, QuestionModel} from '../../interfaces';

@Component({
  selector: 'app-lesson-test',
  templateUrl: './lesson-test.component.html',
  styleUrls: ['./lesson-test.component.scss']
})
export class LessonTestComponent implements OnInit {


  questions: QuestionModel[];
  questionForm: FormGroup;
  id: string;
  public countCorrectAnswer = 0;

  constructor(private questionsService: AdminQuestionsService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private testService: AdminTestService,
              private dialog: MatDialog,
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
      this.questions = questions.data.questions_id;
      this.questions.forEach((el) => {
        const questionListArr = (this.questionForm.get('question_list')) as FormArray;
        const control = this.fb.group({
          question: this.fb.control(el._id),
          answer: this.fb.array([])
        });
        const answersArr = (control.get('answer')) as FormArray;
        el.answers.forEach(singleAnswer => {
          if (singleAnswer.correct) {
            this.countCorrectAnswer = +this.countCorrectAnswer + 1;
          }
          const answerControl = new FormGroup({
            _id: new FormControl(singleAnswer._id),
            value: new FormControl(singleAnswer.value),
            checked: new FormControl(false)
          });
          answersArr.push(answerControl);
        });
        questionListArr.push(control);
      });
      this.countCorrectAnswer *= 10;
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

    this.testService.sendTests(id, question_list).subscribe((value: number) => {
        this.dialog.open(LessonsTestResultComponent, {
          data: value
        }).afterClosed().subscribe(res => this.router.navigate(['admin/adminPanel/lessons']));

      }
    );
  }

}
