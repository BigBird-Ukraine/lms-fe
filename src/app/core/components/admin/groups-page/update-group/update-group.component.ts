import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

import {AdminCoursesService, AdminGroupsService} from "../../services";
import {CustomSnackbarService} from "../../../../../shared/services";
import {GroupModel, ICourse} from "../../interfaces";

@Component({
  selector: 'app-update-group',
  templateUrl: './update-group.component.html',
  styleUrls: ['./update-group.component.scss']
})
export class UpdateGroupComponent implements OnInit {
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
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: GroupModel,
              private dialogRef: MatDialogRef<UpdateGroupComponent>) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      label: new FormControl(this.data.label, [Validators.required]),
      city: new FormControl(this.data.city, [Validators.required]),
      course_id: new FormControl(this.data.course_id._id, [Validators.required]),
      started_at: new FormControl(this.data.started_at, [Validators.required]),
      finished_at: new FormControl(this.data.finished_at, [Validators.required])
    });

    this.coursesService.getAllCourses().subscribe(value => {
      this.courses = value.data.courses;
    }, () => {
      this.snackbarService.open('Спочатку створіть курс');
      this.router.navigate(['courses']);
    });
  }

  save() {
    this.groupsService.updateById(this.data._id, this.form.value).subscribe(() => {
      this.snackbarService.open(`Група ${this.form.value.label} збережена`);
      this.dialogRef.close(true)
    });
  }
}
