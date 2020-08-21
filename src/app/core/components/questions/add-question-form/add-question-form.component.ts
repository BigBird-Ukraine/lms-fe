import {Component, OnInit} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import {QuestionsService, InfoHelperService} from '../../../services';
import {QuestionFormConsts} from '../../../constans';
import {LevelEnum} from '../../../enums';
import {QuestionModel, Level, Tags, Groups, Subject} from '../../../interface';


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

  subjects: Subject[] = [];
  group: Groups[] = [];
  groupForAuto: Groups[] = [];
  tags: Tags[] = [];
  tagsForAutocomplete: Tags[] = [];

  levels: Level[] = [
    {level: LevelEnum.EASY},
    {level: LevelEnum.MEDIUM},
    {level: LevelEnum.HARD}];

  private isAdded: boolean;

  constructor(private fb: FormBuilder,
              private questionService: QuestionsService,
              private infoService: InfoHelperService) {
  }

  ngOnInit() {
    this.formData();
    this.getSubjects();
    this.getGroups();
    this.getTags();
  }

  formData() {
    this.questionForm = this.fb.group({
      subject: this.fb.control(null, [Validators.required]),
      group: this.fb.array([]),
      level: this.fb.control(null, [Validators.required]),
      tags: this.fb.array([]),
      question: this.fb.control(null, [Validators.required]),
      answers: this.fb.array([], [Validators.required]),
      description: this.fb.control(null)
    });
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

  delTag(tag) {
    const index = this.tags.findIndex(delTag => delTag === tag);

    this.tags.splice(index, 1);
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
    this.questionForm.value.group = this.group;
    this.questionForm.value.tags = this.tags;
    const formData = this.questionForm.value;
    this.createQuestion(formData);
    this.questionForm.reset();
  }

  createQuestion(question: QuestionModel) {
    this.questionService.createQuestion(question).subscribe(() => {
      this.group = [];
      this.tags = [];
      const control = this.questionForm.get('answers') as FormArray;
      control.clear();
      this.clickCount = 0;
      this.isAdded = true;
      setTimeout(() => {
        this.isAdded = false;
      }, 4000);
    });
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
