import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';

import {ICourse} from '../../../../core/components/admin/interfaces';
import {AdminCoursesService, AdminGroupsService} from '../../../../core/components/admin/services';
import {CustomSnackbarService} from '../../../services';

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
              private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      label: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      course_id: new FormControl(null, [Validators.required]),
      started_at: new FormControl(new Date(), [Validators.required]),
      finished_at: new FormControl(new Date(new Date().setFullYear(new Date().getFullYear() + 1)), [Validators.required])
    });

    this.coursesService.getAllCourses().subscribe(value => {
      this.courses = value.data.courses;
    }, () => {
      this.snackbarService.open('Спочатку створіть курс');
      this.router.navigate(['courses']);
    });
  }

  save() {
    this.groupsService.save(this.form.value).subscribe(() => {
      this.snackbarService.open(`Група ${this.form.value.label} створена`);
      this.dialog.closeAll();
    });
  }
}
