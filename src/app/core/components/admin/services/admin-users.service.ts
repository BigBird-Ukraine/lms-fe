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
    return this.httpClient.post<string>(this.urlUsers + `/${id}/block`, null);
  }

  unBlockUser(id: string): Observable<string> {
    return this.httpClient.post<string>(this.urlUsers + `/${id}/unblock`, null);
  }

  deleteUser(id: string): Observable<string> {
    return this.httpClient.delete<string>(this.urlUsers + `/${id}`);
  }

  makeTeacher(id: string): Observable<string> {
    return this.httpClient.post<string>(this.urlUsers + `/${id}/teacher`, null);
  }
  makeAdmin(id: string): Observable<string> {
    return this.httpClient.post<string>(this.urlUsers + `/${id}/admin`, null);
  }
  makeStudent(id: string): Observable<string> {
    return this.httpClient.post<string>(this.urlUsers + `/${id}/student`, null);
  }

  updateProfile(id: string, value: any): Observable<IUser> {
    return this.httpClient.patch<IUser>(this.urlUsers + `/${id}`, value);
  }
}
