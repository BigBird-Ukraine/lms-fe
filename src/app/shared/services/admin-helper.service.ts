import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {config} from '../config';
import {IModule, ILesson, IFullModule, IFullLesson} from '../../core/components/admin/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AdminHelperService {

  constructor(private http: HttpClient) {
  }

  getModules(): Observable<IFullModule> {
    return this.http.get<IFullModule>(`${config.apiAdminUrl}/modules`);
  }

  getLessons(): Observable<IFullLesson> {
    return this.http.get<IFullLesson>(`${config.apiAdminUrl}/lessons`);
  }

}
