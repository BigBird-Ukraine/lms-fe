import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, BehaviorSubject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {UserModel, IUserSubjectModel} from '../../interface';
import {commonAuthPath} from '../../../shared/api';
import {ISuccessHttpResponse} from '../../../shared';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private userService: UserService) {
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

    this.http.get<ISuccessHttpResponse>(`${commonAuthPath}/users`, options)
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
