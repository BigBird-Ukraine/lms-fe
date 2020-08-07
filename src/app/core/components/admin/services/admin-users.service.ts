import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';

import {commonAdminPath, commonAuthPath} from '../../../../shared/api';
import {IUser, IUserSubjectModel} from '../interfaces';
import {catchError, tap} from 'rxjs/operators';
import {UserModel} from '../../../interface';


@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {
  urlUsers: string = commonAdminPath + '/users';
  userInfo: BehaviorSubject<Partial<IUser>> = new BehaviorSubject({});

  constructor(private httpClient: HttpClient) {
  }

  getAll(params?): Observable<any> {
    return this.httpClient.get<any>(this.urlUsers + '/', {
      params: new HttpParams({
        fromObject: params
      })
    });
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

  getByID(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.urlUsers}/${id}`);
  }

  getUserInfoByToken(accessToken: string): Observable<IUser> {
    const options = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    return this.httpClient.get<IUser>(`${commonAdminPath}/users/getInfo`, options)
      .pipe(
        tap((response: IUser) => {
          this.userInfo.next(response);
        }),
        catchError((err: any) => {
          return throwError(err);
        })
      );
  }

  createUser(user): Observable<UserModel> {

    const formData: FormData = new FormData();
    const {photo_path, ...body} = user;

    if (photo_path) {
      formData.append('files', photo_path);
    }

    const strings = Object.keys(body);
    strings.forEach(key => {
      formData.append(key, body[key]);
    });

    return this.httpClient.post<UserModel>(`${commonAuthPath}/users`, formData);
  }
}
