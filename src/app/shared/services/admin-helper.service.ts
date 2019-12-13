import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {config} from '../config';
import {IModule, ILesson} from '../../core/components/admin/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AdminHelperService {

  constructor(private http: HttpClient) {
  }

  getModules(): Observable<IModule[]> {
    return this.http.get<IModule[]>(`${config.apiAdminUrl}/modules`);
  }

  getLessons(): Observable<ILesson[]> {
    return this.http.get<ILesson[]>(`${config.apiAdminUrl}/lessons`);
  }

}
