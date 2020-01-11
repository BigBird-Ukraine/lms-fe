import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {take} from "rxjs/operators";

import {GroupModel, IGroupData, IUser} from "../../interfaces";
import {AddUsersComponent} from "../add-users/add-users.component";
import {AdminCoursesService, AdminGroupsService, AdminUsersService} from "../../services";
import {DeleteComponent} from "../../../../../shared/components/delete/delete.component";
import {CustomSnackbarService} from "../../../../../shared/services";
import {Subject} from "rxjs";
import {async} from "rxjs/internal/scheduler/async";

@Component({
  selector: 'app-group-out',
  templateUrl: './group-out.component.html',
  styleUrls: ['./group-out.component.scss']
})
export class GroupOutComponent implements OnInit {
  @Input() groupsData: IGroupData;
  IUserList: IUser[] = [];
  subject = new Subject<any>();

  constructor(private dialog: MatDialog,
              private adminUsersService: AdminUsersService,
              private adminGroupsService: AdminGroupsService,
              private adminCoursesService: AdminCoursesService,
              private customSnackbarService: CustomSnackbarService) {

  }

  ngOnInit() {
    this.subject.pipe( //TODO Victor
      take(4)
    )
      .subscribe((value) => {
        this.getCourseLabel(value)
      })
  }

  updateProfile(group: GroupModel) {

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
    })
  }

  addAndDeleteUsers(group: GroupModel) {
    this.IUserList = [];
    group.users_list.forEach(value => {
      this.adminUsersService.getByID(value).subscribe(value1 => {
        this.IUserList.push(value1.data);
      });
    });
    this.dialog.open(AddUsersComponent, {
      data: this.IUserList,
      disableClose: true
    }).afterClosed().subscribe((value: IUser[]) => {

      if (value) {
        const result: string[] = [];
        value.forEach(value1 => result.push(value1._id));
        group.users_list = result;
        // this.adminGroupsService.update(group).subscribe();
        group.updated_at = new Date().toDateString()
      }
    });
  }

  getCourseLabel(course_id: string) {
    let label: string = '';
    this.adminCoursesService.getById(course_id).pipe(take(1))
      .subscribe(value => {
        label = value.data.lebel;
        console.log(value.data.label);
      });
  }
}
