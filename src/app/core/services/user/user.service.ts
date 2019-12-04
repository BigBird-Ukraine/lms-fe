import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, BehaviorSubject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {UserModel} from '../../interface';
import {config} from '../../../shared/config';
import {IUserSubjectModel} from '../../interface/user-subject.model';
import {ISuccessHttpResponse} from '../../../shared/models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private userService: UserService) {
  }

  userInfo: BehaviorSubject<Partial<IUserSubjectModel>> = new BehaviorSubject({});

  createUser(user): Observable<UserModel> {
    return this.http.post<UserModel>(`${config.authUrl}/${config.apiVersion}/users`, user);
  }

  getUserInfoByToken(accessToken: string): void {
    const options = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    this.http.get<ISuccessHttpResponse>(`${config.authUrl}/${config.apiVersion}/users`, options)
      .pipe(
        tap((response: ISuccessHttpResponse) => {
          this.userService.userInfo.next(response.data);
        }),
        catchError((err: any) => {
          return throwError(err);
        })
      );
  }
}
