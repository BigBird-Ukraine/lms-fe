import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {CourseLayoutComponent} from '../../../../shared/components/templates';
import {ICourse, IFullCourse} from '../interfaces';
import {AdminCoursesService} from '../services';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {

  showAllCourses = false;
  coursesList: ICourse[] = [];
  showFullInfo = false;

  constructor(private dialog: MatDialog,
              private adminCoursesService: AdminCoursesService) {
  }

  ngOnInit() {
    this.adminCoursesService.getAllCourses().subscribe((courses: IFullCourse) => {
      this.coursesList = courses.data;
    }
);
  }

  openForm() {
    this.dialog.open(CourseLayoutComponent);
  }

  allCourses() {
    this.showAllCourses = !this.showAllCourses;
  }

  showInfo() {
    this.showFullInfo = !this.showFullInfo;
  }
}
