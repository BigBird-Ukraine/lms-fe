import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {ISuccessHttpResponse} from '../../../shared/';
import {commonApiPath} from '../../../shared';

const authApiUrls = {
  refreshTokens: commonApiPath + '/auth/refresh'
};

@Injectable()
export class AuthService {
  readonly accessTokenKey = 'ACCESS_TOKEN';
  readonly refreshTokenKey = 'REFRESH_TOKEN';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {
  }

  setTokens(accessToken: string, refreshToken: string): void {
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
  }

  redirectToLogin(): Promise<boolean> {
    return this.router.navigateByUrl('/authorization/login');
  }

  getAccessToken(): string {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string {
    return localStorage.getItem(this.refreshTokenKey);
  }

  refreshTokens(): Observable<any> {
    const savedRefreshToken = this.getRefreshToken();
    const options = {
      headers: new HttpHeaders({
        Authorization: savedRefreshToken
      })
    };

    return this.httpClient
      .post(authApiUrls.refreshTokens, null, options)
      .pipe(
        tap((response: ISuccessHttpResponse) => {
          const {accessToken, refreshToken} = response.data;

          this.setTokens(accessToken, refreshToken);
        }),
        catchError((err: any) => {
          this.redirectToLogin();

          return throwError(err);
        })
      );
  }

  private setAccessToken(token: string): void {
    localStorage.setItem(this.accessTokenKey, token);
  }

  private setRefreshToken(token: string): void {
    localStorage.setItem(this.refreshTokenKey, token);
  }
}
