import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IGroup, IGroupStudents, UserModel} from '../../../interface';
import {GroupsService} from '../../../services/groups';

@Component({
  selector: 'app-my-single-group',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  group: IGroup;
  studentList: UserModel[];

  constructor(private route: ActivatedRoute, private groupsService: GroupsService) {
  }

  ngOnInit() {
    this.route.data
      .subscribe(
        res => {
          this.group = res.myGroupResolverService.data;
        });

    this.groupsService.getGroupsStudents(this.group._id).subscribe((students: IGroupStudents) => {
        this.studentList = students.data.users_list;
      }
    );
  }

}
