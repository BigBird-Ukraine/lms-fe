import {Component, Inject, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {debounceTime} from 'rxjs/operators';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import {ILesson} from '../../interfaces';
import {AdminLessonService} from '../../services';

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.scss']
})
export class AddLessonComponent implements OnInit {
  filteredLessons: Partial<ILesson[]> = [];
  pageSize = 50;
  pageIndex = 1;
  label = '';
  subject = new Subject<any>();
  form: FormGroup;

  constructor(private lessonService: AdminLessonService,
              private dialogRef: MatDialogRef<AddLessonComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      label: new FormControl('')
    });
    this.subject.pipe(
      debounceTime(200)
    ).subscribe(() => {
      const keys = Object.keys(this.form.value);
      keys.forEach(value => {
        if (!this.form.value[value]) {
          delete this.form.value[value];
        }
      });
      this.label = this.form.get('label').value;
      this.lessonService.getAllLessonsLabels().subscribe(value => {
        this.filteredLessons = value;
        this.data.forEach(lessonInModule => {
          this.filteredLessons = this.filteredLessons.filter(lessonFromAll => lessonFromAll._id !== lessonInModule._id);
        });
      });
    });
    this.subject.next();
  }

  drop(event: CdkDragDrop<Partial<ILesson[]>, any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  scroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight + 2) {
      this.pageIndex++;
      this.subject.next();
    }
  }
}
