import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatAutocompleteModule, MatListModule} from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import {FlexModule} from '@angular/flex-layout';
import {MatPaginatorModule} from '@angular/material/paginator';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

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
import {ChangeRoleUserComponent} from './users-page/change-role-user/change-role-user.component';
import {FilterPipe} from './filter.pipe';
import {UpdateProfileComponent} from './users-page/update-profile/update-profile.component';
import {LoaderComponent} from '../../../shared/components/loader/loader.component';
import {CreateGroupComponent} from './groups-page/create-group/create-group.component';
import {GroupOutComponent} from './groups-page/group-out/group-out.component';
import {AddUsersComponent} from './groups-page/add-users/add-users.component';
import {UpdateGroupComponent} from './groups-page/update-group/update-group.component';
import {AddModulesComponent} from './courses-page/add-modules/add-modules.component';
import {CourseOutComponent} from './courses-page/course-out/course-out.component';
import {CourseCreateComponent} from './courses-page/course-create/course-create.component';
import {CourseUpdateComponent} from './courses-page/course-update/course-update.component';
import { AddQuestionComponent } from './questions-page/add-question/add-question.component';
import { AllQuestionComponent } from './questions-page/all-question/all-question.component';
import { MyQuestionComponent } from './questions-page/my-question/my-question.component';
import { CreateLessonAdminComponent } from './lessons-page/create-lesson-admin/create-lesson-admin.component';
import { LessonPageComponent } from './lessons-page/lesson-page/lesson-page.component';
import { AddQuestionToLessonComponent } from './lessons-page/add-question-to-lesson/add-question-to-lesson.component';
import { EditLessonComponent } from './lessons-page/edit-lesson/edit-lesson.component';
import { LessonTestComponent } from './lessons-page/lesson-test/lesson-test.component';
import { LessonTestResultComponent } from './lessons-page/lesson-test-result/lesson-test-result.component';
import { SingleLessonComponent } from './lessons-page/single-lesson/single-lesson.component';
import { EditQuestionComponent } from './questions-page/edit-question/edit-question.component';
import { AllModulesComponent } from './module-page/all-modules/all-modules.component';
import { SingleModuleComponent } from './module-page/single-module/single-module.component';
import {SingleModuleResolverService} from './resolvers/single-module.resolver.service';
import {CreateUserComponent} from './users-page/create-user/create-user.component';
import { AttendanceUsersComponent } from './groups-page/attendance-users/attendance-users.component';
import { AddAttendanceComponent } from './groups-page/add-attendance/add-attendance.component';
import { CitiesAdminComponent } from './cities-admin/cities-admin.component';
import { AddCityAdminComponent } from './cities-admin/add-city-admin/add-city-admin.component';
import { UsersComponent } from './statistics-page/users/users.component';
import { QuestionsComponent } from './statistics-page/questions/questions.component';
import { GroupsComponent } from './statistics-page/groups/groups.component';
import { GroupComponent } from './statistics-page/group/group.component';
import { QuestionComponent } from './statistics-page/question/question.component';
import { UserComponent } from './statistics-page/user/user.component';
import { ModulesComponent } from './statistics-page/modules/modules.component';
import { ModuleComponent } from './statistics-page/module/module.component';
import { LessonsComponent } from './statistics-page/lessons/lessons.component';
import { LessonComponent } from './statistics-page/lesson/lesson.component';
import { EditModuleComponent } from './module-page/edit-module/edit-module.component';
import { AddLessonComponent } from './module-page/add-lesson/add-lesson.component';

@NgModule({
  entryComponents: [
    AddUsersComponent,
    CreateGroupComponent,
    UpdateGroupComponent,
    CourseCreateComponent,
    AddModulesComponent,
    CourseUpdateComponent,
    AttendanceUsersComponent,
    AddAttendanceComponent,
    AddCityAdminComponent,
    EditQuestionComponent,
    GroupComponent,
    QuestionComponent,
    UserComponent,
    ModuleComponent,
    LessonComponent,
    AddLessonComponent
    LessonComponent,
    EditModuleComponent
  ],
  declarations: [
    AuthAdminComponent,
    MainAdminComponent,
    StatisticsPageComponent,
    UsersPageComponent,
    GroupsPageComponent,
    QuestionsPageComponent,
    CoursesPageComponent,
    ModulePageComponent,
    FilterPipe,
    UserOutComponent,
    ChangeRoleUserComponent,
    UpdateProfileComponent,
    LoaderComponent,
    CreateGroupComponent,
    GroupOutComponent,
    AddUsersComponent,
    UpdateGroupComponent,
    AddModulesComponent,
    CourseOutComponent,
    CourseCreateComponent,
    CourseUpdateComponent,
    AddQuestionComponent,
    AllQuestionComponent,
    MyQuestionComponent,
    CreateLessonAdminComponent,
    LessonPageComponent,
    AddQuestionToLessonComponent,
    EditLessonComponent,
    LessonTestComponent,
    LessonTestResultComponent,
    SingleLessonComponent,
    AllModulesComponent,
    SingleModuleComponent,
    EditQuestionComponent,
    CreateUserComponent,
    CitiesAdminComponent,
    AddCityAdminComponent,
    AttendanceUsersComponent,
    AddAttendanceComponent,
    UsersComponent,
    QuestionsComponent,
    GroupsComponent,
    GroupComponent,
    QuestionComponent,
    UserComponent,
    ModulesComponent,
    ModuleComponent,
    LessonsComponent,
    LessonComponent,
    AddLessonComponent,
    EditModuleComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormModule,
    MatListModule,
    MatAutocompleteModule,
    MatMenuModule,
    FlexModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    DragDropModule,
    ScrollingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AdminInterceptor
    },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
    SingleModuleResolverService
  ]
})
export class AdminModule {
}
