import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule, MatAutocompleteModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';

import {FormModule, MaterialModule} from '../../../shared/modules';
import {FilterPipe} from './filter.pipe';
import {InfoHelperComponent} from './info-helper/info-helper.component';
import {AddQuestionFormComponent} from './add-question-form/add-question-form.component';
import {FilterForQuestionsComponent} from './filter-for-questions/filter-for-questions.component';
import {QuestionsLayoutComponent} from './questions-layout/questions-layout.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';

@NgModule({
  entryComponents: [
    EditQuestionComponent
  ],
  declarations: [
    InfoHelperComponent,
    AddQuestionFormComponent,
    FilterForQuestionsComponent,
    FilterPipe,
    QuestionsLayoutComponent,
    EditQuestionComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormModule,
    // QuestionRoutingModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatCardModule
  ],
  exports: [
    MaterialModule,
    FormModule,
    // QuestionRoutingModule,
  ]
})

export class QuestionModule {

}
