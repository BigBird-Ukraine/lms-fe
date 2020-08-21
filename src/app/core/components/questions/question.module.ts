import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatAutocompleteModule, MatCardModule, MatExpansionModule} from '@angular/material';

import {EditQuestionComponent} from './edit-question/edit-question.component';
import {AddQuestionFormComponent} from './add-question-form/add-question-form.component';
import {QuestionRoutingModule} from './question-routing.module';
import {FormModule, MaterialModule, SharedModule} from '../../../shared/modules';
import {FilterForQuestionsComponent} from './filter-for-questions/filter-for-questions.component';
import {FilterPipe} from './filter.pipe';
import {MyQuestionsComponent} from './my-questions/my-questions.component';

@NgModule({
  entryComponents: [
    EditQuestionComponent
  ],
  declarations: [
    AddQuestionFormComponent,
    FilterForQuestionsComponent,
    FilterPipe,
    EditQuestionComponent,
    MyQuestionsComponent
  ],
  imports: [
    CommonModule,
    FormModule,
    QuestionRoutingModule,
    SharedModule,

    MaterialModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatCardModule,
  ],
  exports: []
})
export class QuestionModule { }
