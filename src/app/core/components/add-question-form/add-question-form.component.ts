import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';

import {QuestionFormConsts} from '../../constans';
import {Level, Subjects, Themes} from '../../models';
import {LevelEnum} from '../../enums';
import {log} from 'util';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-add-question-form',
  templateUrl: './add-question-form.component.html',
  styleUrls: ['./add-question-form.component.scss']
})
export class AddQuestionFormComponent implements OnInit {

  // all variable must have interface, like tags:Tags[], or type boolean, string

  questionForm: FormGroup;
  clickCount = 0;

  // todo - create interface for tags
  // todo - create interface for all form

  answerClickCount = QuestionFormConsts.CLICK_COUNT;
  tagArrLength = QuestionFormConsts.TAG_ARRAY;

  // Create interface for all object

  subjects: Subjects[] = [
    {value: 'history', viewValue: 'History'},
    {value: 'math', viewValue: 'Math'},
    {value: 'language', viewValue: 'Language'}
  ];

  levels: Level[] = [
    {value: 'low', viewValue: LevelEnum.LOW},
    {value: 'medium', viewValue: LevelEnum.MEDIUM},
    {value: 'height', viewValue: LevelEnum.HEIGHT}
  ];

  themes: Themes[] = [
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'},
    {value: '3', viewValue: '3'}
  ];

  tags: string[] = [];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    // Create function formData value, imlement in ngOnInit
    this.formData();
  }

  formData() {
    this.questionForm = this.fb.group({
      subject: this.fb.control(null, [
        Validators.required
      ]),
      theme: this.fb.control(null, [Validators.required]),
      level: this.fb.control(null, Validators.required),
      tags: this.fb.array([], Validators.required),
      question: this.fb.control(null, Validators.required),
      answersForm: this.fb.array([])
    });
  }

  newTag(tag) {
    const text = tag.target.value;

    if (text.length > this.tagArrLength) {
      this.tags.push(text);
    }

    // const control = new FormControl(this.tags, Validators.required);
    this.questionForm.value.tags = this.tags;
    // (this.questionForm.get('tags') as FormArray).push(control);
    tag.target.value = '';

  }


  removeAnswer(answer) {
    const control = this.questionForm.get('answersForm') as FormArray;
    const idx = control.value.findIndex((answerToRemove) => answerToRemove.label === answer.value.label);

    if (idx > -1) {
      control.removeAt(idx);
    }
    this.clickCount--;
  }

  addAnswer() {
    if (this.clickCount < this.answerClickCount) {

      const control = new FormGroup({
        label: new FormControl('', Validators.required),
        valid: new FormControl(false)
      });
      (this.questionForm.get('answersForm') as FormArray).push(control);

      this.clickCount++;
    }
  }

  addQuestion() {
    const formData = this.questionForm.value;
    console.log(formData);
  }
}
