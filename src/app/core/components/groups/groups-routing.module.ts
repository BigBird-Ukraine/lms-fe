import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuardService} from '../../../shared/services';
import {AllGroupsComponent} from './all-groups/all-groups.component';
import {SingleGroupComponent} from './single-group/single-group.component';
import {GroupPresentsComponent} from './group-presents/group-presents.component';
import {MyGroupResolverService, MyGroupsResolverService} from '../../resolvers';
import {MyGroupsComponent} from './my-groups/my-groups.component';
import {AttendanceComponent} from './group-attendance/attendance.component';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuardService], component: AllGroupsComponent, children: [
      {path: ':id', component: SingleGroupComponent},
      {path: 'presents', component: GroupPresentsComponent}
    ]
  },
  {
    path: 'my', canActivate: [AuthGuardService], resolve: {myGroupsResolverService: MyGroupsResolverService},
    component: MyGroupsComponent, children: [
      {
        path: ':id', canActivate: [AuthGuardService], resolve: {myGroupResolverService: MyGroupResolverService},
        component: AttendanceComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
