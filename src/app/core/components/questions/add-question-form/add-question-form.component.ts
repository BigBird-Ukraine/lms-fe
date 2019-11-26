import {Component, OnInit} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import {QuestionsService} from '../../../services/questions/questions.service';
import {InfoHelperService} from '../../../services/questions/infohelper.service';
import {QuestionFormConsts} from '../../../constans';
import {LevelEnum} from '../../../enums';
import {QuestionModel, Level, Tags, Groups} from '../../../interface';


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

  subjects: string[] = [];
  // filteredSubject: string[];

  group: Groups[] = [];
  groupForAuto: Groups[] = [];
  tags: Tags[] = [];
  tagsForAutocomplete: Tags[] = [];

  levels: Level[] = [
    {level: LevelEnum.EASY},
    {level: LevelEnum.EASY_PLUS},
    {level: LevelEnum.MEDIUM},
    {level: LevelEnum.MEDIUM_PLUS},
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
      answers: this.fb.array([], [Validators.required])
    });
  }

  newGroups(group) {
    const text = group.target.value;

    if (text.length > 0) {
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

  addQuestion() {
    this.questionForm.value.group = this.group;
    this.questionForm.value.tags = this.tags;
    const formData = this.questionForm.value;
    this.createQuestion(formData);
    this.questionForm.reset();
  }

  createQuestion(question: QuestionModel) {
    this.questionService.createQuestion(question).subscribe(() => {
      this.isAdded = true;
      setTimeout(() => {
        this.isAdded = false;
      }, 4000);
    });
  }

  getSubjects() {
    this.infoService.getSubject().subscribe((s: any[]) => this.subjects = s);
  }

  getGroups() {
    this.infoService.getGroups().subscribe((groups: Groups[]) => this.groupForAuto = groups);
  }

  getTags() {
    this.infoService.getTags().subscribe((tags: Tags[]) => this.tagsForAutocomplete = tags);
  }

  // filterSubjects() {
  //   const currentValue = this.questionForm.value.subject.toLocaleLowerCase();
  //
  //   this.filteredSubject = this.subjects.filter(sub => sub.toLocaleLowerCase().startsWith(currentValue));
// }

// filterGroups() {
//   const currentValue = this.questionForm.value.group.toLocaleLowerCase();
//
//   this.filteredGroups = this.groups.filter(group => group.toLocaleLowerCase().startsWith(currentValue));
// }

}
