import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';

import {FormModule, MaterialModule} from '../../../shared/modules';
import {QuestionRoutingModule} from './question-routing.module';
import {QuestionPipe} from '../../../shared/pipe/question.pipe';

import {InfoHelperComponent} from './info-helper/info-helper.component';
import {AddQuestionFormComponent} from './add-question-form/add-question-form.component';
import {QuestionsLayoutComponent} from './questions-layout/questions-layout.component';

@NgModule({
  declarations: [
    InfoHelperComponent,
    AddQuestionFormComponent,
    QuestionsLayoutComponent,
    QuestionPipe,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormModule,
    QuestionRoutingModule,
    MatExpansionModule,
    MatCardModule,
  ],
  exports: [
    MaterialModule,
    FormModule,
    QuestionRoutingModule,
  ]
})

export class QuestionModule {
}
