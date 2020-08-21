import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {LessonRoutingModule} from './lesson-routing.module';
import {CreateLessonAdminComponent} from './create-lesson-admin/create-lesson-admin.component';
import {LessonPageComponent} from './lesson-page/lesson-page.component';
import {EditLessonComponent} from './edit-lesson/edit-lesson.component';
import {LessonTestComponent} from './lesson-test/lesson-test.component';
import {SingleLessonComponent} from './single-lesson/single-lesson.component';
import {AdminModule} from '../admin.module';
import {QuestionsModule} from '../questions-page/questions.module';
import {LessonsTestResultComponent} from './lessons-test-result/lessons-test-result.component';



@NgModule({
  entryComponents: [
    LessonsTestResultComponent,
  ],
  declarations: [
    CreateLessonAdminComponent,
    LessonPageComponent,
    EditLessonComponent,
    LessonTestComponent,
    LessonsTestResultComponent,
    SingleLessonComponent,
    LessonsTestResultComponent
  ],
  imports: [
    CommonModule,
    LessonRoutingModule,

    AdminModule,
    QuestionsModule
  ]
})
export class LessonModule { }
