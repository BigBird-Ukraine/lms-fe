import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';

import {IFullLesson, ILesson, IModule} from '../../../../core/components/admin/interfaces';
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
      tags: this.fb.array([])
    });
  }

  addModule() {
    this.moduleForm.value.lessons_list = this.lessons;
    this.moduleForm.value.tags = this.tags;

    const moduleData: IModule = this.moduleForm.value;

    moduleData.lessons_list = this.lessonsObjects.filter(lessonObj =>
      this.lessons.find(el => el === lessonObj.label)
    ).map(obj => obj._id);

    this.adminModuleService.addModule(moduleData).subscribe((res) => {
      this.adminModuleService.getAllCropped().subscribe(
        modules => this.adminModuleService.modules = modules.data
      );
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
    this.adminHelper.getLessons().subscribe((lessons: IFullLesson) => {
      this.lessonsForAutocomplete = lessons.data.lesson.map(lesson => lesson.label);
      this.lessonsObjects = lessons.data.lesson;
    });
  }

  getTags() {
    this.infoService.getTags().subscribe((tags: Tags[]) => this.tagsForAutocomplete = tags);
  }


  delTag(tag) {
    const index = this.tags.findIndex(delTag => delTag === tag);

    this.tags.splice(index, 1);
  }

  delLesson(lesson) {
    const index = this.lessons.findIndex(delLesson => delLesson === lesson);

    this.lessons.splice(index, 1);
  }
}
