import {
  MatAutocompleteModule,
  MatButtonModule, MatCardModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatSidenavModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LessonPageComponent} from './lesson-page/lesson-page.component';
import {CreateLessonComponent} from './create-lesson/create-lesson.component';
import {LessonsRoutingModule} from './lessons-routing.module';
import {FilterPipe} from './filter.pipe';
import { EditLessonComponent } from './edit-lesson/edit-lesson.component';
import { SingleLessonComponent } from './single-lesson/single-lesson.component';

@NgModule({
  declarations: [
    LessonPageComponent,
    CreateLessonComponent,
    FilterPipe,
    EditLessonComponent,
    SingleLessonComponent
  ],
  imports: [
    LessonsRoutingModule,
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
    MatExpansionModule,
    MatCardModule,
    MatSidenavModule,
    MatIconModule
  ],
  exports: []
})

export class LessonsModule {

}
