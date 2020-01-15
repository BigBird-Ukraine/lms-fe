import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LessonPageComponent} from './lesson-page/lesson-page.component';
import {CreateLessonComponent} from './create-lesson/create-lesson.component';
import {EditLessonComponent} from './edit-lesson/edit-lesson.component';
import {SingleLessonComponent} from './single-lesson/single-lesson.component';

const routes: Routes = [
  {path: 'lessons', component: LessonPageComponent, children: [
      {path: 'create', component: CreateLessonComponent},
      {path: ':id/edit', component: EditLessonComponent}
    ]},
  {path: 'lessons/:id', component: SingleLessonComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonsRoutingModule {
}
