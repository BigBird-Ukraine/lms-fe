import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuardService} from '../../../shared/services';
import {FilterForQuestionsComponent} from './filter-for-questions/filter-for-questions.component';
import {AddQuestionFormComponent} from './add-question-form/add-question-form.component';
import {MyQuestionsComponent} from './my-questions/my-questions.component';


const routes: Routes = [
  {path: '', canActivate: [AuthGuardService], component: FilterForQuestionsComponent},
  {path: 'add_questions', canActivate: [AuthGuardService], component: AddQuestionFormComponent},
  {path: 'my', canActivate: [AuthGuardService], component: MyQuestionsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule {
}
