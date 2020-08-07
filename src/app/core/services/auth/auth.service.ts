import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {ITokensModel, UserModel} from '../../interface';
import {UserService} from '../user';
import {commonAuthPath} from '../../../shared/api';
import {ISuccessHttpResponse} from '../../../shared';

const authApiUrls = {
  authUser: commonAuthPath + '/auth',
  logoutUser: commonAuthPath + '/auth/logout',
  refreshTokens: commonAuthPath + '/auth/refresh'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly accessTokenKey = 'ACCESS_TOKEN';
  private readonly refreshTokenKey = 'REFRESH_TOKEN';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private userService: UserService
  ) {
  }

  authRefreshToken(): Observable<any> {
    return this.httpClient.post(authApiUrls.refreshTokens, null
    ).pipe(
      tap((response: ISuccessHttpResponse) => {
        const {accessToken, refreshToken} = response.data as ITokensModel;
        this.setTokens(accessToken, refreshToken);

      }),
    );
  }

  authUser(authInfo: Partial<UserModel>): Observable<any> {
    return this.httpClient
      .post(authApiUrls.authUser, authInfo)
      .pipe(
        tap((response: ISuccessHttpResponse) => {
          const {accessToken, refreshToken} = response.data as ITokensModel;

          this.setTokens(accessToken, refreshToken);
          this.userService.getUserInfoByToken(accessToken);

        }),
        catchError((err: any) => {
          return throwError(err);
        })
      );
  }

  logout(): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.getAccessToken()
      })
    };

    return this.httpClient
      .post(authApiUrls.logoutUser, null, options)
      .pipe(
        tap(() => {
          this.deleteTokens();
          this.userService.userInfo.next({});
        }),
        catchError((err: any) => {
          return throwError(err);
        })
      );
  }

  public isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  private deleteTokens(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  private setAccessToken(token: string): void {
    localStorage.setItem(this.accessTokenKey, token);
  }

  private setRefreshToken(token: string): void {
    localStorage.setItem(this.refreshTokenKey, token);
  }

  public getAccessToken(): string {
    return localStorage.getItem(this.accessTokenKey);
  }

  public getRefreshToken(): string {
    return localStorage.getItem(this.refreshTokenKey);
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
  }
}
