import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, BehaviorSubject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {UserModel, IUserSubjectModel} from '../../interface';
import {commonAuthPath} from '../../../shared/api';
import {ISuccessHttpResponse} from '../../../shared';
import {IUserSubjectModel} from '../../interface/user-subject.model';

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

  getUserInfoByToken(accessToken: string): void {
    const options = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    this.http.get<IUserSubjectModel>(`${config.apiUrl}/${config.apiVersion}/users/info`, options)
      .pipe(
        tap((response: IUserSubjectModel) => {
          this.userInfo.next(response);
        }),
        catchError((err: any) => {
          return throwError(err);
        })
      ).subscribe();
  }
}
