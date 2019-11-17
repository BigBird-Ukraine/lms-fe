import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormModule, MaterialModule} from '../../../shared/modules';
import {QuestionRoutingModule} from './question-routing.module';

import {InfoHelperComponent} from './info-helper/info-helper.component';
import {AddQuestionFormComponent} from './add-question-form/add-question-form.component';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations:[
    InfoHelperComponent,
    AddQuestionFormComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormModule,
    QuestionRoutingModule,
    MatExpansionModule
  ],
  exports: [
    MaterialModule,
    FormModule,
    QuestionRoutingModule
  ]
})

export class QuestionModule {
}
