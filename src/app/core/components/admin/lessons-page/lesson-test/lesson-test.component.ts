import {Component, OnInit} from '@angular/core';
import {ITest, IUser, QuestionModel} from '../../../../interface';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {MatCheckboxChange, MatDialog} from '@angular/material';
import {LessonTestResultComponent} from '../../../lessons/lesson-test-result/lesson-test-result.component';
import {AdminQuestionsService} from '../../services';
import {AdminTestService} from '../../services/admin-test.service';

@Component({
  selector: 'app-lesson-test',
  templateUrl: './lesson-test.component.html',
  styleUrls: ['./lesson-test.component.scss']
})
export class LessonTestComponent implements OnInit {


  questions: QuestionModel[];
  questionForm: FormGroup;
  id: string;
  public personCheckedIndex = -1;

  constructor(private questionsService: AdminQuestionsService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private testService: AdminTestService,
              private dialog: MatDialog
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

  personCheckboxChange(event: MatCheckboxChange, index: number) {
    // This allows only one checkbox to be checked among each checkbox
    this.personCheckedIndex = event.checked ? index : -1;
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

    this.testService.sendTests(id, question_list).subscribe((value: number) => {
        this.dialog.open(LessonTestResultComponent, {
          data: value
        });

      }
    );
  }

}
