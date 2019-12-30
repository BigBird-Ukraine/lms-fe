import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, BehaviorSubject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {UserModel, IUserSubjectModel} from '../../interface';
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

    formData.append('files', user.photo_path);

    const strings = Object.keys(body);
    strings.forEach(key => {
      formData.append(key, body[key]);
    });

    return this.http.post<UserModel>(`${commonAuthPath}/users`, formData);
  }

  updateUser(id, user): Observable<UserModel> {
    const formData: FormData = new FormData();
    const {photo_path, ...body} = user;

    formData.append('files', photo_path);

    const strings = Object.keys(body);
    strings.forEach(key => {
      if (!body[key]) {
        delete body[key];
      }
      formData.append(key, body[key]);
    });

    return this.http.patch<UserModel>(`${commonAuthPath}/users` + `/${id}`, formData);
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
}
