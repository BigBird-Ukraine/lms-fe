import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {IEditLesson, IFullLesson, ILesson} from '../../../interface';
import {commonAdminPath} from '../../../../shared/api';
import {AdminAuthService} from './admin-auth.service';
import {ILessonStatistics} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AdminLessonService {
  constructor(private http: HttpClient,
              private authService: AdminAuthService) {

  }

  createLesson(lesson): Observable<ILesson> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.post<ILesson>(`${commonAdminPath}/lessons`, lesson, options);
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
}
