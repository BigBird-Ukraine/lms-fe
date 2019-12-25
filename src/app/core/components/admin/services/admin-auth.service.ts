import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {commonAdminPath} from '../../../../shared/api';
import {ISuccessHttpResponse} from '../../../../shared/models/interfaces';
import {ITokensModel, UserModel} from '../../../interface';

const authApiUrls = {
  authAdmin: commonAdminPath + '/auth',
  logoutAdmin: commonAdminPath + '/auth/logout',
  refreshTokens: commonAdminPath + '/auth/refresh',
  getAdminInfo: commonAdminPath + '/users/getInfo'
};

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private readonly accessTokenKey = 'ACCESS_TOKEN';
  private readonly refreshTokenKey = 'REFRESH_TOKEN';

  constructor(private httpClient: HttpClient) {
  }


  authAdmin(authInfo: Partial<UserModel>): Observable<any> {
    return this.httpClient
      .post(`${authApiUrls.authAdmin}`, authInfo)
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

  getAdminInfo(): Observable<any> {
    return this.httpClient.get<any>(`${authApiUrls.getAdminInfo}`);
  }

  logout(): Observable<any> {
        return this.httpClient
      .post(authApiUrls.logoutAdmin, null)
      .pipe(
        tap(() => {
          this.deleteTokens();
        }),
        catchError((err: any) => {
          return throwError(err);
        })
      );
  }

  refreshToken(): Observable<any> {
    return this.httpClient.post(authApiUrls.refreshTokens, null
    ).pipe(
      tap((response: ISuccessHttpResponse) => {
        const {accessToken, refreshToken} = response.data as ITokensModel;
        this.setTokens(accessToken, refreshToken);

      }),
    );
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

  public setTokens(accessToken: string, refreshToken: string): void {
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
  }
}
