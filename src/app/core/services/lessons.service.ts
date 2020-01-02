import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {IFullLesson, ILesson} from '../interface';
import {commonAuthPath} from '../../shared/api';
import {AuthService} from './auth';

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
}
