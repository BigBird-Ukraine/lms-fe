import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {Groups, Level, Subject, Tags} from '../../../interface';
import {InfoHelperService} from '../../../services/questions/infohelper.service';
import {QuestionFormConsts} from '../../../constans';
import {ErrorService} from '../../../../shared/services/error.service';

@Component({
  selector: 'app-filter-for-questions',
  templateUrl: './filter-for-questions.component.html',
  styleUrls: ['./filter-for-questions.component.scss']
})
export class FilterForQuestionsComponent implements OnInit {

  filterQuestions: FormGroup;
  subjects: Subject[] = [];
  groups: Groups[] = [];
  levels: Level[] = [];
  tags: Tags[] = [];
  tagsForAutocomplete: Tags[] = [];

  tagArrLength = QuestionFormConsts.TAG_ARRAY;

  constructor(private fb: FormBuilder,
              private  router: Router,
              private infoHelperService: InfoHelperService,
              private errorService: ErrorService
  ) {
  }

  ngOnInit() {
    this.filterQuestions = this.fb.group({
      subject: this.fb.control(null),
      group: this.fb.control(null),
      level: this.fb.control(null),
      tags: this.fb.control(null)
    });

    this.getSubjects();
    this.getGroups();
    this.getLevels();
    this.getTags();
  }

  getSubjects() {
    this.infoHelperService.getSubject()
      .subscribe((subjects: Subject[]) => this.subjects = subjects,
        error => this.errorService.handleError(error));
  }

  getGroups() {
    this.infoHelperService.getGroups()
      .subscribe((groups: Groups[]) => this.groups = groups,
        error => this.errorService.handleError(error));
  }

  getLevels() {
    this.infoHelperService.getLevel()
      .subscribe((levels: Level[]) => this.levels = levels,
        error => this.errorService.handleError(error));
  }

  getTags() {
    this.infoHelperService.getTags()
      .subscribe((tags: Tags[]) => this.tagsForAutocomplete = tags,
        error => this.errorService.handleError(error));
  }

  searchTag(tag) {
    const text = tag.target.value;

    if (text.length > this.tagArrLength) {
      this.tags.push(text);
    }
    tag.target.value = '';
  }

  startTest() {
    this.filterQuestions.value.tags = this.tags;

    const keys = Object.keys(this.filterQuestions.value);
    keys.forEach(key => {
      if (!this.filterQuestions.value[key]) {
        delete this.filterQuestions.value[key];
      }
    });

    this.router.navigate(['/test'], {
      queryParams: {
       ...this.filterQuestions.value
      }
    });
  }
}
