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
    return this.http.post<UserModel>(`${commonAuthPath}/users`, user);
  }

  updateUser(id, user): Observable<object> {
    const formData: FormData = new FormData();
    const {photo_path, ...body} = user;

    formData.append('photo', user.photo_path);

    const strings = Object.keys(body);
    strings.forEach(key => {
      formData.append(key, body[key]);
    });

    return this.http.patch<object>(`${commonAuthPath}/users` + `/${id}`, formData);
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
