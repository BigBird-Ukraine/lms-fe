import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {ICourse, IFullCourse} from '../interfaces';
import {config} from '../../../../shared/config';


@Injectable({
  providedIn: 'root'
})
export class AdminCoursesService {
  courseUrl = config.apiAdminUrl + '/courses';

  constructor(private http: HttpClient) {
  }

  addCourse(course): Observable<ICourse> {
    return this.http.post<ICourse>(`${this.courseUrl}`, course);
  }

  getAllCourses(): Observable<IFullCourse> {
    return this.http.get<IFullCourse>(`${config.apiAdminUrl}/courses`);
  }

  deleteCourse(id): Observable<ICourse> {
    return this.http.delete<ICourse>(`${this.courseUrl}/${id}`);
  }

  findCourseByParams(params): Observable<IFullCourse> {
    return this.http.get<IFullCourse>(`${this.courseUrl}`, {
      params: new HttpParams({
        fromObject: params
      })
    });
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${this.courseUrl}/${id}`);
  }
}
