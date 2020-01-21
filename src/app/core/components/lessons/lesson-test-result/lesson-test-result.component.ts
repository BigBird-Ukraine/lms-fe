import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

import {IPassedTest} from '../../../interface';

@Component({
  selector: 'app-lesson-test-result',
  templateUrl: './lesson-test-result.component.html',
  styleUrls: ['./lesson-test-result.component.scss']
})
export class LessonTestResultComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: IPassedTest) { }

}
