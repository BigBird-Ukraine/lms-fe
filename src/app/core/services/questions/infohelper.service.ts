import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {
  Level,
  Subject,
  Tags,
  Groups
} from '../../interface';
import {commonQuestionPath} from '../../../shared';

@Injectable({
  providedIn: 'root'
})
export class InfoHelperService {

  constructor(private http: HttpClient) {}

  getSubject(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${commonQuestionPath}/helpers/subjects`);
  }

  getLevel(): Observable<Level[]> {
    return this.http.get<Level[]>(`${commonQuestionPath}/helpers/levels`);
  }

  getTags(): Observable<Tags[]> {
    return this.http.get<Tags[]>(`${commonQuestionPath}/helpers/tags`);
  }

  getGroups(): Observable<Groups[]> {
    return this.http.get<Groups[]>(`${commonQuestionPath}/helpers/groups`);
  }
}
