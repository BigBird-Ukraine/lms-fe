import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {ICourse, IFullCourse} from '../interfaces';
import {config} from '../../../../shared/config';


@Injectable({
  providedIn: 'root'
})
export class AdminCoursesService {

  constructor(private http: HttpClient) {
  }

  addCourse(course): Observable<ICourse> {
    return this.http.post<ICourse>(`${config.apiAdminUrl}/courses`, course);
  }

  getAllCourses(): Observable<IFullCourse> {
    return this.http.get<IFullCourse>(`${config.apiAdminUrl}/courses`);
  }

  deleteCourse(id): Observable<ICourse> {
    return this.http.delete<ICourse>(`${config.apiAdminUrl}/courses/${id}`);
  }

  findCourseByParams(params): Observable<IFullCourse> {
    return this.http.get<IFullCourse>(`${config.apiAdminUrl}/courses`, {
      params: new HttpParams({
        fromObject: params
      })
    });
  }
}
