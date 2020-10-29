import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {AuthService} from '../auth';
import {commonAuthPath} from '../../../shared/api';
import {PatricalICourse} from '../../components/admin/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  getMyCourses(): Observable<PatricalICourse> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.get<PatricalICourse>(`${commonAuthPath}/courses/my`, options);
  }
}
