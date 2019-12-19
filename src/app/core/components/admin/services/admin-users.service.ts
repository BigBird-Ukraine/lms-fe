import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {commonAdminPath} from '../../../../shared/api';
import {IUser} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {
  urlUsers: string = commonAdminPath + '/users';

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<IUser> {
    return this.httpClient.get<IUser>(this.urlUsers + '/');
  }

  getAllByRole(role: number): Observable<IUser> {
    return this.httpClient.get<IUser>(this.urlUsers + `/all?role=${role}`);
  }

  blockUser(id: string): Observable<string> {
    return this.httpClient.patch<string>(this.urlUsers + `/${id}/block`, null);
  }

  unBlockUser(id: string): Observable<string> {
    return this.httpClient.patch<string>(this.urlUsers + `/${id}/unBlock`, null);
  }

  deleteUser(id: string): Observable<string> {
    return this.httpClient.delete<string>(this.urlUsers + `/${id}`);
  }

  changeRole(id: string, role: number): Observable<string> {
    return this.httpClient.patch<string>(this.urlUsers + `/${id}?role=${role}`, null);
  }
}
