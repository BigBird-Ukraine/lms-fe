import {Component, OnInit} from '@angular/core';
import {QuestionsService} from '../../../services/questions/questions.service';
import {QuestionModel} from '../../../interface';
import {take} from 'rxjs/operators';

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
    this.questionsService.getAllQuestion()
      .pipe(
        take(5)
      )
      .subscribe(question => this.questions = question);
  }
}
