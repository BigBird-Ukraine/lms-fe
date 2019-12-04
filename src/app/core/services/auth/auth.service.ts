import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {ISuccessHttpResponse} from '../../../shared/';
import {commonApiPath} from '../../../shared';
import {ITokensModel, UserModel} from '../../interface';
import {UserService} from '../user/user.service';

const authApiUrls = {
  authUser: commonApiPath + '/auth',
  logoutUser: commonApiPath + '/auth/logout',
  refreshTokens: commonApiPath + '/auth/refresh'
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

  authUser(authInfo: Partial<UserModel>): Observable<any> {
    return this.httpClient
      .post(authApiUrls.authUser, authInfo)
      .pipe(
        tap((response: ISuccessHttpResponse) => {
          const {accessToken, refreshToken} = response.data as ITokensModel;

          this.setTokens(accessToken, refreshToken);
          this.userService.getUserInfoByToken(accessToken);

          // TODO you still need to test it when BE part will be finished
        }),
        catchError((err: any) => {
          this.redirectToLogin();

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
          // todo maybe we should redirect to other page
          this.redirectToLogin();

          return throwError(err);
        })
      );
  }

  public isAuthenticated(): boolean {
    return !!this.accessTokenKey;
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
    console.log(this.accessTokenKey)
    return localStorage.getItem(this.accessTokenKey);
  }

  private redirectToLogin(): any {
    // todo for what do you use this?
    // return this.router.navigateByUrl('/authorization/login');
  }

  private getRefreshToken(): string {
    return localStorage.getItem(this.refreshTokenKey);
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
  }
}
