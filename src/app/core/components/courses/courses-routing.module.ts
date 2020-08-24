import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuardService} from '../../../shared/services';
import {MyCoursesComponent} from './my-courses/my-courses.component';

const routes: Routes = [
  {path: '', canActivate: [AuthGuardService], component: MyCoursesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
