import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questions-page',
  templateUrl: './questions-page.component.html',
  styleUrls: ['./questions-page.component.scss']
})
export class QuestionsPageComponent implements OnInit {
  statusAddQuestionBtn = false;

  constructor() { }

  ngOnInit() {
  }

  setStatusAddQuestionBtn(value: boolean) {
   this.statusAddQuestionBtn = value;
  }
}
