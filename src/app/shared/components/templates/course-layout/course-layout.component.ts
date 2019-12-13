import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';

import {AdminHelperService, CustomSnackbarService} from '../../../services';
import {AdminCoursesService} from '../../../../core/components/admin/services';
import {ICourse, IModule} from '../../../../core/components/admin/interfaces';

@Component({
  selector: 'app-course-layout',
  templateUrl: './course-layout.component.html',
  styleUrls: ['./course-layout.component.scss']
})
export class CourseLayoutComponent implements OnInit {

  courseForm: FormGroup;
  modules: IModule[] = [];
  modulesForAutocomplete: IModule[] = [];

  constructor(private fb: FormBuilder,
              private adminHelper: AdminHelperService,
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

    this.adminCoursesService.addCourse(courseData).subscribe(() => {
        this.customSnackbarService.open('Курс додано', '');
        this.dialog.closeAll();
      });
  }

  newModule(module) {
    const text = module.target.value;

    if (text.length) {
      this.modules.push(text);
    }
    module.target.value = '';
  }

  getModules() {
    this.adminHelper.getModules().subscribe((modules: IModule[]) => this.modulesForAutocomplete = modules);
  }
}
