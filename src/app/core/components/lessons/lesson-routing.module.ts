import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService, RoleGuardService} from '../../../shared/services';
import {LessonPageComponent} from './lesson-page/lesson-page.component';
import {CreateLessonComponent} from './create-lesson/create-lesson.component';
import {EditLessonComponent} from './edit-lesson/edit-lesson.component';
import {SingleLessonComponent} from './single-lesson/single-lesson.component';
import {AddQuestionToLessonComponent} from './add-question-to-lesson/add-question-to-lesson.component';
import {LessonTestComponent} from './lesson-test/lesson-test.component';
import {LessonTestResultComponent} from './lesson-test-result/lesson-test-result.component';

const routes: Routes = [
  {path: '', canActivate: [AuthGuardService, RoleGuardService], component: LessonPageComponent, children: [
      {path: 'create', component: CreateLessonComponent},
      {path: ':id/edit', component: EditLessonComponent}
    ]},
  {path: ':id', component: SingleLessonComponent},
  {path: ':id/question', component: AddQuestionToLessonComponent},
  {path: ':id/test', component: LessonTestComponent},
  {path: ':id/test/result', component: LessonTestResultComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonRoutingModule { }
