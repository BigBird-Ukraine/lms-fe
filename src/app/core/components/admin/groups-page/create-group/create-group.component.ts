import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';

import {ICourse} from '../../interfaces';
import {AdminCoursesService, AdminGroupsService} from '../../services';
import {CustomSnackbarService} from '../../../../../shared/services';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {
  form: FormGroup;
  cities = [
    {name: 'Львів'},
    {name: 'Київ'}
  ];
  courses: ICourse[];

  constructor(private groupsService: AdminGroupsService,
              private coursesService: AdminCoursesService,
              private dialog: MatDialog,
              private snackbarService: CustomSnackbarService,
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      label: new FormControl(null, [Validators.required, Validators.min(4)]),
      city: new FormControl(null, [Validators.required]),
      course_id: new FormControl(null),
      started_at: new FormControl(new Date(), [Validators.required]),
      finished_at: new FormControl(new Date(new Date().setFullYear(new Date().getFullYear() + 1)), [Validators.required])
    });

    this.coursesService.getAllCourses().subscribe(value => {
      this.courses = value.data.courses;
    });
  }

  save() {
    const keys = Object.keys(this.form.value);
    keys.forEach(value => {
      if (!this.form.value[value]) {
        delete this.form.value[value];
      }
    });
    this.groupsService.save(this.form.value).subscribe(() => {
      this.snackbarService.open(`Група ${this.form.value.label} створена`);
      this.dialog.closeAll();
    });
  }
}
