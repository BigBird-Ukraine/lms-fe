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
import {CreateLessonAdminComponent} from './lessons-page/create-lesson-admin/create-lesson-admin.component';
import {SingleLessonComponent} from './lessons-page/single-lesson/single-lesson.component';
import {LessonTestComponent} from './lessons-page/lesson-test/lesson-test.component';
import {LessonTestResultComponent} from './lessons-page/lesson-test-result/lesson-test-result.component';
import {LessonPageComponent} from './lessons-page/lesson-page/lesson-page.component';
import {EditLessonComponent} from './lessons-page/edit-lesson/edit-lesson.component';
import {AddQuestionToLessonComponent} from './lessons-page/add-question-to-lesson/add-question-to-lesson.component';
import {AllModulesComponent} from './module-page/all-modules/all-modules.component';
import {SingleModuleComponent} from './module-page/single-module/single-module.component';
import {SingleModuleResolverService} from './resolvers/single-module.resolver.service';
import {CitiesAdminComponent} from './cities-admin/cities-admin.component';


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
          {path: '', component: UserOutComponent},
        ]
      },
      {path: 'groups', component: GroupsPageComponent},
      {path: 'questions', component: QuestionsPageComponent},
      {path: 'courses', component: CoursesPageComponent},
      {
        path: 'modules', component: ModulePageComponent, children: [
          {path: '', component: AllModulesComponent},
          {path: 'single/:id', resolve: {singleModuleResolverService: SingleModuleResolverService}, component: SingleModuleComponent}
        ]
      },

      {
        path: 'lessons', component: LessonPageComponent, children: [
          {path: 'create', component: CreateLessonAdminComponent},
          {path: ':id/edit', component: EditLessonComponent}
        ]
      },
      {path: 'lessons/:id', component: SingleLessonComponent},
      {path: 'lessons/:id/question', component: AddQuestionToLessonComponent},
      {path: 'lessons/:id/test', component: LessonTestComponent},
      {path: 'lessons/:id/test/result', component: LessonTestResultComponent},

      {path: 'cities', component: CitiesAdminComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
