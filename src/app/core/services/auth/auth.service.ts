import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {IFullGroup, ITokensModel, UserModel} from '../../interface';
import {UserService} from '../user';
import {commonAuthPath} from '../../../shared/api';
import {ISuccessHttpResponse} from '../../../shared';

const authipUrls = {
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
    return this.httpClient.post(authipUrls.refreshTokens, null
    ).pipe(
      tap((response: ISuccessHttpResponse) => {
        const {accessToken, refreshToken} = response.data as ITokensModel;
        this.setTokens(accessToken, refreshToken);
      }),
      catchError( (err: any) => {
        this.deleteTokens();
        window.location.reload();
        return null;
      })
    );
  }

  authUser(authInfo: Partial<UserModel>): Observable<any> {
    return this.httpClient
      .post(authipUrls.authUser, authInfo)
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
      .post(authipUrls.logoutUser, null, options)
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

  resetPasswordConfirm(email: string): Observable<any> {

    return this.httpClient.post(`${commonAuthPath}/auth/forgot_password`, {email});
  }

  resetPassword(token: string, password: string): Observable<any> {

    return this.httpClient.post(`${commonAuthPath}/auth/reset_password/${token}`, {password});

  }

  public isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  public deleteTokens(): void {
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
