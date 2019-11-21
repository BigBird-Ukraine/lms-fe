import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormModule, MaterialModule} from '../../../shared/modules';
import {QuestionRoutingModule} from './question-routing.module';

import {InfoHelperComponent} from './info-helper/info-helper.component';
import {AddQuestionFormComponent} from './add-question-form/add-question-form.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { FilterForQuestionsComponent } from './filter-for-questions/filter-for-questions.component';
import {MatAutocompleteModule} from '@angular/material';
import {FilterPipe} from './filter.pipe';

@NgModule({
  declarations: [
    InfoHelperComponent,
    AddQuestionFormComponent,
    FilterForQuestionsComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormModule,
    QuestionRoutingModule,
    MatExpansionModule,
    MatAutocompleteModule
  ],
  exports: [
    MaterialModule,
    FormModule,
    QuestionRoutingModule
  ]
})

export class QuestionModule { }
