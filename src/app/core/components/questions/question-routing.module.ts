import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AddQuestionFormComponent} from './add-question-form/add-question-form.component';
import {InfoHelperComponent} from './info-helper/info-helper.component';

const routes: Routes = [
    {path: 'questions', component: AddQuestionFormComponent},
    {path: 'info', component: InfoHelperComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule {
}
