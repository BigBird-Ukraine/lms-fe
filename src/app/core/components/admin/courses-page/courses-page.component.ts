import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {CourseLayoutComponent} from '../../../../shared/components/templates';
import {ICourse, IFullCourse, IFullModule, IModule} from '../interfaces';
import {AdminCoursesService} from '../services';
import {ConfirmLayoutComponent} from '../../../../shared/components/confirm-layout/confirm-layout.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AdminHelperService} from '../../../../shared/services';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {

  showAllCourses = false;
  coursesList: ICourse[] = [];
  coursesForAutocomplete: string[] = [];
  showFullInfo = false;
  courseId = '';
  filterCoursesForm: FormGroup;
  modulesForAutocomplete: string[] = [];
  modules: string[] = [];
  modulesId: string[] = [];
  modulesData: IModule[] = [];

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
      this.coursesForAutocomplete = courses.data.courses.map(coursesInfo => coursesInfo.label);
    });
  }

  getModules() {
    this.adminHelper.getModules().subscribe((modules: IFullModule) => {
      this.modulesData = modules.data;
      this.modulesForAutocomplete = modules.data.map(modulesInfo => modulesInfo.label);
    });
  }

  newModule(module) {
    const text = module.target.value;

    if (text.length) {
      this.modules.push(text);

      const checkedModule = this.modulesData.find(mod => text === mod.label);
      this.modulesId.push(checkedModule._id);
    }
    module.target.value = '';
  }

  delModule(module) {
    const moduleIndex = this.modules.findIndex(mod => module === mod);
    const findModule = this.modulesData.find(mod => module === mod.label);
    const findIDIndex = this.modulesId.findIndex(id => id = findModule._id);

    this.modules.splice(moduleIndex, 1);
    this.modulesId.splice(findIDIndex, 1);
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
    this.filterCoursesForm.value.modules_list = this.modulesId;

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
        if (course.data.courses) {
          this.coursesList = course.data.courses;
        } else {
          this.coursesList = [];
        }
      });
    });
  }

}
