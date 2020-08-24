import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {QuestionsPageComponent} from './questions-page/questions-page.component';

const routes: Routes = [
  {path: '', component: QuestionsPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
