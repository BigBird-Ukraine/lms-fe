import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule, MatCardModule, MatCheckboxModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatPaginatorModule, MatSidenavModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {LessonPageComponent} from './lesson-page/lesson-page.component';
import {CreateLessonComponent} from './create-lesson/create-lesson.component';
import {FilterPipe} from './filter.pipe';
import {EditLessonComponent} from './edit-lesson/edit-lesson.component';
import {SingleLessonComponent} from './single-lesson/single-lesson.component';
import {AddQuestionToLessonComponent} from './add-question-to-lesson/add-question-to-lesson.component';
import {LessonTestComponent} from './lesson-test/lesson-test.component';
import {LessonTestResultComponent} from './lesson-test-result/lesson-test-result.component';
import {LessonRoutingModule} from './lesson-routing.module';
import {MaterialModule, SharedModule} from '../../../shared/modules';
import { EditCommentComponent } from './edit-comment/edit-comment.component';



@NgModule({
  entryComponents:[EditCommentComponent],
  declarations: [
    LessonPageComponent,
    CreateLessonComponent,
    FilterPipe,
    EditLessonComponent,
    SingleLessonComponent,
    AddQuestionToLessonComponent,
    LessonTestComponent,
    LessonTestResultComponent,
    EditCommentComponent
  ],
  imports: [
    LessonRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,

    ScrollingModule,
    DragDropModule,

    MatFormFieldModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatInputModule,
    MatExpansionModule,
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MaterialModule
  ],
  exports: [LessonTestResultComponent]
})
export class LessonModule { }
