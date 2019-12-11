import {Injectable} from '@angular/core';
import {commonAdminPath, commonAuthPath} from '../../../shared/api';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserService} from '../user';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {ISuccessHttpResponse} from '../../../shared/models/interfaces';
import {ITokensModel, UserModel} from '../../interface';

const authApiUrls = {
  authAdmin: commonAdminPath + '/auth',
  logoutAdmin: commonAdminPath + '/auth/logout',
  refreshTokens: commonAdminPath + '/auth/refresh'
};

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {
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
      .post(authApiUrls.refreshTokens, '', options)
      .pipe(
        tap((response: ISuccessHttpResponse) => {
          const {accessToken, refreshToken} = response.data;
          this.setTokens(accessToken, refreshToken);
        }),
        catchError((err: any) => {
          return throwError(err);
        })
      );
  }

  authAdmin(authInfo: Partial<UserModel>): Observable<any> {
    return this.httpClient
      .post(authApiUrls.authAdmin, authInfo)
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
      .post(authApiUrls.logoutAdmin, null, options)
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

  private getRefreshToken(): string {
    return localStorage.getItem(this.refreshTokenKey);
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
  }
}
