import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {GroupModel} from '../interfaces';
import {config} from '../../../../shared/config';
import {commonAuthPath} from '../../../../shared/api';
import {ISingleGroup} from '../../../interface';

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

  getAll(params?): Observable<any> {
    return this.httpClient.get<any>(`${this.groupUrl}/`, {
      params: new HttpParams({
        fromObject: params
      })
    });

  }

  getOneGroup(_id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.groupUrl}/${_id}`);
  }

  updateUsersList(id: string, object: object): Observable<any> {
    return this.httpClient.patch(`${this.groupUrl}/${id}`, object);
  }

  delete(_id: string): Observable<any> {
    return this.httpClient.delete(`${this.groupUrl}/${_id}`);
  }

  updateById(_id: string, value: GroupModel): Observable<any> {
    return this.httpClient.post(`${this.groupUrl}/${_id}`, value);
  }

  sendPresence(id, data): Observable<any> {
    return this.httpClient.post<any>(`${this.groupUrl}/${id}/attendance`, data);
  }

}
