import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {CreateLessonComponent} from '../create-lesson/create-lesson.component';
import {UserService} from '../../../services/user';
import {IFullLesson, ILesson, Tags} from '../../../interface';
import {UserRolesEnum} from '../../../../shared/enums';
import {LessonsService} from '../../../services/lessons.service';
import {InfoHelperService} from '../../../services/questions';
import {AuthService} from '../../../services/auth';
import {EditLessonComponent} from '../edit-lesson/edit-lesson.component';

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
  userID: string;
  showAllLessons = false;
  lessonsList: ILesson[];
  lesson: ILesson;
  tagsForAutocomplete: Tags[] = [];
  tags: Tags[] = [];
  token = this.authService.getAccessToken();
  isMyLesson = false;

  constructor(private dialog: MatDialog,
              private userService: UserService,
              private lessonService: LessonsService,
              private fb: FormBuilder,
              private infoService: InfoHelperService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.userService.getUserInfoByToken(this.token)
      .subscribe(() => {
        if (this.userService.userInfo.subscribe()) {
          this.userService.userInfo.subscribe(user => {

            this.isTeacher = user.role_id === UserRolesEnum.TEACHER;
            this.userID = user._id;
          });
        }
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

  myLessons() {
    this.isMyLesson = true;

    this.lessonService.getMyLessons().subscribe((lessons: IFullLesson) => {
      if (lessons.data.lesson) {
        this.lessonsList = lessons.data.lesson;
      } else {
        this.lessonsList = [];
      }
    });
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

  editLesson() {
    this.dialog.open(EditLessonComponent);
  }
}
