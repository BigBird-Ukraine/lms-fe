import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {AdminCoursesService} from '../../services';
import {CustomSnackbarService} from '../../../../../shared/services';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.scss']
})
export class CourseCreateComponent implements OnInit {
  form: FormGroup;

  constructor(private adminCoursesService: AdminCoursesService,
              private coursesService: AdminCoursesService,
              private dialogRef: MatDialogRef<CourseCreateComponent>,
              private snackbarService: CustomSnackbarService,
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      label: new FormControl(null, [Validators.required, Validators.min(4)]),
      description: new FormControl('', [Validators.required])
    });
  }

  save() {
    this.adminCoursesService.save(this.form.value).subscribe(() => {
      this.snackbarService.open(`Курс ${this.form.value.label} створений`);
      this.dialogRef.close(true);
    });
  }
}
