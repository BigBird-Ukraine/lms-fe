import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, FormArray, FormControl} from '@angular/forms';
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
  check: any;
  count = 0;

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
      });
    });
  }

  formTest(event) {
    // const dataArray: FormArray = this.questionForm.get('data') as FormArray;
    // const control = this.fb.group({
    //   question_id: this.fb.control(null),
    //   chosen_answers: this.fb.array([])
    // });
    //
    // console.log(event);
    const test = this.questionForm.value;

    this.checkTest(test);
  }

  checkTest(test) {
    console.log(test);
  }

  onCheckChange(event: MatCheckboxChange, questionID) {
    // const anwersID = [];
    //
    // if (event.checked) {
    //   anwersID.push(event.source.value, questionID);
    // }
    //
    // console.log(anwersID);

    const dataArray: FormArray = this.questionForm.get('question_list') as FormArray;
    // const control = this.fb.group({
    //   // todo add info to obj
    //   question: this.fb.control(questionID),
    //   answer: this.fb.array([])
    // });
    if (this.count === 0) {
      const control = this.fb.group({
        // todo add info to obj
        question: this.fb.control(questionID),
        answer: this.fb.array([event.source.value])
      });
      dataArray.push(control);
      this.count++;
      return null;
    }


    dataArray.controls.forEach(q => {
        if (q.get('question').value === questionID) {
          if ((q.get('answer') as FormArray).controls.some(a => a.value === event.source.value)) {
            let index = (q.get('answer') as FormArray).controls.findIndex(i => i.value === event.source.value);
            (q.get('answer') as FormArray).controls.splice(index, 1);
            // (q.get('answer') as FormArray).controls = (q.get('answer') as FormArray).controls.filter(arr => arr.value !== event.source.value);
            console.log(22);
          } else {
            (q.get('answer') as FormArray).push(new FormControl(event.source.value));
          }

        } else {
          const control = this.fb.group({
            question: this.fb.control(questionID),
            answer: this.fb.array([event.source.value])
          });
          dataArray.push(control);
        }
      }
    );


    // if (event.checked) {
    //
    //   if (this.check !== questionID) {
    //     (control.get('answer') as FormArray).push(new FormControl(event.source.value));
    //
    //   } else {
    //     (control.get('answer') as FormArray).push(new FormControl(event.source.value));
    //     console.log(event.source.value);
    //   }
  }


// }

}
