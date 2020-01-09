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
import {UserOutComponent} from './users-page/user-out/user-out.component';


const routes: Routes = [
  {
    path: 'adminPanel',
    component: MainAdminComponent,
    canActivate: [AuthAdminGuard],
    canActivateChild: [AuthAdminGuard],
    children: [
      {path: 'statistics', component: StatisticsPageComponent},
      {
        path: 'users', component: UsersPageComponent, children: [
          // {path: '', redirectTo: 'all', pathMatch: 'full'},
          // {path: 'admins', component: UserOutComponent},
          // {path: 'teachers', component: UserOutComponent},
          // {path: 'students', component: UserOutComponent},
          {path: '', component: UserOutComponent},

        ]
      },
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
