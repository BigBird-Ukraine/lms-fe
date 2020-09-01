import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatDatepickerModule, MatDialogModule,
  MatExpansionModule, MatFormFieldModule, MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatTableModule
} from '@angular/material';

import {AllGroupsComponent} from './all-groups/all-groups.component';
import { SingleGroupComponent } from './single-group/single-group.component';
import { GroupPresentsComponent } from './group-presents/group-presents.component';
import { MyGroupsComponent } from './my-groups/my-groups.component';
import { AttendanceComponent } from './group-attendance/attendance.component';
import {GroupsRoutingModule} from './groups-routing.module';
import {SharedModule} from '../../../shared/modules';
import {TestsModule} from '../tests/tests.module';

@NgModule({
  declarations: [
    AttendanceComponent,
    MyGroupsComponent,
    GroupPresentsComponent,
    SingleGroupComponent,
    AllGroupsComponent
  ],
  imports: [
    GroupsRoutingModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    TestsModule,

    MatSidenavModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule
  ],
  exports: []
})

export class GroupsModule {

}
