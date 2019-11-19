import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormModule, MaterialModule} from '../../../shared/modules';
import {QuestionRoutingModule} from './question-routing.module';

import {InfoHelperComponent} from './info-helper/info-helper.component';
import {AddQuestionFormComponent} from './add-question-form/add-question-form.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { QuestionsLayoutComponent } from './questions-layout/questions-layout.component';
import {MatCardModule} from '@angular/material';

@NgModule({
  declarations:[
    InfoHelperComponent,
    AddQuestionFormComponent,
    QuestionsLayoutComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormModule,
    QuestionRoutingModule,
    MatExpansionModule,
    MatCardModule
  ],
  exports: [
    MaterialModule,
    FormModule,
    QuestionRoutingModule
  ]
})

export class QuestionModule {
}
