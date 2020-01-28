import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {UserModel} from '../../../interface';

@Component({
  selector: 'app-group-presents',
  templateUrl: './group-presents.component.html',
  styleUrls: ['./group-presents.component.scss']
})
export class GroupPresentsComponent implements OnInit {

  presentForm: FormGroup;
  students: UserModel[];

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<GroupPresentsComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
    this.students = data.students;
  }

  ngOnInit() {
    this.presentForm = this.fb.group({
      date: this.fb.control(null),
      studentsArr: this.fb.array([])
    });

    this.getData();
  }

  getData() {
    this.students.forEach(student => {
      const studentPresence = (this.presentForm.get('studentsArr')) as FormArray;
      const control = this.fb.group({
        id: this.fb.control(student._id),
        checked: this.fb.control(false)
      });
      studentPresence.push(control);
    });
  }


  addDate() {
    console.log(this.presentForm.value);
  }
}
