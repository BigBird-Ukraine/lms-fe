import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {UserModel} from '../../../../interface';
import {AdminGroupsService} from '../../services';

@Component({
  selector: 'app-add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrls: ['./add-attendance.component.scss']
})
export class AddAttendanceComponent implements OnInit {

  presentForm: FormGroup;
  students: UserModel[];
  groupID: string;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<AddAttendanceComponent>,
              private groupService: AdminGroupsService,
              @Inject(MAT_DIALOG_DATA) public data) {
    this.students = data.students;
    this.groupID = data.groupID;
  }

  ngOnInit() {
    this.presentForm = this.fb.group({
      date: this.fb.control(new Date()),
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
    const studentPresence = (this.presentForm.get('studentsArr')) as FormArray;
    const Date = this.presentForm.value.date;
    const newDate = ('0' + (Date.getDate())).slice(-2) + '/' + ('0' + (Date.getMonth() + 1)).slice(-2) + '/' + (Date.getFullYear());

    const listOfPresence = {
      date: newDate,
      present_students_id: [],
      absent_students_id: []
    };

    studentPresence.controls.forEach(student => {
      if (student.value.checked === true) {
        listOfPresence.present_students_id.push(student.value.id);
      } else {
        listOfPresence.absent_students_id.push(student.value.id);
      }
    });

    this.sendData(listOfPresence);
  }

  sendData(data) {
    this.groupService.sendPresence(this.groupID, data).subscribe(() => {
      this.dialogRef.close();
    });
  }

}
