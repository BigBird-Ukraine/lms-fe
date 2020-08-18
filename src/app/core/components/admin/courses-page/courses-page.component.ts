import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subject} from "rxjs";
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, switchMap, take} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';

import {ICourse, IPaginator} from '../interfaces';
import {AdminCoursesService} from '../services';
import {CourseCreateComponent} from './course-create/course-create.component';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {
  getCourses: ICourse[];
  form: FormGroup;
  length: number;
  pageSize: number = 50;
  pageIndex: number = 0;
  subject = new Subject<any>();

  constructor(private dialog: MatDialog,
              private adminCoursesService: AdminCoursesService,
              private router: Router,
              private route: ActivatedRoute) {
    this.subject.pipe(
      debounceTime(500)
    ).subscribe(() => this.getFilteredCourses());
  }

  ngOnInit() {
    this.form = new FormGroup({
      label: new FormControl(''),
    });
    this.getFilteredCourses();
  }

  create() {
    this.dialog.open(CourseCreateComponent, {
      disableClose: true
    }).afterClosed().subscribe(() => this.ngOnInit());
  }

  getFilteredCourses(event?: Partial<IPaginator>) {
    if (event) {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
    } else {
      this.pageIndex = 0;
    }

    this.getCourses = null;

    const keys = Object.keys(this.form.value);
    keys.forEach(value => {
      if (!this.form.value[value]) {
        delete this.form.value[value];
      }
    });

    this.router.navigate(['/adminPanel/courses'], {
      queryParams: {
        ...this.form.value,
        pageSize: this.pageSize,
        pageIndex: this.pageIndex
      }
    });

    this.route.queryParams.pipe(
      switchMap(value => {
        return this.adminCoursesService.findCourseByParams(value)
      }),
      take(1),
    ).subscribe(value => {
      this.length = value.data.count;
      this.getCourses = value.data.courses
    });
  }

  reset() {
    this.ngOnInit();
  }

}
