import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {IPassedTest} from '../../interfaces';

@Component({
  selector: 'app-lessons-test-result',
  templateUrl: './lessons-test-result.component.html',
  styleUrls: ['./lessons-test-result.component.scss']
})
export class LessonsTestResultComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: IPassedTest) { }

  ngOnInit() {
  }

}
