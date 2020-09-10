import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {CoursesRoutingModule} from './courses-routing.module';
import {MyCoursesComponent} from './my-courses/my-courses.component';
import {SharedModule} from '../../../shared/modules';



@NgModule({
  declarations: [MyCoursesComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule
  ]
})
export class CoursesModule { }
