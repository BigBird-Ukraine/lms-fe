import { Component, OnInit } from '@angular/core';
import {ISubjectStatistics, QuestionModel} from '../../interfaces';
import {AdminQuestionsService, AdminStatisticsService} from '../../services';
import {MatDialog} from '@angular/material';
import {GroupComponent} from '../group/group.component';
import {QuestionComponent} from '../question/question.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  questionsStatistic: ISubjectStatistics[];

  constructor(private questionsService: AdminQuestionsService,
              private statisticService: AdminStatisticsService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.questionsService.getQuestionStatics().subscribe(questionsStatistics => {
      this.questionsStatistic = questionsStatistics
      this.statisticService.setDisplayPage();
    });
  }

  openForm(subject: string, count: number) {
    if (count > 0) {
      this.dialog.open(QuestionComponent, {
        width: '90%',
        data: {
          subject,
        }
      });
    }
  }
}
