import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-lesson-test-result',
  templateUrl: './lesson-test-result.component.html',
  styleUrls: ['./lesson-test-result.component.scss']
})
export class LessonTestResultComponent implements OnInit {

  result: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.result = this.data;
  }

}
