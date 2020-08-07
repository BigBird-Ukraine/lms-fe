import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {AdminCoursesService, AdminQuestionsService} from '../../services';
import {CustomSnackbarService} from '../../../../../shared/services';
import {QuestionFormConsts} from '../../../../constans';
import {Groups, Level, QuestionModel, Subject, Tags} from '../../../../interface';
import {LevelEnum} from '../../../../enums';
import {InfoHelperService} from '../../../../services/questions';

@Component({
  selector: 'app-course-create',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit {
  form: FormGroup;

  questionForm: FormGroup;

  tagArrLength = QuestionFormConsts.TAG_ARRAY;
  answerClickCount = QuestionFormConsts.CLICK_COUNT;

  subjects: Subject[] = [];
  group: Groups[] = [];
  groupForAuto: Groups[] = [];
  tags: Tags[] = [];
  tagsForAutocomplete: Tags[] = [];
  clickCount = 0;

  levels: Level[] = [
    {level: LevelEnum.EASY},
    {level: LevelEnum.MEDIUM},
    {level: LevelEnum.HARD}];

  private isAdded: boolean;

  constructor(private dialog: MatDialog,
              public dialogRef: MatDialogRef<MatDialog>,
              private snackbarService: CustomSnackbarService,
              private fb: FormBuilder,
              private questionService: AdminQuestionsService,
              private infoService: InfoHelperService,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    this.formData();
    this.getSubjects();
    this.getGroups();
    this.getTags();

    this.tags = this.data.tags;
    this.group = this.data.group;
  }

  formData() {
    this.questionForm = this.fb.group({
      subject: this.fb.control(this.data.subject, [Validators.required]),
      group: this.fb.array(this.group),
      level: this.fb.control(this.data.level, [Validators.required]),
      tags: this.fb.array(this.tags),
      question: this.fb.control(this.data.question, [Validators.required]),
      answers: this.fb.array([], [Validators.required]),
      description: this.fb.control(this.data.description)
    });
    this.getAnswers();
  }

  editQuestion() {
    const question: QuestionModel = {...this.data, ...this.questionForm.value, tags: [...this.tags], group: [...this.group]};
    this.questionService.update(question).subscribe(() => {
      this.isAdded = true;
      setTimeout(() => {
        this.isAdded = false;
        this.dialog.closeAll();
        this.dialogRef.close(question);
      }, 1000);
    },
      );
  }

  newGroups(group) {
    const text = group.target.value;

    if (text.length) {
      this.group.push(text);
    }
    group.target.value = '';
  }


  newTag(tag) {
    const text = tag.target.value;

    if (text.length > this.tagArrLength) {
      this.tags.push(text);
    }
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

  getAnswers() {
    this.data.answers.forEach(answer => {
      if (this.clickCount < this.answerClickCount) {
        const control = new FormGroup({
          value: new FormControl(answer.value),
          correct: new FormControl(answer.correct)
        });
        (this.questionForm.get('answers') as FormArray).push(control);
        this.clickCount++;
      }
    });
  }


  delTag(tag) {
    const index = this.tags.findIndex(delTag => delTag === tag);
    this.tags.splice(index, 1);
  }

  getSubjects() {
    this.infoService.getSubject().subscribe((subject: Subject[]) => this.subjects = subject);
  }

  getGroups() {
    this.infoService.getGroups().subscribe((groups: Groups[]) => this.groupForAuto = groups);
  }

  getTags() {
    this.infoService.getTags().subscribe((tags: Tags[]) => this.tagsForAutocomplete = tags);
  }
}
