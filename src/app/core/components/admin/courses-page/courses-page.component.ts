import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {CourseLayoutComponent} from '../../../../shared/components/templates/course-layout/course-layout.component';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openForm() {
    this.dialog.open(CourseLayoutComponent);
  }

}
