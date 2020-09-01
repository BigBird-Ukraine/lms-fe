import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule, MatCheckboxModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {QuestionsLayoutComponent} from './questions-layout/questions-layout.component';
import {MyPassedTestComponent} from './my-passed-test/my-passed-test.component';
import {TestsRoutingModule} from './tests-routing.module';
import {MaterialModule, SharedModule} from '../../../shared/modules';
import {LessonModule} from '../lessons/lesson.module';
import {LessonTestResultComponent} from '../lessons/lesson-test-result/lesson-test-result.component';
import { PassedQuestionComponent } from './my-passed-test/passed-question/passed-question.component';
import { MyPassedTestWrapperComponent } from './my-passed-test/my-passed-test-wrapper/my-passed-test-wrapper.component';



@NgModule({
  entryComponents: [
    LessonTestResultComponent,
    MyPassedTestComponent
  ],
  declarations: [QuestionsLayoutComponent, MyPassedTestComponent, PassedQuestionComponent, MyPassedTestWrapperComponent],
  imports: [
    TestsRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LessonModule,
    SharedModule,

    MatCardModule,
    MatCheckboxModule,
    MaterialModule
  ],
  exports: [MyPassedTestComponent]
})
export class TestsModule { }
