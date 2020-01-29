import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {IGroup, IGroupStudents, ISingleGroup, UserModel} from '../../../interface';
import {GroupsService} from '../../../services/groups';
import {GroupPresentsComponent} from '../group-presents/group-presents.component';

@Component({
  selector: 'app-single-group',
  templateUrl: './single-group.component.html',
  styleUrls: ['./single-group.component.scss']
})
export class SingleGroupComponent implements OnInit {

  studentList: UserModel[];
  @Input() groupInfo: IGroup;

  constructor(private groupsService: GroupsService,
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
}
