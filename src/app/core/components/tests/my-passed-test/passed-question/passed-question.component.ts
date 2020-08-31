import {Component, Input, OnInit} from '@angular/core';
import {QuestionModel} from '../../../../interface';

@Component({
  selector: 'app-passed-question',
  templateUrl: './passed-question.component.html',
  styleUrls: ['./passed-question.component.scss']
})
export class PassedQuestionComponent implements OnInit {

  @Input() questions: Partial<QuestionModel>;

  constructor() { }

  ngOnInit() {
  }

}
