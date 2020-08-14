import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';

import {ILessonStatistics} from '../../interfaces';
import {AdminLessonService, AdminStatisticsService} from '../../services';
import {LessonComponent} from '../lesson/lesson.component';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {
  lessonsStatistic: ILessonStatistics[];

  constructor(private lessonService: AdminLessonService,
              private statisticService: AdminStatisticsService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.lessonService.getLessonsStatics().subscribe(lessonsStatistic => {
      this.lessonsStatistic = lessonsStatistic;
      this.statisticService.setDisplayPage();
    });
  }

  openForm(id: string, count: number) {
    if (count > 0) {
      this.dialog.open(LessonComponent, {
        width: '90%',
        data: {
          id
        }
      });
    }
  }
}
