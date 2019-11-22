import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {
  Level,
  Subject,
  Tags,
  Groups
} from '../../interface';
import {config} from '../../../shared/config';

@Injectable({
  providedIn: 'root'
})
export class InfoHelperService {

  constructor(private http: HttpClient) {}

  getSubject(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${config.apiUrl}/${config.apiVersion}/helpers/subjects`);
  }

  getLevel(): Observable<Level[]> {
    return this.http.get<Level[]>(`${config.apiUrl}/${config.apiVersion}/helpers/levels`);
  }

  getTags(): Observable<Tags[]> {
    return this.http.get<Tags[]>(`${config.apiUrl}/${config.apiVersion}/helpers/tags`);
  }

  getGroups(): Observable<Groups[]> {
    return this.http.get<Groups[]>(`${config.apiUrl}/${config.apiVersion}/helpers/groups`);
  }
}
