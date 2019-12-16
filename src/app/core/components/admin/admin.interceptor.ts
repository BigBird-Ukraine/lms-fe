import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {Router} from '@angular/router';

import {AdminAuthService} from './services';
import {config} from '../../../shared/config';
import {AuthService} from '../../services/auth';
import {CustomSnackbarService} from '../../../shared/services';
import {MatDialog} from '@angular/material';

@Injectable()
export class AdminInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private authService: any;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public adminAuthService: AdminAuthService,
              public userAuthService: AuthService,
              private customSnackbarService: CustomSnackbarService,
              private dialog: MatDialog,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (request.url.includes(`${config.adminPort}`)) {
      this.authService = this.adminAuthService;
    } else {
      this.authService = this.userAuthService;
    }

    if (this.isRefreshing) {
      request = this.addToken(request, this.authService.getRefreshToken());
    } else if (this.authService.getAccessToken()) {
      request = this.addToken(request, this.authService.getAccessToken());
    } else {
      return next.handle(request);
    }


    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      if (error && error.error) {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        }
        this.customSnackbarService.open(error.error.error.message, 'error');
      }
      if (error.status === 403) {
        this.isRefreshing = false;
        this.dialog.closeAll();
        this.router.navigate(['admin/login'], {
          queryParams: {
            sessionFiled: true
          }
        });
      }
      return throwError(error);
    }));
  }

  addToken(request: HttpRequest<any>, token: string) {
    return request.clone({setHeaders: {Authorization: token}});
  }


  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.data.accessToken);
          return next.handle(this.addToken(request, token.data.accessToken));
        }));

    }
    return this.refreshTokenSubject.pipe(
      filter(token => token != null),
      take(1),
      switchMap(jwt => {
        return next.handle(this.addToken(request, jwt));
      }));
  }
}
