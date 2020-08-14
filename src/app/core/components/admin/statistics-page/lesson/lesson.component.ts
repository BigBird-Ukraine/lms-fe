import {Component, Inject, OnInit} from '@angular/core';
import {ILesson} from '../../interfaces';
import {AdminLessonService} from '../../services';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {
  lessons: Partial<ILesson[]>;

  constructor(private lessonService: AdminLessonService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.lessonService.getLessonsByModule(this.data.id).subscribe(lessons => {
      this.lessons = lessons;
    });
  }
}
