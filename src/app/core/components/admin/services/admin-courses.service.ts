import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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

}
