import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {CustomSnackbarService} from '../../../../../shared/services';
import {IEditLesson, ILesson, Tags} from '../../interfaces';
import {InfoHelperService} from '../../../../services/questions';
import {AdminLessonService} from '../../services';

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.scss']
})
export class EditLessonComponent implements OnInit {
  editLessonForm: FormGroup;
  lesson: ILesson;
  tagsForAutocomplete: Tags[] = [];
  tags: Tags[] = [];

  constructor(private fb: FormBuilder,
              private infoService: InfoHelperService,
              private lessonService: AdminLessonService,
              private customSnackbarService: CustomSnackbarService,
              public dialogRef: MatDialogRef<EditLessonComponent>,
              @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.lesson = this.data.lesson;
  }

  ngOnInit() {
    this.formData();
    this.getTags();
  }

  formData() {
    this.editLessonForm = this.fb.group({
      number: this.fb.control(this.lesson.number),
      label: this.fb.control(this.lesson.label),
      description: this.fb.control(this.lesson.description),
      tags: this.fb.array([]),
      // video_path: ''
    });

    this.tags = this.lesson.tags;
  }

  fileChange(video) {
    if (video.target.files.length > 0) {
      const file = video.target.files[0];

      this.editLessonForm.get('video_path').setValue(file);
    }
  }

  getTags() {
    this.infoService.getTags().subscribe((tags: Tags[]) => this.tagsForAutocomplete = tags);
  }

  newTag(tag) {
    const text = tag.target.value;

    if (text.length) {
      this.tags.push(text);
    }
    tag.target.value = '';
  }

  delTag(tag) {
    const index = this.tags.findIndex(delTag => delTag === tag);

    this.tags.splice(index, 1);
  }

  editLesson() {
    this.editLessonForm.value.tags = this.tags;
    const id: string = this.lesson._id;
    const lessonData = this.editLessonForm.value;

    const strings = Object.keys(lessonData);
    strings.forEach(key => {
      if (!lessonData[key]) {
        delete lessonData[key];
      }
    });

    this.lessonService.editLesson(id, lessonData).subscribe((value: IEditLesson) => {
        this.dialogRef.close(value);
        this.customSnackbarService.open('Урок відредаговано', '');
      },
      () => this.customSnackbarService.open('Невдала спроба', ''));
  }

}
