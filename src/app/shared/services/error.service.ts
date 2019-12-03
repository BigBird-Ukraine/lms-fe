import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

import {CustomSnackbarService} from './custom-snackbar.service';
import {Subject, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private customSnackbarService: CustomSnackbarService) { }

  public handleError(error: HttpErrorResponse | any) {
    this.customSnackbarService.open(error, 'error');
    return throwError(error);
  }
}
