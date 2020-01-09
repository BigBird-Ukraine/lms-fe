import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {
  Level,
  Subject,
  Tags,
  Groups
} from '../../interface';

import {commonAuthPath} from '../../../shared';

@Injectable({
  providedIn: 'root'
})
export class InfoHelperService {

  constructor(private http: HttpClient) {}

  getSubject(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${commonAuthPath}/helpers/subjects`);
  }

  getLevel(): Observable<Level[]> {
    return this.http.get<Level[]>(`${commonAuthPath}/helpers/levels`);
  }

  getTags(): Observable<Tags[]> {
    return this.http.get<Tags[]>(`${commonAuthPath}/helpers/tags`);
  }

  getGroups(): Observable<Groups[]> {
    return this.http.get<Groups[]>(`${commonAuthPath}/helpers/groups`);
  }
}
