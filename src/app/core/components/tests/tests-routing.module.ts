import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuardService} from '../../../shared/services';
import {QuestionsLayoutComponent} from './questions-layout/questions-layout.component';
import {MyPassedTestComponent} from './my-passed-test/my-passed-test.component';

const routes: Routes = [
  {path: '', canActivate: [AuthGuardService], component: QuestionsLayoutComponent},
  {path: 'my', canActivate: [AuthGuardService], component: MyPassedTestComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestsRoutingModule { }
