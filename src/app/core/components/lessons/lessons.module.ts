import {MatAutocompleteModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LessonPageComponent} from './lesson-page/lesson-page.component';
import {CreateLessonComponent} from './create-lesson/create-lesson.component';
import {LessonsRoutingModule} from './lessons-routing.module';
import {FilterPipe} from './filter.pipe';

@NgModule({
  declarations: [
    LessonPageComponent,
    CreateLessonComponent,
    FilterPipe
  ],
  imports: [
    LessonsRoutingModule,
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatInputModule,
    CommonModule
  ],
  exports: []
})

export class LessonsModule {

}
