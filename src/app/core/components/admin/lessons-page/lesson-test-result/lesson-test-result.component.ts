import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {IPassedTest} from '../../interfaces';


@Component({
  selector: 'app-lesson-test-result',
  templateUrl: './lesson-test-result.component.html',
  styleUrls: ['./lesson-test-result.component.scss']
})
export class LessonTestResultComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: IPassedTest) { }

  ngOnInit() {
  }

}
