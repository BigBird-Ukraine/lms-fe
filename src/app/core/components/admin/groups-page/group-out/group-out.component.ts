import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {switchMap, take} from 'rxjs/operators';

import {GroupModel, IGroupData, IUser} from '../../interfaces';
import {AddUsersComponent} from '../add-users/add-users.component';
import {AdminGroupsService} from '../../services';
import {DeleteComponent} from '../../../../../shared/components/delete/delete.component';
import {CustomSnackbarService} from '../../../../../shared/services';
import {UpdateGroupComponent} from '../update-group/update-group.component';
import {AttendanceUsersComponent} from '../attendance-users/attendance-users.component';

@Component({
  selector: 'app-group-out',
  templateUrl: './group-out.component.html',
  styleUrls: ['./group-out.component.scss']
})
export class GroupOutComponent implements OnInit {
  @Input() groupsData: IGroupData;
  IUserList: IUser[] = [];

  constructor(private dialog: MatDialog,
              private adminGroupsService: AdminGroupsService,
              private customSnackbarService: CustomSnackbarService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  updateProfile(group: GroupModel) {
    this.dialog.open(UpdateGroupComponent, {
      data: group
    }).afterClosed().subscribe((value) => {
      if (value) {
        this.route.queryParams.pipe(
          switchMap(value1 => {
            return this.adminGroupsService.getAll(value1);
          }),
          take(1),
        ).subscribe(value2 => {
          this.groupsData = value2.data;
        });
      }
    });
  }

  delete(group: GroupModel) {
    this.dialog.open(DeleteComponent, {
      data: group.label,
      disableClose: true
    }).afterClosed().subscribe(value => {
      if (value) {
        const index: number = this.groupsData.groups.indexOf(group);
        this.adminGroupsService.delete(group._id).subscribe(() => {
          this.customSnackbarService.open('Група видалена');
          this.groupsData.groups.splice(index, 1);
        });
      }
    });
  }

  addAndDeleteUsers(group: GroupModel) {
    this.IUserList = group.users_list;
    this.dialog.open(AddUsersComponent, {
      data: this.IUserList,
      disableClose: true
    }).afterClosed().subscribe((usersList: IUser[]) => {

      if (usersList) {
        const result: IUser[] = [];
        usersList.forEach(user => result.push(user));
        group.users_list = result;
        this.adminGroupsService.updateUsersList(group._id, {users_list: group.users_list.map(value => value._id)}).subscribe();
        group.updated_at = new Date().toDateString();
      }
    });
  }

  showAttendace(group: GroupModel) {
     this.dialog.open(AttendanceUsersComponent, {
       data: {
         students: group.users_list,
         group
       }
     });
  }
}
