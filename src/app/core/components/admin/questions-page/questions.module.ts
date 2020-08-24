import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {QuestionsRoutingModule} from './questions-routing.module';
import {QuestionsPageComponent} from './questions-page/questions-page.component';
import {AddQuestionComponent} from './add-question/add-question.component';
import {AllQuestionComponent} from './all-question/all-question.component';
import {MyQuestionComponent} from './my-question/my-question.component';
import {AddQuestionToLessonComponent} from '../lessons-page/add-question-to-lesson/add-question-to-lesson.component';
import {EditQuestionComponent} from './edit-question/edit-question.component';
import {AdminModule} from '../admin.module';

@NgModule({
  entryComponents: [
    EditQuestionComponent
  ],
  declarations: [
    QuestionsPageComponent,
    AddQuestionComponent,
    AllQuestionComponent,
    MyQuestionComponent,
    AddQuestionToLessonComponent,
    EditQuestionComponent,

  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,

    AdminModule,
  ],
  exports: [AddQuestionToLessonComponent]
})
export class QuestionsModule { }
