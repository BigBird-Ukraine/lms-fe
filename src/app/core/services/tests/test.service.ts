import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {commonAuthPath} from '../../../shared/api';
import {ITest, IUser} from '../../interface';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) {
  }

  getTestByLessonId(id): Observable<ITest> {
    return this.http.get<ITest>(`${commonAuthPath}/lessons/${id}/test`);
  }

  sendTests(id, test): Observable<IUser> {
    return this.http.post<IUser>(`${commonAuthPath}/lessons/${id}/test`, test);
  }

  sendFilteredTests(test): Observable<IUser> {
    return this.http.post<IUser>(`${commonAuthPath}/questions/test`, test);
  }
}
