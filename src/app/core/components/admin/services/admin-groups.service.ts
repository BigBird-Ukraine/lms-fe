import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {GroupModel} from '../interfaces';
import {config} from '../../../../shared/config';

@Injectable({
  providedIn: 'root'
})
export class AdminGroupsService {
  groupUrl = config.apiAdminUrl + '/groups';

  constructor(private httpClient: HttpClient) {
  }

  save(group): Observable<GroupModel> {
    return this.httpClient.post<GroupModel>(`${this.groupUrl}`, group);
  }

  getAll(): Observable<any> {
    return this.httpClient.get<any>(`${this.groupUrl}`);

  }

  update(id: string, object: object): Observable<any> {
    return this.httpClient.patch(`${this.groupUrl}/${id}`, object);
  }

  delete(_id: string): Observable<any> {
    return this.httpClient.delete(`${this.groupUrl}/${_id}`)
  }
}
