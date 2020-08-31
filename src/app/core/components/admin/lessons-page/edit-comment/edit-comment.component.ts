import {Component, Inject, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {AdminLessonService} from '../../services';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.scss']
})
export class EditCommentComponent implements OnInit {

  textArea = new FormControl(this.data.text);

  constructor(private dialogRef: MatDialogRef<EditCommentComponent>,
              private lessonService: AdminLessonService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close(false);
  }

  saveComment() {
    this.lessonService.editComment(this.data.comId, this.textArea.value)
      .subscribe(res => this.dialogRef.close(this.textArea.value));
  }

}
