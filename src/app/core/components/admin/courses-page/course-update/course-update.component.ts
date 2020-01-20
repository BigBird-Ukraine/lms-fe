import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

import {AdminCoursesService} from '../../services';
import {CustomSnackbarService} from '../../../../../shared/services';
import {ICourse} from '../../interfaces';

@Component({
  selector: 'app-course-update',
  templateUrl: './course-update.component.html',
  styleUrls: ['./course-update.component.scss']
})
export class CourseUpdateComponent implements OnInit {
  form: FormGroup;

  constructor(private adminCoursesService: AdminCoursesService,
              private coursesService: AdminCoursesService,
              private dialog: MatDialog,
              private snackbarService: CustomSnackbarService,
              private dialogRef: MatDialogRef<CourseUpdateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ICourse
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      label: new FormControl(this.data.label, [Validators.required, Validators.min(4)]),
      description: new FormControl(this.data.description, [Validators.required])
    });
  }

  save() {
    this.adminCoursesService.updateById(this.data._id, this.form.value).subscribe(() => {
      this.snackbarService.open(`Курс ${this.form.value.label} оновлено`);
      this.dialogRef.close(true);
    });
  }
}
