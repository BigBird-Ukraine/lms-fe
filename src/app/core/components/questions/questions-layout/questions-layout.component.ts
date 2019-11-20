import {Component, OnInit} from '@angular/core';
import {QuestionsService} from '../../../services/questions/questions.service';

import {Answers, QuestionModel} from '../../../interface';

@Component({
  selector: 'app-questions-layout',
  templateUrl: './questions-layout.component.html',
  styleUrls: ['./questions-layout.component.scss']
})
export class QuestionsLayoutComponent implements OnInit {

  questions: QuestionModel[];


  constructor(private questionsService: QuestionsService) {
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.questionsService.getAllQuestion().subscribe((s) => {
      // this.questions = JSON.parse(localStorage.getItem('questions'));
      this.questions = s.data.questions;
      console.log(s);
    });
  }
}
