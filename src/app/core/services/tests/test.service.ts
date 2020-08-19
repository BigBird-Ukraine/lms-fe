import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {commonAuthPath} from '../../../shared/api';
import {ITest, IUser, QuestionModel} from '../../interface';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) {
  }

  getTestByLessonId(id): Observable<ITest> {
    return this.http.get<ITest>(`${commonAuthPath}/lessons/${id}/test`);
  }

  sendTests(id, test, questions: Partial<QuestionModel>[]): Observable<IUser> {
    return this.http.post<IUser>(`${commonAuthPath}/lessons/${id}/test`, {test, questions});
  }

  sendFilteredTests(test, questions: Partial<QuestionModel>[]): Observable<IUser> {
    return this.http.post<IUser>(`${commonAuthPath}/questions/test`, {test, questions});
  }
}
