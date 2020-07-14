import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-questions-page',
  templateUrl: './questions-page.component.html',
  styleUrls: ['./questions-page.component.scss']
})
export class QuestionsPageComponent implements OnInit {
  statusAddQuestionBtn = false;
  statusShowAllQuestion = false;
  statusShowMyQuestion = false;

  constructor() {
  }

  ngOnInit() {
  }

  setStatusAddQuestionBtn(value: boolean) {
    this.statusShowAllQuestion = false;
    this.statusShowMyQuestion = false;
    this.statusAddQuestionBtn = value;
  }

  setStatusShowAllQuestion(value: boolean) {
    this.statusShowMyQuestion = false;
    this.statusAddQuestionBtn = false;
    this.statusShowAllQuestion = value;
  }

  setStatusShowMyQuestion(value: boolean) {
    this.statusShowAllQuestion = false;
    this.statusAddQuestionBtn = false;
    this.statusShowMyQuestion = value;
  }
}
