import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {catchError, tap} from 'rxjs/operators';

import {commonAdminPath} from '../../../../shared/api';
import {ISuccessHttpResponse} from '../../../../shared/models/interfaces';
import {ITokensModel, UserModel} from '../../../interface';
import {AdminInfo} from '../interfaces';

const authApiUrls = {
  authAdmin: commonAdminPath + '/auth',
  logoutAdmin: commonAdminPath + '/auth/logout',
  refreshTokens: commonAdminPath + '/auth/refresh',
  getAdminInfo: commonAdminPath + '/admin/getInfo'
};

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private readonly accessTokenKey = 'ACCESS_TOKEN';
  private readonly refreshTokenKey = 'REFRESH_TOKEN';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {
  }



  authAdmin(authInfo: Partial<UserModel>): Observable<any> {
    return this.httpClient
      .post(authApiUrls.authAdmin, authInfo)
      .pipe(
        tap((response: ISuccessHttpResponse) => {
          const {accessToken, refreshToken} = response.data as ITokensModel;
          this.setTokens(accessToken, refreshToken);

        }),
        catchError((err: any) => {
          return throwError(err);
        })
      );
  }

  getAdminInfo(): Observable<AdminInfo> {
    return this.httpClient.get<AdminInfo>(authApiUrls.getAdminInfo);
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
  getRefreshToken(): string {
    return localStorage.getItem(this.refreshTokenKey);
  }

  setTokens(accessToken: string, refreshToken: string): void {
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
  }
}
