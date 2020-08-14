import { Component, OnInit } from '@angular/core';
import {CoursesService} from '../../../services/courses';
import {PatricalICourse} from '../../admin/interfaces';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {

  courses: PatricalICourse;

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.coursesService.getMyCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

}
