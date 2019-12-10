import {HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import * as jwt_decode from 'jwt-decode';

import {AdminAuthService} from './services/admin-auth.service';
import {Injectable} from '@angular/core';
import {catchError, switchMap} from 'rxjs/operators';
import {config} from '../../../shared/config';
import {ISuccessHttpResponse} from '../../../shared/models/interfaces';
import {ITokensModel} from '../../interface';
import {Router} from '@angular/router';

@Injectable()
export class AdminInterceptor implements HttpInterceptor {
  constructor(private authService: AdminAuthService, private httpClient: HttpClient, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isAuthenticated()) {
      const {exp} = jwt_decode(this.authService.getAccessToken());
      const currentTime = Math.floor(new Date().valueOf() / 1000);
      if (exp < currentTime) {
        req = req.clone({
          setHeaders: {
            Authorization: this.authService.getRefreshToken()
          }
        });
        return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {

            this.httpClient.post(`${config.adminUrl}/api/auth/refresh`, null).subscribe((response: ISuccessHttpResponse) => {
              const {accessToken, refreshToken} = response.data as ITokensModel;

              this.authService.setTokens(accessToken, refreshToken);
            });
            return next.handle(req);
          }
        }));
      }
      req = req.clone({
        setHeaders: {
          Authorization: this.authService.getAccessToken()
        }
      });
    }
    return next.handle(req);

  }
}
