import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {IComment, ICommentPaginator, IEditLesson, IFullLesson, ILesson} from '../../interface';
import {commonAuthPath} from '../../../shared/api';
import {AuthService} from '../auth';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  constructor(private http: HttpClient,
              private authService: AuthService) {

  }

  createLesson(lesson): Observable<ILesson> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.post<ILesson>(`${commonAuthPath}/lessons`, lesson, options);
  }

  getAllLessons(): Observable<IFullLesson> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.get<IFullLesson>(`${commonAuthPath}/lessons`, options);
  }

  getLessonsByParams(params): Observable<IFullLesson> {
    return this.http.get<IFullLesson>(`${commonAuthPath}/lessons`, {
      params: new HttpParams({
        fromObject: params
      })
    });
  }

  getMyLessons(): Observable<IFullLesson> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.get<IFullLesson>(`${commonAuthPath}/lessons/my`, options);
  }

  editLesson(id, lesson): Observable<IEditLesson> {
    return this.http.patch<IEditLesson>(`${commonAuthPath}/lessons` + `/${id}`, lesson);
  }

  getLessonById(id): Observable<IEditLesson> {
    return this.http.get<IEditLesson>(`${commonAuthPath}/lessons/${id}`);
  }

  addQuestionsToLesson(id, questions): Observable<IEditLesson> {
    return this.http.patch<IEditLesson>(`${commonAuthPath}/lessons/${id}/question`, questions);
  }

  deleteLesson(id: string) {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.delete(`${commonAuthPath}/lessons/${id}`, options);
  }

  saveComment(id: string, comment: IComment) {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.post(`${commonAuthPath}/lessons/${id}/comment`, comment, options);
  }

  getCommentaries(id: string, params?): Observable<ICommentPaginator> {
    return this.http.get<ICommentPaginator>(`${commonAuthPath}/lessons/${id}/comment`, {
      params: new HttpParams({
        fromObject: params
      }),
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    });
  }

  deleteComment(id: string) {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.delete(`${commonAuthPath}/lessons/comment?comment_id=${id}`, options);
  }

  editComment(comId: string, text: string) {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };
    return this.http.put(`${commonAuthPath}/lessons/comment?comment_id=${comId}`, {text}, options);
  }
}
