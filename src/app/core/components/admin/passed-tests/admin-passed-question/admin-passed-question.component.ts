import {Component, Input, OnInit} from '@angular/core';
import {QuestionModel} from '../../interfaces';

@Component({
  selector: 'app-admin-passed-question',
  templateUrl: './admin-passed-question.component.html',
  styleUrls: ['./admin-passed-question.component.scss']
})
export class AdminPassedQuestionComponent implements OnInit {

  @Input() questions: Partial<QuestionModel>;

  constructor() {
  }

  ngOnInit() {
  }

}
