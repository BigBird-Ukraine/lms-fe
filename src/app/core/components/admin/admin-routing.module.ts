import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MainAdminComponent} from './main-admin/main-admin.component';
import {StatisticsPageComponent} from './statistics-page/statistics-page.component';
import {AuthAdminGuard} from './authAdmin.guard';
import {UsersPageComponent} from './users-page/users-page.component';
import {GroupsPageComponent} from './groups-page/groups-page.component';
import {QuestionsPageComponent} from './questions-page/questions-page.component';
import {CoursesPageComponent} from './courses-page/courses-page.component';
import {ModulePageComponent} from './module-page/module-page.component';


const routes: Routes = [
  {
    path: 'adminPanel', component: MainAdminComponent, canActivate: [AuthAdminGuard], canActivateChild: [AuthAdminGuard], children: [
      {path: 'statistics', component: StatisticsPageComponent},
      {path: 'users', component: UsersPageComponent},
      {path: 'groups', component: GroupsPageComponent},
      {path: 'questions', component: QuestionsPageComponent},
      {path: 'courses', component: CoursesPageComponent},
      {path: 'modules', component: ModulePageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
