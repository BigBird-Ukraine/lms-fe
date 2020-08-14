import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {AuthService} from '../auth';
import {IFullGroup, IGroup, IGroupStudents, ISingleGroup} from '../../interface';
import {commonAuthPath} from '../../../shared/api';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  getAllGroups(): Observable<IFullGroup> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.get<IFullGroup>(`${commonAuthPath}/groups`, options);
  }

  getOneGroup(id: string): Observable<ISingleGroup> {
    return this.http.get<ISingleGroup>(`${commonAuthPath}/groups/${id}`);
  }

  getGroupsStudents(id: string): Observable<IGroupStudents> {
    return this.http.get<IGroupStudents>(`${commonAuthPath}/groups/${id}/students`);
  }

  sendPresence(id: string, data): Observable<any> {
    return this.http.post<any>(`${commonAuthPath}/groups/${id}/attendance`, data);
  }

  getGroupsStatics() {

  }

  getMyGroups(): Observable<Partial<IGroup>[]> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.get<Partial<IGroup>[]>(`${commonAuthPath}/users/my-groups`, options);
  }
}
