import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {commonAuthPath} from '../../../shared/api';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  sendTests(test): Observable<any> {
    return this.http.post(`${commonAuthPath}/lessons/lesson:id/test`, test);
  }
}
