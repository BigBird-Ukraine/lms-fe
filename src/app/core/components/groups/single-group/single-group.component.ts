import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {IAttendance, IGroup, IGroupStudents, ISingleGroup, UserModel} from '../../../interface';
import {GroupsService} from '../../../services/groups';
import {GroupPresentsComponent} from '../group-presents/group-presents.component';
import {UserRolesEnum} from '../../../../shared/enums';
import {UserService} from '../../../services/user';
import {MyPassedTestComponent} from '../../tests/my-passed-test/my-passed-test.component';
import {ConfirmLayoutComponent} from '../../../../shared/components/confirm-layout/confirm-layout.component';

@Component({
  selector: 'app-single-group',
  templateUrl: './single-group.component.html',
  styleUrls: ['./single-group.component.scss']
})
export class SingleGroupComponent implements OnInit {

  studentList: UserModel[];
  @Input() groupInfo: IGroup;
  isTeacher = false;

  constructor(private groupsService: GroupsService,
              private userService: UserService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.groupsService.getGroupsStudents(this.groupInfo._id).subscribe((students: IGroupStudents) => {
        this.studentList = students.data.users_list;
      }
    );
    this.groupsService.getOneGroup(this.groupInfo._id).subscribe((group: ISingleGroup) => {
      this.groupInfo = group.data;
    });

    this.userService.userInfo.subscribe(user => {
      this.isTeacher = (user.role_id === UserRolesEnum.TEACHER && true);
    });
  }

  addDate() {
    this.dialog.open(GroupPresentsComponent, {
      data: {
        students: this.studentList,
        groupID: this.groupInfo._id
      }
    }).afterClosed().subscribe(() => {
        this.groupsService.getOneGroup(this.groupInfo._id).subscribe((group: ISingleGroup) => {
          this.groupInfo = group.data;
        });
      }
    );
  }

  showActivityStudent(id: string) {
    this.dialog.open(MyPassedTestComponent, {
      data: id,
      height: '100%'
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
