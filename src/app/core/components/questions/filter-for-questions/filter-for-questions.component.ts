import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {Groups, Level, Subject, Tags} from '../../../interface';
import {InfoHelperService} from '../../../services/questions/infohelper.service';
import {QuestionFormConsts} from '../../../constans';

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

  search1 = '';
  search2 = '';
  search3 = '';

  tagArrLength = QuestionFormConsts.TAG_ARRAY;

  constructor(private fb: FormBuilder,
              private  router: Router,
              private infoHelperService: InfoHelperService,
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
  }

  getSubjects() {
    this.infoHelperService.getSubject()
      .subscribe((subjects: Subject[]) => this.subjects = subjects);
  }

  getGroups() {
    this.infoHelperService.getGroups()
      .subscribe((groups: Groups[]) => this.groups = groups);
  }

  getLevels() {
    this.infoHelperService.getLevel()
      .subscribe((levels: Level[]) => this.levels = levels);
  }

  searchTag(tag) {
    const text = tag.target.value;

    if (text.length > this.tagArrLength) {
      this.tags.push(text);
    }
    this.filterQuestions.value.tags = this.tags;
    tag.target.value = '';
  }

  startTest() {

    this.router.navigate(['/test'], {
      queryParams: {
        subject: this.filterQuestions.get('subject').value,
        group: this.filterQuestions.get('group').value,
        level: this.filterQuestions.get('level').value,
        tags: this.tags.join()
      }
    });
  }
}
