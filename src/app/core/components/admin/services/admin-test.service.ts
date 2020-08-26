import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


import {commonAdminPath} from '../../../../shared/api';
import {ITest} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AdminTestService {
  constructor(private http: HttpClient) { }

  getTestByLessonId(id): Observable<ITest> {
    return this.http.get<ITest>(`${commonAdminPath}/lessons/${id}/test`);
  }

  sendTests(id, test): Observable<number> {
    return this.http.post<number>(`${commonAdminPath}/lessons/${id}/test`, test);
  }
}
