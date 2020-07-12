import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';

import {IModule, ILesson} from '../../../../core/components/admin/interfaces';
import {AdminModuleService} from '../../../../core/components/admin/services';
import {AdminHelperService, CustomSnackbarService} from '../../../services';
import {Tags} from '../../../../core/interface';
import {InfoHelperService} from '../../../../core/services/questions';


@Component({
  selector: 'app-module-layout',
  templateUrl: './module-layout.component.html',
  styleUrls: ['./module-layout.component.scss']
})
export class ModuleLayoutComponent implements OnInit {

  moduleForm: FormGroup;
  lessons: string[] = [];
  lessonsForAutocomplete: string[] = [];
  lessonsObjects: ILesson[] = [];
  tagsForAutocomplete: Tags[] = [];
  tags: Tags[] = [];

  constructor(private fb: FormBuilder,
              private dialog: MatDialog,
              private adminModuleService: AdminModuleService,
              private customSnackbarService: CustomSnackbarService,
              private adminHelper: AdminHelperService,
              private infoService: InfoHelperService) {
  }

  ngOnInit() {
    this.formData();
    this.getLessons();
    this.getTags();
  }

  formData() {
    this.moduleForm = this.fb.group({
      label: this.fb.control(null, [Validators.required]),
      description: this.fb.control(null),
      lessons_list: this.fb.array([]),
      tag_list: this.fb.array([])
    });
  }

  addModule() {
    this.moduleForm.value.lessons_list = this.lessons;
    this.moduleForm.value.tag_list = this.tags;

    const moduleData: IModule = this.moduleForm.value;

    const lessonsId = this.lessonsObjects.map(obj => obj._id);
    moduleData.lessons_list = lessonsId;

    this.adminModuleService.addModule(moduleData).subscribe(() => {
      this.customSnackbarService.open('Модуль додано', '');
      this.dialog.closeAll();
    });
  }

  newLesson(lesson) {
    const text = lesson.target.value;

    if (text.length) {
      this.lessons.push(text);
    }
    lesson.target.value = '';
  }

  newTag(tag) {
    const text = tag.target.value;

    if (text.length) {
      this.tags.push(text);
    }
    tag.target.value = '';
  }

  getLessons() {
    this.adminHelper.getLessons().subscribe((lessons: ILesson[]) => {
      this.lessonsForAutocomplete = lessons.map(lesson => lesson.label);
      this.lessonsObjects = lessons;
    });
  }

  getTags() {
    this.infoService.getTags().subscribe((tags: Tags[]) => this.tagsForAutocomplete = tags);
  }
}
