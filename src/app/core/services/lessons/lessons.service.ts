import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {IEditLesson, IFullLesson, ILesson} from '../../interface';
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
}
