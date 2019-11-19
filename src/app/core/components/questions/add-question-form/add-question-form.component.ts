import {Component, OnInit} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';

import {QuestionsService} from '../../../services/questions/questions.service';
import {InfoHelperService} from '../../../services/questions/infohelper.service';

import {QuestionFormConsts} from '../../../constans';
import {Group} from '../../../models';
import {LevelEnum} from '../../../enums';
import {QuestionModel, Level, Subject, Tags} from '../../../interface';

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

  questionForm: FormGroup;
  clickCount = 0;
  answerClickCount = QuestionFormConsts.CLICK_COUNT;
  tagArrLength = QuestionFormConsts.TAG_ARRAY;

  subjects: Subject[] = [
    {subject: 'Історія'},
    {subject: 'Математика'},
    {subject: 'Література'}
  ];
  levels: Level[] = [
    {level: LevelEnum.LOW},
    {level: LevelEnum.LOW_STRONG},
    {level: LevelEnum.MEDIUM},
    {level: LevelEnum.MEDIUM_STRONG},
    {level: LevelEnum.HEIGHT}
  ];
  tags: Tags[] = [];

  group: Group[] = [
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'},
    {value: '3', viewValue: '3'}
  ];


  constructor(private fb: FormBuilder,
              private questionService: QuestionsService,
              private infoService: InfoHelperService) {
  }

  ngOnInit() {
    this.formData();
  }

  formData() {
    this.questionForm = this.fb.group({
      subject: this.fb.control(null, [Validators.required]),
      group: this.fb.control(null, [Validators.required]),
      level: this.fb.control(null, [Validators.required]),
      tags: this.fb.array([], [Validators.required]),
      question: this.fb.control(null, [Validators.required]),
      answers: this.fb.array([], [Validators.required])
    });
  }

  newTag(tag) {
    const text = tag.target.value;

    if (text.length > this.tagArrLength) {
      this.tags.push(text);
    }
    this.questionForm.value.tags = this.tags;
    tag.target.value = '';
  }

  removeAnswer(answer) {
    const control = this.questionForm.get('answers') as FormArray;
    const idx = control.value.findIndex((answerToRemove) => answerToRemove.label === answer.value.label);

    if (idx > -1) {
      control.removeAt(idx);
    }
    this.clickCount--;
  }

  addAnswer() {
    if (this.clickCount < this.answerClickCount) {
      const control = new FormGroup({
        value: new FormControl('', Validators.required),
        correct: new FormControl(false)
      });
      (this.questionForm.get('answers') as FormArray).push(control);
      this.clickCount++;
    }
  }

  addQuestion() {
    const formData = this.questionForm.value;
    console.log(formData);
    this.createQuestion(formData);
    this.questionForm.reset();
  }

  createQuestion(question: QuestionModel) {
    this.questionService.createQuestion(question).subscribe((f) => console.log(`question was created`));
  }

  getSubjects() {
    this.infoService.getSubject().subscribe((s) => {
      this.subjects = this.objCreator(s);
    });
  }

  getLevel() {
    this.infoService.getLevel().subscribe((l) => {
      console.log(l);
    });
  }

  getTags() {
    this.infoService.getTags().subscribe((t) => {
      console.log(t);
    });
  }

  objCreator(arr) {
    let obj = {};
    const res = [];

    arr.forEach(o => {
      obj = {
        value: String(o),
        viewValue: String(o)
      };
      res.push(obj);
    });

    return res;
  }
}
