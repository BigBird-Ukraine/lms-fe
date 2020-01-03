import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ILesson, IUserEdit, Tags} from '../../../interface';
import {InfoHelperService} from '../../../services/questions';
import {LessonsService} from '../../../services/lessons.service';
import {CustomSnackbarService} from '../../../../shared/services';
import {MatDialog} from '@angular/material';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

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
              private lessonService: LessonsService,
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
      // tags: this.fb.array(this.lesson.tags),
      // video_path: ''
    });
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
    // this.editLessonForm.value.tags = this.tags;
    const id: string = this.lesson._id;
    const lessonData: ILesson = this.editLessonForm.value;

    console.log(lessonData);
    const strings = Object.keys(lessonData);
    strings.forEach(key => {
      if (!lessonData[key]) {
        delete lessonData[key];
      }
    });
    console.log(lessonData);

    this.lessonService.editLesson(id, lessonData).subscribe((value) => {
        this.dialogRef.close(value);
        this.customSnackbarService.open('Урок відредаговано', '');
      },
      () => this.customSnackbarService.open('Невдала спроба', ''));
  }
}
