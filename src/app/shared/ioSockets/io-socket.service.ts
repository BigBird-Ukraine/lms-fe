import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {IError} from 'protractor/built/exitCodes';
import {Router} from '@angular/router';

import {AuthService} from '../../core/services/auth';
import {CustomSnackbarService} from '../services';
import {Observable} from 'rxjs';
import {IBookTableData, ICancelBookData} from '../models/interfaces/socketsData';

@Injectable({
  providedIn: 'root'
})
export class IoSocketService {
  private socket = io('ws://localhost:3000', {query: `Authorization=${this.authService.getAccessToken()}`});
  public spinnerStatus;

  constructor(private authService: AuthService,
              private router: Router,
              private customSnackbarService: CustomSnackbarService) {
    this.errorCheck();
  }

  joinToTable(event: any) {
    this.socket.emit('table.join', event);
  }

  bookTable(data: IBookTableData) {
    this.setSpinnerStatus(true);
    return new Observable((subscriber) => {
      this.socket.emit('book_table', data);
      subscriber.next();
    });
  }

  addBookedUser(addBU: any) {
    this.socket.on('book_table', addBU);
  }

  cancelBook(data: ICancelBookData) {
    this.setSpinnerStatus(true);
    return new Observable((subscriber) => {
      this.socket.emit('cancel_book', data);
      subscriber.next();
    });
  }

  removeUserOfTable(remove: any) {
    this.socket.on('cancel_book', remove);
  }

  errorCheck() {
    this.socket.on('error type', (res) => {
      const error: IError = JSON.parse(res);
      switch (error.code) {
        case 204 || 4041:
          this.router.navigateByUrl('/');
          this.authService.deleteTokens();
          this.customSnackbarService.open(error.message, 'error');
          this.setSpinnerStatus(false);
          window.location.reload();
          break;
        default:
          this.setSpinnerStatus(false);
          this.customSnackbarService.open(error.message, 'error');
      }
    });
  }

  setSpinnerStatus(value) {
    this.spinnerStatus = value;
  }
}
