import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';

import {commonAdminPath, commonAuthPath} from '../../../../shared/api';
import {IPassedData, IUser} from '../interfaces';
import {catchError, tap} from 'rxjs/operators';
import {IUserStatistics} from '../interfaces/statistics.interface';

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

  createUser(user): Observable<IUser> {

    const formData: FormData = new FormData();
    const {photo_path, ...body} = user;

    if (photo_path) {
      formData.append('files', photo_path);
    }

    const strings = Object.keys(body);
    strings.forEach(key => {
      formData.append(key, body[key]);
    });

    return this.httpClient.post<IUser>(`${commonAdminPath}/users`, formData);
  }

  getUsersStatics(): Observable<IUserStatistics> {

    return this.httpClient.get<IUserStatistics>(`${commonAdminPath}/users/statics`);
  }

  getUsersByStatus(status: string): Observable<Partial<IUser[]>> {

    return this.httpClient.get<Partial<IUser[]>>(`${commonAdminPath}/users/by_status?status=${status}`);
  }

  getUserPassedTest(userId: string): Observable<IPassedData> {

    return this.httpClient.get<IPassedData>(`${commonAdminPath}/users/passed_tests?userId=${userId}`);
  }

  manageUserBooking(user: IUser, block: string): Observable<void> {
    return this.httpClient.post<void>(this.urlUsers + `/${user._id}/${block}`, null);
  }
}
