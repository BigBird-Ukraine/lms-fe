import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {GroupsRoutingModule} from './groups-routing.module';
import {GroupsPageComponent} from './groups-page/groups-page.component';
import {AdminModule} from '../admin.module';
import {UpdateGroupComponent} from './update-group/update-group.component';
import {CreateGroupComponent} from './create-group/create-group.component';
import {GroupOutComponent} from './group-out/group-out.component';
import {AttendanceUsersComponent} from './attendance-users/attendance-users.component';
import {AddAttendanceComponent} from './add-attendance/add-attendance.component';
import {AddUsersComponent} from './add-users/add-users.component';
import {AdminMyPassedTestComponent} from '../passed-tests/admin-my-passed-test/admin-my-passed-test.component';
import {AdminPassedQuestionComponent} from '../passed-tests/admin-passed-question/admin-passed-question.component';



@NgModule({
  entryComponents: [
    CreateGroupComponent,
    UpdateGroupComponent,
    AttendanceUsersComponent,
    AddAttendanceComponent,
    AddUsersComponent
  ],
  declarations: [
    GroupsPageComponent,
    UpdateGroupComponent,
    CreateGroupComponent,
    GroupOutComponent,
    AttendanceUsersComponent,
    AddAttendanceComponent,
    AddUsersComponent
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,

    AdminModule
  ]
})
export class GroupsModule { }
