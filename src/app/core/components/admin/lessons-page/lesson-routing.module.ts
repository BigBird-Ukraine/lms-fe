import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CreateLessonAdminComponent} from './create-lesson-admin/create-lesson-admin.component';
import {LessonPageComponent} from './lesson-page/lesson-page.component';
import {EditLessonComponent} from './edit-lesson/edit-lesson.component';
import {SingleLessonComponent} from './single-lesson/single-lesson.component';
import {AddQuestionToLessonComponent} from './add-question-to-lesson/add-question-to-lesson.component';
import {LessonTestComponent} from './lesson-test/lesson-test.component';
import {LessonsTestResultComponent} from './lessons-test-result/lessons-test-result.component';


const routes: Routes = [
  {
    path: '', component: LessonPageComponent, children: [
      {path: 'create', component: CreateLessonAdminComponent},
      {path: ':id/edit', component: EditLessonComponent}
    ]
  },
  {path: ':id', component: SingleLessonComponent},
  {path: ':id/question', component: AddQuestionToLessonComponent},
  {path: ':id/test', component: LessonTestComponent},
  {path: ':id/test/result', component: LessonsTestResultComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonRoutingModule { }
