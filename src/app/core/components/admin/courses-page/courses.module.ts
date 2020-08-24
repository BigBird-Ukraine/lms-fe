import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {CoursesRoutingModule} from './courses-routing.module';
import {AdminModule} from '../admin.module';
import {CoursesPageComponent} from './courses-page/courses-page.component';
import {CourseOutComponent} from './course-out/course-out.component';
import {CourseCreateComponent} from './course-create/course-create.component';
import {CourseUpdateComponent} from './course-update/course-update.component';
import {AddModulesComponent} from './add-modules/add-modules.component';



@NgModule({
  entryComponents: [
    CourseUpdateComponent,
    CourseCreateComponent,
    AddModulesComponent
  ],
  declarations: [
    CoursesPageComponent,
    CourseOutComponent,
    CourseCreateComponent,
    CourseUpdateComponent,
    AddModulesComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,

    AdminModule
  ]
})
export class CoursesModule { }
