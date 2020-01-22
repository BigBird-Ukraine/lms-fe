import {Component, Input, OnInit} from '@angular/core';

import {IGroup, IGroupStudents, ISingleGroup, UserModel} from '../../../interface';
import {GroupsService} from '../../../services/groups';
import {config} from '../../../../shared/config';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-single-group',
  templateUrl: './single-group.component.html',
  styleUrls: ['./single-group.component.scss']
})
export class SingleGroupComponent implements OnInit {

  studentList: UserModel[];
  @Input() groupInfo: IGroup;
  path = config.authUrl;

  constructor(private groupsService: GroupsService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.groupsService.getGroupsStudents(this.groupInfo._id).subscribe((students: IGroupStudents) => {
        this.studentList = students.data.users_list;
      }
    );
    this.groupsService.getOneGroup(this.groupInfo._id).subscribe((group: any) => {
      console.log(group);
      this.groupInfo = group.data;
    });
  }

}
