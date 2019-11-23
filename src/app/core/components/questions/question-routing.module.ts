import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AddQuestionFormComponent} from './add-question-form/add-question-form.component';
import {InfoHelperComponent} from './info-helper/info-helper.component';
import {FilterForQuestionsComponent} from './filter-for-questions/filter-for-questions.component';
import {QuestionsLayoutComponent} from './questions-layout/questions-layout.component';

const routes: Routes = [
  {path: 'questions', component: FilterForQuestionsComponent},
  {path: 'add_questions', component: AddQuestionFormComponent},
  {path: 'info', component: InfoHelperComponent},
  {path: 'test', component: QuestionsLayoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule {
}