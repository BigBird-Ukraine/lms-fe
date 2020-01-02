import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {CreateLessonComponent} from '../create-lesson/create-lesson.component';
import {UserService} from '../../../services/user';
import {IFullLesson, ILesson, IUserSubjectModel, Tags} from '../../../interface';
import {UserRolesEnum} from '../../../../shared/enums';
import {LessonsService} from '../../../services/lessons.service';
import {InfoHelperService} from '../../../services/questions';

@Component({
  selector: 'app-lesson-page',
  templateUrl: './lesson-page.component.html',
  styleUrls: ['./lesson-page.component.scss']
})
export class LessonPageComponent implements OnInit {
  lessonsForAutocomplete: string[] = [];
  lessonsNumberForAutocomplete: number[] = [];
  filterLessonsForm: FormGroup;
  isTeacher: boolean;
  showAllLessons = false;
  lessonsList: ILesson[];
  lesson: ILesson;
  tagsForAutocomplete: Tags[] = [];
  tags: Tags[] = [];

  constructor(private dialog: MatDialog,
              private userService: UserService,
              private lessonService: LessonsService,
              private fb: FormBuilder,
              private infoService: InfoHelperService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.userService.userInfo.subscribe((user: IUserSubjectModel) => {
      this.isTeacher = user.role_id === UserRolesEnum.TEACHER;
    });

    this.getLessons();
    this.filterForm();
    this.getTags();
  }

  filterForm() {
    this.filterLessonsForm = this.fb.group({
      label: this.fb.control(null),
      number: this.fb.control(null),
      tags: this.fb.array([])
    });
  }

  openForm() {
    this.dialog.open(CreateLessonComponent);
  }

  allLessons() {
    this.showAllLessons = !this.showAllLessons;
  }

  getLessons() {
    this.lessonService.getAllLessons().subscribe((lessons: IFullLesson) => {
      this.lessonsList = lessons.data.lesson.sort((a, b) => {
         return (a.number - b.number);
      });
      this.lessonsForAutocomplete = lessons.data.lesson.map(lessonsArr => lessonsArr.label);
      this.lessonsNumberForAutocomplete = lessons.data.lesson.map(lessonsArr => lessonsArr.number);

    });
  }

  getTags() {
    this.infoService.getTags().subscribe((tags: Tags[]) => this.tagsForAutocomplete = tags);
  }

  newTag(tag) {
    const text = tag.target.value;

    if (text.length) {
      this.tags.push(text);
    }
    tag.target.value = '';
  }

  delTag(tag) {
    const index = this.tags.findIndex(delTag => delTag === tag);

    this.tags.splice(index, 1);
  }

  viewLesson(id: string) {
    this.lesson = this.lessonsList.find(lesson => lesson._id === id);
  }

  showFiltered() {
    this.filterLessonsForm.value.tags = this.tags;

    const keys = Object.keys(this.filterLessonsForm.value);

    keys.forEach(key => {
      if (!this.filterLessonsForm.value[key]) {
        delete this.filterLessonsForm.value[key];
      }
    });

    this.router.navigate(['/lessons'], {
      queryParams: {
        ...this.filterLessonsForm.value
      }
    });

    this.activatedRoute.queryParams.subscribe((params: object) => {
      this.lessonService.getLessonsByParams(params).subscribe((lessonsData: IFullLesson) => {
        if (lessonsData.data.lesson) {
          this.lessonsList = lessonsData.data.lesson;
        } else {
          this.lessonsList = [];
        }
      });
    });
  }
}
