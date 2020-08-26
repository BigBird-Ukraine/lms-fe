import { Component, OnInit } from '@angular/core';
import {CoursesService} from '../../../services/courses';
import {PatricalICourse} from '../../admin/interfaces';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {

  courses: PatricalICourse;

  constructor(private coursesService: CoursesService, private router: Router) { }

  ngOnInit() {
    this.coursesService.getMyCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

}
