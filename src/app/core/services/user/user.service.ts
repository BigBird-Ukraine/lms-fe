import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, BehaviorSubject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {UserModel, IUserSubjectModel, IUser, IPassedData, IChangePassword} from '../../interface';
import {commonAuthPath} from '../../../shared/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  userInfo: BehaviorSubject<Partial<IUserSubjectModel>> = new BehaviorSubject({});

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

    return this.http.post<UserModel>(`${commonAuthPath}/users`, formData);
  }

  updateUser(id, user): Observable<IUser> {
    const formData: FormData = new FormData();
    const {photo_path, ...body} = user;

    if (photo_path) {
      formData.append('files', photo_path);
    }

    const strings = Object.keys(body);
    strings.forEach(key => {
      formData.append(key, body[key]);
    });

    return this.http.patch<IUser>(`${commonAuthPath}/users` + `/${id}`, formData);
  }

  getUserInfoByToken(accessToken: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    return this.http.get<IUserSubjectModel>(`${commonAuthPath}/users/info`, options)
      .pipe(
        tap((response: IUserSubjectModel) => {
          this.userInfo.next(response);
        }),
        catchError((err: any) => {
          return throwError(err);
        })
      );
  }

  getUserPassedTest(accessToken: string): Observable<IPassedData> {
    const options = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    return this.http.get<IPassedData>(`${commonAuthPath}/users/my_passed_tests`, options);
  }

  confirmUserMail(token: string): Observable<any> {

    return this.http.patch(`${commonAuthPath}/users/confirm/mail`, {confirmToken: token});
  }

  changePassword(passwords: IChangePassword): Observable<any> {

    return this.http.post(`${commonAuthPath}/users/password`, passwords);
  }

  confirmChangedPassword(token: string): Observable<any> {

    return this.http.put(`${commonAuthPath}/users/password`, {confirmToken: token});
  }
}
