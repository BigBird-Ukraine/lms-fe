import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatCardModule, MatExpansionModule, MatListModule, MatSidenavModule, MatTableModule} from '@angular/material';

import {AllGroupsComponent} from './all-groups/all-groups.component';
import { SingleGroupComponent } from './single-group/single-group.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AllGroupsComponent,
    SingleGroupComponent,
  ],
  imports: [
    MatSidenavModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    RouterModule,
    MatListModule,
    MatTableModule
  ],
  exports: []
})

export class GroupsModule {

}
