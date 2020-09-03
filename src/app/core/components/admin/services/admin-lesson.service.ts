import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {commonAdminPath, commonAuthPath} from '../../../../shared/api';
import {AdminAuthService} from './admin-auth.service';
import {IComment, ICommentPaginator, IEditLesson, IFullLesson, ILesson, ILessonStatistics} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AdminLessonService {
  constructor(private http: HttpClient,
              private authService: AdminAuthService) {

  }

  createLesson(lesson: ILesson) {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    const formData: FormData = new FormData();
    const {video_path, ...body} = lesson;

    if (video_path) {
      formData.append('files', video_path);
    }

    const strings = Object.keys(body);
    strings.forEach(key => {
      formData.append(key, body[key]);
    });

    return this.http.post(`${commonAdminPath}/lessons`, formData, options);
  }

  getAllLessons(): Observable<IFullLesson> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.get<IFullLesson>(`${commonAdminPath}/lessons`, options);
  }

  getLessonsByParams(params): Observable<IFullLesson> {
    return this.http.get<IFullLesson>(`${commonAdminPath}/lessons`, {
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

    return this.http.get<IFullLesson>(`${commonAdminPath}/lessons/my`, options);
  }

  editLesson(id, lesson): Observable<IEditLesson> {
    return this.http.patch<IEditLesson>(`${commonAdminPath}/lessons` + `/${id}`, lesson);
  }

  getLessonById(id): Observable<IEditLesson> {
    return this.http.get<IEditLesson>(`${commonAdminPath}/lessons/${id}`);
  }

  addQuestionsToLesson(id, questions): Observable<IEditLesson> {
    return this.http.patch<IEditLesson>(`${commonAdminPath}/lessons/${id}/question`, questions);
  }

  getLessonsStatics(): Observable<ILessonStatistics[]> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.get<ILessonStatistics[]>(`${commonAdminPath}/lessons/statics`, options);
  }

  getLessonsByModule(id: string) {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };


    return this.http.get<Partial<ILesson[]>>(`${commonAdminPath}/lessons/by_module?module_id=${id}`, options);
  }

  getAllLessonsLabels(): Observable<Partial<ILesson[]>> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.get<Partial<ILesson[]>>(`${commonAdminPath}/lessons/labels`, options);
  }

  deleteLesson(id: any) {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.delete(`${commonAdminPath}/lessons/${id}`, options);
  }

  saveComment(id: string, comment: IComment) {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.post(`${commonAdminPath}/lessons/${id}/comment`, comment, options);
  }

  getCommentaries(id: string, params?): Observable<ICommentPaginator> {
    return this.http.get<ICommentPaginator>(`${commonAdminPath}/lessons/${id}/comment`, {
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

    return this.http.delete(`${commonAdminPath}/lessons/comment?comment_id=${id}`, options);
  }

  editComment(comId: string, text: string) {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };
    return this.http.put(`${commonAdminPath}/lessons/comment?comment_id=${comId}`, {text}, options);
  }

  changeVideo(file, id: string) {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    const formData: FormData = new FormData();

    if (file) {
      formData.append('files', file);
    }

    return this.http.patch(`${commonAdminPath}/lessons/${id}/video`, formData, options);
  }
}
