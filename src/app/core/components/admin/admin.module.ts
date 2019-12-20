import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatAutocompleteModule, MatListModule} from '@angular/material';

import {AdminRoutingModule} from './admin-routing.module';
import {AuthAdminComponent} from './auth-admin/auth-admin.component';
import {FormModule, MaterialModule} from '../../../shared/modules';
import {MainAdminComponent} from './main-admin/main-admin.component';
import {StatisticsPageComponent} from './statistics-page/statistics-page.component';
import {UsersPageComponent} from './users-page/users-page.component';
import {GroupsPageComponent} from './groups-page/groups-page.component';
import {QuestionsPageComponent} from './questions-page/questions-page.component';
import {AdminInterceptor} from './admin.interceptor';
import {CoursesPageComponent} from './courses-page/courses-page.component';
import {ModulePageComponent} from './module-page/module-page.component';
import {UserOutComponent} from './users-page/user-out/user-out.component';
import {FilterCoursesComponent} from './courses-page/filter-courses/filter-courses.component';
import {FilterPipe} from './filter.pipe';


@NgModule({
  declarations: [
    AuthAdminComponent,
    MainAdminComponent,
    StatisticsPageComponent,
    UsersPageComponent,
    GroupsPageComponent,
    QuestionsPageComponent,
    CoursesPageComponent,
    ModulePageComponent,
    FilterCoursesComponent,
    FilterPipe,
    UserOutComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormModule,
    MatListModule,
    MatAutocompleteModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AdminInterceptor
    }
  ]
})
export class AdminModule {
}
