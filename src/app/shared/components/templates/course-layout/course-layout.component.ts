import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';

import {AdminHelperService, CustomSnackbarService} from '../../../services';
import {AdminCoursesService} from '../../../../core/components/admin/services';
import {ICourse, IFullModule, IModule} from '../../../../core/components/admin/interfaces';

@Component({
  selector: 'app-course-layout',
  templateUrl: './course-layout.component.html',
  styleUrls: ['./course-layout.component.scss']
})
export class CourseLayoutComponent implements OnInit {

  courseForm: FormGroup;
  modules: string[] = [];
  modulesId: string[] = [];
  modulesForAutocomplete: string[] = [];
  modulesInfo: IModule[] = [];

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
    this.courseForm.value.modules_list = this.modulesId;

    const courseData: ICourse = this.courseForm.value;

    this.adminCoursesService.addCourse(courseData).subscribe(() => {
      this.customSnackbarService.open('Курс додано', '');
      this.dialog.closeAll();
    });
  }

  newModule(module) {
    const text = module.target.value;

    if (text.length && this.modulesForAutocomplete.includes(text)) {
      this.modules.push(text);

      const checkedModule = this.modulesInfo.find(mod => text === mod.label);
      this.modulesId.push(checkedModule._id);
    } else {
      this.customSnackbarService.open('Виберіть модуль зі списку');
    }
    module.target.value = '';
  }

  delModule(module) {
    const moduleIndex = this.modules.findIndex(mod => module === mod);
    const findModule = this.modulesInfo.find(mod => module === mod.label);
    const findIDIndex = this.modulesId.findIndex(id => id = findModule._id);

    this.modules.splice(moduleIndex, 1);
    this.modulesId.splice(findIDIndex, 1);
  }

  getModules() {
    this.adminHelper.getModules().subscribe((modules: IFullModule) => {
      this.modulesInfo = modules.data;
      this.modulesForAutocomplete = modules.data.map(moduleInfo => moduleInfo.label);
    });
  }
}
