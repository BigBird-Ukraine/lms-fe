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

  getTestByLessonId(id): Observable<Partial<ITest>> {
    return this.http.get<Partial<ITest>>(`${commonAuthPath}/lessons/${id}/test`);
  }

  sendTests(id, test, questions: Partial<QuestionModel>[], maxMark: number): Observable<Partial<IUser>> {
    return this.http.post<Partial<IUser>>(`${commonAuthPath}/lessons/${id}/test`, {test, questions, max_mark: maxMark});
  }

  sendFilteredTests(test, questions: Partial<QuestionModel>[], maxMark: number): Observable<IUser> {
    return this.http.post<IUser>(`${commonAuthPath}/questions/test`, {test, questions, max_mark: maxMark});
  }
}
