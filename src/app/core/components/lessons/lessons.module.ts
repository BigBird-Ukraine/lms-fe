import {
  MatAutocompleteModule,
  MatButtonModule, MatCardModule, MatCheckboxModule,
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
// import {LessonsRoutingModule} from './lessons-routing.module';
import {FilterPipe} from './filter.pipe';
import { EditLessonComponent } from './edit-lesson/edit-lesson.component';
import { SingleLessonComponent } from './single-lesson/single-lesson.component';
import {AddQuestionToLessonComponent} from './add-question-to-lesson/add-question-to-lesson.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { LessonTestComponent } from './lesson-test/lesson-test.component';
import { LessonTestResultComponent } from './lesson-test-result/lesson-test-result.component';

@NgModule({
  declarations: [
    LessonPageComponent,
    CreateLessonComponent,
    FilterPipe,
    EditLessonComponent,
    SingleLessonComponent,
    AddQuestionToLessonComponent,
    LessonTestComponent,
    LessonTestResultComponent
  ],
  imports: [
    // LessonsRoutingModule,
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
    MatIconModule,
    ScrollingModule,
    DragDropModule,
    MatCheckboxModule
  ],
  exports: []
})

export class LessonsModule {

}
