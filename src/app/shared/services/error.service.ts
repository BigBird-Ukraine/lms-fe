import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

import {CustomSnackbarService} from './custom-snackbar.service';
import {AuthService} from '../../core/services/auth';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor(private customSnackbarService: CustomSnackbarService,
              private authService: AuthService) {
  }

  public handleError(error: HttpErrorResponse) {
    if (error && error.error) {

      if (error.status === 401) {
        return this.authService.refreshTokens();
      }

      this.customSnackbarService.open(error.error.error.message, 'error');
      return throwError(error);
    }
  }
}


