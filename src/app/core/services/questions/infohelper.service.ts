import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {
  Level,
  Subject,
  Tags,
  Groups
} from '../../interface';

@Injectable({
  providedIn: 'root'
})
export class InfoHelperService {

  constructor(private http: HttpClient) {}

  getSubject(): Observable<Subject[]> {
    return this.http.get<Subject[]>('http://localhost:3000/api/helpers/subjects');
  }

  getLevel(): Observable<Level[]> {
    return this.http.get<Level[]>('http://localhost:3000/api/helpers/levels');
  }

  getTags(): Observable<Tags[]> {
    return this.http.get<Tags[]>('http://localhost:3000/api/helpers/tags');
  }

  getGroups(): Observable<Groups[]> {
    return this.http.get<Groups[]>('http://localhost:3000/api/helpers/groups');
  }
}
