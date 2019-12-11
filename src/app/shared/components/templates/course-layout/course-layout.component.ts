import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminHelperService} from '../../../services/admin-helper.service';
import {CustomSnackbarService, ErrorService} from '../../../services';
import {AdminCoursesService} from '../../../../core/components/admin/services/admin-courses.service';
import {ICourse} from '../../../../core/components/admin/interfaces';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-course-layout',
  templateUrl: './course-layout.component.html',
  styleUrls: ['./course-layout.component.scss']
})
export class CourseLayoutComponent implements OnInit {

  courseForm: FormGroup;
  modules: any[] = [];
  modulesForAutocomplete: any[] = [];

  constructor(private fb: FormBuilder,
              private adminHelper: AdminHelperService,
              private errorService: ErrorService,
              private adminCoursesService: AdminCoursesService,
              private customSnackbarService: CustomSnackbarService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.formData();
    this.getModules();
  }

  formData() {
    this.courseForm = this.fb.group({
      label: this.fb.control(null, [Validators.required]),
      description: this.fb.control(null, [Validators.required]),
      modules_list: this.fb.array([])
    });
  }

  addCourse() {
    this.courseForm.value.modules_list = this.modules;

    const courseData: ICourse = this.courseForm.value;
    console.log(courseData);

    this.adminCoursesService.addCourse(courseData).subscribe(() => {
        this.customSnackbarService.open('Курс додано', '');
        this.dialog.closeAll();
      },
      error => this.errorService.handleError(error));
  }

  newModule(module) {
    const text = module.target.value;

    if (text.length > 0) {
      this.modules.push(text);
    }
    module.target.value = '';
  }

  getModules() {
    this.adminHelper.getModules().subscribe((modules: any[]) => this.modulesForAutocomplete = modules,
      error => this.errorService.handleError(error));
  }
}
