import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {CourseLayoutComponent} from '../../../../shared/components/templates';
import {ICourse, IFullCourse} from '../interfaces';
import {AdminCoursesService} from '../services';
import {ConfirmLayoutComponent} from '../../../../shared/components/confirm-layout/confirm-layout.component';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {

  showAllCourses = false;
  coursesList: ICourse[] = [];
  showFullInfo = false;
  courseId = '';

  constructor(private dialog: MatDialog,
              private adminCoursesService: AdminCoursesService) {
  }

  ngOnInit() {
    this.adminCoursesService.getAllCourses().subscribe((courses: IFullCourse) => {
      this.coursesList = courses.data.courses;
    });
  }

  openForm() {
    this.dialog.open(CourseLayoutComponent);
  }

  allCourses() {
    this.showAllCourses = !this.showAllCourses;
  }

  showInfo(id) {
    this.courseId = id;
    this.showFullInfo = !this.showFullInfo;
  }

  deleteCourse(id) {
    const confirm = this.dialog.open(ConfirmLayoutComponent);

    confirm.afterClosed().subscribe((result) => {
        if (result) {
          this.adminCoursesService.deleteCourse(id).subscribe(() => {
            const i = this.coursesList.findIndex(course => course._id === id);
            this.coursesList.splice(i, 1);
          });
        }
      }
    );
  }
}
