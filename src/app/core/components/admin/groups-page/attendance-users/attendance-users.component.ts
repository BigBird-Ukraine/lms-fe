import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';

import {IAttendance, IGroup, ISingleGroup, UserModel} from '../../../../interface';
import {AdminGroupsService} from '../../services';
import {AddAttendanceComponent} from '../add-attendance/add-attendance.component';
import {ConfirmLayoutComponent} from '../../../../../shared/components/confirm-layout/confirm-layout.component';

@Component({
  selector: 'app-attendance-users',
  templateUrl: './attendance-users.component.html',
  styleUrls: ['./attendance-users.component.scss']
})
export class AttendanceUsersComponent implements OnInit {

  studentList: UserModel[];
  groupInfo: IGroup;

  constructor(private groupsService: AdminGroupsService,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data) {
    this.studentList = data.students;
    this.groupInfo = data.group;
  }

  ngOnInit(): void {
  }

  addDate() {
    this.dialog.open(AddAttendanceComponent, {
      data: {
        students: this.studentList,
        groupID: this.groupInfo._id
      }
    }).afterClosed().subscribe(() => {
      this.groupsService.getOneGroup(this.groupInfo._id).subscribe((group: ISingleGroup) => {
        this.groupInfo = group.data;
      });
    });
  }

  deleteVisitLog(id: string) {
    this.dialog.open(ConfirmLayoutComponent).afterClosed().subscribe(res => {
      if (res) {
        this.groupsService.deleteVisitLog(id, this.groupInfo._id).subscribe(() => {
          this.groupInfo.attendance = this.groupInfo.attendance.filter(visitLog => visitLog._id.toString() !== id) as IAttendance[];
        });
      }
    });
  }

  changeVisitLog(visitLogId: string, studentId: string) {
    this.groupsService.changeAttendance(visitLogId, studentId, this.groupInfo._id).subscribe(res => this.groupInfo.attendance = res);
  }
}

