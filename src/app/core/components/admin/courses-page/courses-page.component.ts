import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {CourseLayoutComponent} from '../../../../shared/components/templates';
import {ICourse, IFullCourse, IFullModule, IModule} from '../interfaces';
import {AdminCoursesService} from '../services';
import {ConfirmLayoutComponent} from '../../../../shared/components/confirm-layout/confirm-layout.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AdminHelperService} from '../../../../shared/services';
import {QuestionData} from '../../../interface';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {

  showAllCourses = false;
  coursesList: ICourse[] = [];
  filterCoursesList: ICourse[] = [];
  showFullInfo = false;
  courseId = '';
  filterCoursesForm: FormGroup;
  modulesForAutocomplete: IModule[] = [];
  modules: string[] = [];
  modulesId: string[] = [];

  constructor(private dialog: MatDialog,
              private adminCoursesService: AdminCoursesService,
              private fb: FormBuilder,
              private adminHelper: AdminHelperService,
              private router: Router,
              private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.getAllCourses();
    this.form();
    this.getModules();
  }

  form() {
    this.filterCoursesForm = this.fb.group({
      label: this.fb.control(''),
      modules_list: this.fb.array([])
    });
  }

  getAllCourses() {
    this.adminCoursesService.getAllCourses().subscribe((courses: IFullCourse) => {
      this.coursesList = courses.data.courses;
    });
  }

  getModules() {
    this.adminHelper.getModules().subscribe((modules: IFullModule) => {
      this.modulesForAutocomplete = modules.data;
    });
  }

  newModule(module) {
    const text = module.target.value;

    if (text.length) {
      this.modules.push(text);

      const checkedModule = this.modulesForAutocomplete.find(mod => text === mod.label);
      this.modulesId.push(checkedModule._id);
    }

    this.filterCoursesForm.value. modules_list = this.modulesId;
    module.target.value = '';
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

  showFiltered() {
    const keys = Object.keys(this.filterCoursesForm.value);
    keys.forEach(key => {
      if (!this.filterCoursesForm.value[key]) {
        delete this.filterCoursesForm.value[key];
      }
    });

    this.router.navigate(['/adminPanel/courses'], {
      queryParams: {
        ...this.filterCoursesForm.value
      }
    });

    this.activatedRoute.queryParams.subscribe((params: object) => {
      this.adminCoursesService.findCourseByParams(params).subscribe((course: IFullCourse) => {
        this.filterCoursesList = course.data.courses;
        console.log(this.filterCoursesList);
      });
    });

  }
}
