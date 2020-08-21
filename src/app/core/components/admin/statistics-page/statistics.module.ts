import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StatisticsRoutingModule} from './statistics-routing.module';
import {StatisticsPageComponent} from './statistics-page/statistics-page.component';
import {UsersComponent} from './users/users.component';
import {QuestionsComponent} from './questions/questions.component';
import {GroupsComponent} from './groups/groups.component';
import {GroupComponent} from './group/group.component';
import {QuestionComponent} from './question/question.component';
import {UserComponent} from './user/user.component';
import {ModulesComponent} from './modules/modules.component';
import {ModuleComponent} from './module/module.component';
import {LessonsComponent} from './lessons/lessons.component';
import {LessonComponent} from './lesson/lesson.component';
import {AdminModule} from '../admin.module';


@NgModule({
  entryComponents: [
    GroupComponent,
    LessonComponent,
    ModuleComponent,
    QuestionComponent,
    UserComponent
  ],
  declarations: [
    StatisticsPageComponent,
    UserComponent,
    UsersComponent,
    QuestionsComponent,
    GroupsComponent,
    GroupComponent,
    QuestionComponent,
    ModulesComponent,
    ModuleComponent,
    LessonsComponent,
    LessonComponent
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,

    AdminModule
  ]
})
export class StatisticsModule {
}
