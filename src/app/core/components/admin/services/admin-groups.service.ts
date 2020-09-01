import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {GroupModel, IGroupStatistics} from '../interfaces';
import {config} from '../../../../shared/config';
import {IAttendance, IGroup} from '../../../interface';

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

  getOneGroup(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.groupUrl}/${id}`);
  }

  updateUsersList(id: string, object: object): Observable<any> {
    return this.httpClient.patch(`${this.groupUrl}/${id}`, object);
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.groupUrl}/${id}`);
  }

  updateById(id: string, value: GroupModel): Observable<any> {
    return this.httpClient.post(`${this.groupUrl}/${id}`, value);
  }

  sendPresence(id, data): Observable<any> {
    return this.httpClient.post<any>(`${this.groupUrl}/${id}/attendance`, data);
  }

  getGroupsStatics(): Observable<IGroupStatistics[]> {

    return this.httpClient.get<IGroupStatistics[]>(`${this.groupUrl}/statics`);
  }

  getGroupsByCourse(id: string): Observable<Partial<IGroup[]>> {

    return this.httpClient.get<Partial<IGroup[]>>(`${this.groupUrl}/by_course?course_id=${id}`);
  }

  deleteVisitLog(visitId: string, groupId: string) {

    return this.httpClient.delete<Partial<IGroup>[]>(
      `${this.groupUrl}/${groupId}/attendance?visitId=${visitId}`);
  }

  changeAttendance(visitId: string, studentId: string, groupId: string): Observable<IAttendance[]> {

    return this.httpClient.patch<IAttendance[]>(
      `${this.groupUrl}/${groupId}/attendance?visitId=${visitId}&studentId=${studentId}`, {});
  }
}
