import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICourse} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AdminCoursesService {

  constructor(private http: HttpClient) {
  }

  addCourse(course): Observable<ICourse> {
    return this.http.post<ICourse>('http://localhost:3002/courses', course);
  }

}
