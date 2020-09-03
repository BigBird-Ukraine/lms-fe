import { Component, OnInit } from '@angular/core';
import {switchMap, take} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';

import {UserRolesEnum} from '../../../../../shared/enums';
import {AdminAuthService, AdminLessonService, AdminUsersService} from '../../services';
import {ICommentFull, IEditLesson, ILesson, IPaginator, IUser, QuestionModel} from '../../interfaces';
import {EditCommentComponent} from '../edit-comment/edit-comment.component';
import {EditLessonComponent} from '../edit-lesson/edit-lesson.component';
import {AddQuestionToLessonComponent} from '../add-question-to-lesson/add-question-to-lesson.component';

@Component({
  selector: 'app-single-lesson',
  templateUrl: './single-lesson.component.html',
  styleUrls: ['./single-lesson.component.scss']
})
export class SingleLessonComponent implements OnInit {

  token = this.authService.getAccessToken();
  isAdmin: boolean;
  lesson: ILesson;
  id: string;

  commentaries: ICommentFull[];
  length: number;
  pageSize = 10;
  pageIndex = 0;
  spinnerStatus = false;

  textArea = new FormControl();

  constructor(private dialog: MatDialog,
              private userService: AdminUsersService,
              private authService: AdminAuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private lessonService: AdminLessonService) {
  }

  ngOnInit() {
    this.userService.getUserInfoByToken(this.token)
      .subscribe(() => {
        if (this.userService.userInfo.subscribe()) {
          this.userService.userInfo.subscribe((user: IUser) => {
            this.isAdmin = user.role_id === UserRolesEnum.ADMIN;
          });
        }
      });

    this.id = this.activatedRoute.snapshot.params.id;
    this.getLesson(this.id);
    this.getFilteredComments();
  }

  getLesson(id) {
    this.lessonService.getLessonById(id).subscribe((lessonInfo: IEditLesson) => {
      this.lesson = lessonInfo.data;
    });
  }

  editLesson() {
    this.dialog.open(EditLessonComponent, {
      data: {lesson: this.lesson}
    }).afterClosed().subscribe((value: IEditLesson) => {
      value ? (this.lesson = value.data) : this.getLesson(this.id);
    });
  }

  addQuestionToLesson() {
    this.dialog.open(AddQuestionToLessonComponent, {
      data: this.lesson.questions_id
    }).afterClosed().subscribe((questions: QuestionModel[]) => {
      const data = {
        NewQuestions_id: [],
      };
      if (questions) {
        questions.forEach(question => data.NewQuestions_id.push(question._id));
        this.lessonService.addQuestionsToLesson(this.id, data).subscribe();
      }
    });
  }

  startTest() {
    this.router.navigate([`admin/adminPanel/lessons/${this.id}/test`]);
  }

  saveComment() {
    this.lessonService.saveComment(this.id, {text: this.textArea.value}).subscribe(res => {
      this.getFilteredComments();
      this.textArea.reset();
    });
  }

  getFilteredComments(event?: Partial<IPaginator>) {
    if (event) {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
    } else {
      this.pageIndex = 0;
    }

    this.commentaries = null;

    this.router.navigate([`admin/adminPanel/lessons/${this.id}`], {
      queryParams: {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex
      }
    });

    this.activatedRoute.queryParams.pipe(
      switchMap(value => {
        return this.lessonService.getCommentaries(this.id, value);
      }),
      take(1),
    ).subscribe(value => {
      this.length = value.data.count;
      this.commentaries = value.data.comments;
    });
  }

  delComment(id: string) {
    this.lessonService.deleteComment(id).subscribe(res => this.getFilteredComments());
  }

  openEditComment(comId: string, text: string) {
    this.dialog.open(EditCommentComponent, {
      width: '30%',
      data: {comId, text}
    }).afterClosed().subscribe((editedText: string) => {
      if (editedText) {
        const index = this.commentaries.findIndex(com => com._id === comId);
        this.commentaries[index] = {...this.commentaries[index], text: editedText};
      }
    });
  }

  fileChange(video) {
    const file = video.target.files[0];

    this.spinnerStatus = true;
    this.lessonService.changeVideo(file, this.lesson._id).subscribe(res => {
      this.spinnerStatus = false;
      alert('Відео скоро загрузиться, очікуйте...');
      this.router.navigate(['admin/adminPanel/lessons']);
    }, error1 => this.spinnerStatus = false);
  }
}
