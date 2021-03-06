import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {Tags, ILesson} from '../../../interface';
import {InfoHelperService, LessonsService} from '../../../services';
import {CustomSnackbarService} from '../../../../shared/services';


@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.scss']
})
export class CreateLessonComponent implements OnInit {
  lessonForm: FormGroup;
  tagsForAutocomplete: Tags[] = [];
  tags: Tags[] = [];

  spinnerStatus = false;

  constructor(private fb: FormBuilder,
              private infoService: InfoHelperService,
              private lessonService: LessonsService,
              private customSnackbarService: CustomSnackbarService,
              private dialogRef: MatDialogRef<CreateLessonComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.formData();
    this.getTags();
  }

  formData() {
    this.lessonForm = this.fb.group({
      number: this.fb.control(this.data + 1),
      label: this.fb.control(null, [Validators.required]),
      description: this.fb.control(null),
      tags: this.fb.array([]),
      video_path: ''
    });
  }

  fileChange(video) {
    if (video.target.files.length > 0) {
      const file = video.target.files[0];

      this.lessonForm.get('video_path').setValue(file);
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

  addLesson() {
    this.lessonForm.value.tags = this.tags;

    const lessonData: ILesson = this.lessonForm.value;

    this.spinnerStatus = true;
    this.lessonService.createLesson(lessonData).subscribe(() => {
      this.spinnerStatus = false;
      this.customSnackbarService.open('Урок додано', '');
      this.dialogRef.close(true);
    });
  }
}

