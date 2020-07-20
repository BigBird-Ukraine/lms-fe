import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ITest, IUser} from '../../../interface';
import {commonAdminPath} from '../../../../shared/api';

@Injectable({
  providedIn: 'root'
})
export class AdminTestService {
  constructor(private http: HttpClient) { }

  getTestByLessonId(id): Observable<ITest> {
    return this.http.get<ITest>(`${commonAdminPath}/lessons/${id}/test`);
  }

  sendTests(id, test): Observable<IUser> {
    return this.http.post<IUser>(`${commonAdminPath}/lessons/${id}/test`, test);
  }
}
