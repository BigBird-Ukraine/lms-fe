import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {HomePageComponent} from './core/components/home-page/home-page.component';
import {AdminLayoutComponent} from './shared/components/admin-layout/admin-layout.component';
import {AuthAdminComponent} from './core/components/admin/auth-admin/auth-admin.component';
import {UserCabinetComponent} from './core/components/user/user-cabinet/user-cabinet.component';
import {EditUserComponent} from './core/components/user/edit-user/edit-user.component';
import {LessonPageComponent} from './core/components/lessons/lesson-page/lesson-page.component';
import {CreateLessonComponent} from './core/components/lessons/create-lesson/create-lesson.component';
import {EditLessonComponent} from './core/components/lessons/edit-lesson/edit-lesson.component';
import {SingleLessonComponent} from './core/components/lessons/single-lesson/single-lesson.component';
import {AddQuestionToLessonComponent} from './core/components/lessons/add-question-to-lesson/add-question-to-lesson.component';
import {FilterForQuestionsComponent} from './core/components/questions/filter-for-questions/filter-for-questions.component';
import {AddQuestionFormComponent} from './core/components/questions/add-question-form/add-question-form.component';
import {InfoHelperComponent} from './core/components/questions/info-helper/info-helper.component';
import {QuestionsLayoutComponent} from './core/components/questions/questions-layout/questions-layout.component';
import {MyQuestionsComponent} from './core/components/questions/my-questions/my-questions.component';
import {RegistrationComponent} from './core/components/user/registration/registration.component';
import {AuthUserComponent} from './core/components/user/auth-user/auth-user.component';
import {AuthGuardService} from './shared/services';
import {LessonTestComponent} from './core/components/lessons/lesson-test/lesson-test.component';
import {LessonTestResultComponent} from './core/components/lessons/lesson-test-result/lesson-test-result.component';
import {AllGroupsComponent} from './core/components/groups/all-groups/all-groups.component';
import {SingleGroupComponent} from './core/components/groups/single-group/single-group.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: HomePageComponent},
      {path: 'lessons', canActivate: [AuthGuardService], component: LessonPageComponent, children: [
          {path: 'create', component: CreateLessonComponent},
          {path: ':id/edit', component: EditLessonComponent}
        ]},
      {path: 'lessons/:id', component: SingleLessonComponent},
      {path: 'lessons/:id/question', component: AddQuestionToLessonComponent},
      {path: 'lessons/:id/test', component: LessonTestComponent},
      {path: 'lessons/:id/test/result', component: LessonTestResultComponent},
      {path: 'questions', canActivate: [AuthGuardService], component: FilterForQuestionsComponent},
      {path: 'add_questions', canActivate: [AuthGuardService], component: AddQuestionFormComponent},
      {path: 'info', component: InfoHelperComponent},
      {path: 'test', canActivate: [AuthGuardService], component: QuestionsLayoutComponent},
      {path: 'questions/my', canActivate: [AuthGuardService], component: MyQuestionsComponent},
      {path: 'registration', component: RegistrationComponent},
      {path: 'auth', component: AuthUserComponent},
      {path: 'user/:id', component: UserCabinetComponent},
      {path: 'user/:id/edit', component: EditUserComponent},
      {path: 'groups', canActivate: [AuthGuardService], component: AllGroupsComponent, children: [
          {path: ':id', component: SingleGroupComponent}
        ]}
    ]
  },
  {
    path: 'admin', component: AdminLayoutComponent, children: [
      {path: '', redirectTo: '/admin/login',  pathMatch: 'full'},
      {path: 'login' , component: AuthAdminComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
