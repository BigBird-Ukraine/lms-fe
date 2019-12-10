import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AuthAdminComponent} from './auth-admin/auth-admin.component';
import {FormModule, MaterialModule} from '../../../shared/modules';
import {MainAdminComponent} from './main-admin/main-admin.component';
import {StatisticsPageComponent} from './statistics-page/statistics-page.component';
import {UsersPageComponent} from './users-page/users-page.component';
import {GroupsPageComponent} from './groups-page/groups-page.component';
import {QuestionsPageComponent} from './questions-page/questions-page.component';
import { CoursesPageComponent } from './courses-page/courses-page.component';


@NgModule({
  declarations: [
    AuthAdminComponent,
    MainAdminComponent,
    StatisticsPageComponent,
    UsersPageComponent,
    GroupsPageComponent,
    QuestionsPageComponent,
    CoursesPageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormModule
  ]
})
export class AdminModule {
}
