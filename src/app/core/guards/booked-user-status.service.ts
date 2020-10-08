import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../services/user';
import {statusesEnum} from '../constans';
import {CustomSnackbarService} from '../../shared/services';
import {DatePipe} from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class BookedUserStatusGuardService implements CanActivate {

  constructor(private userService: UserService,
              private snackbarService: CustomSnackbarService,
              private datePipe: DatePipe) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userService.userInfo.value.booking_ban_status && this.userService.userInfo.value.booking_ban_status.status === statusesEnum.booking_ban_status) {
      const date = new Date(this.userService.userInfo.value.booking_ban_status.date);
      this.snackbarService.open(
        `Дата закінчення блокування: ${this.datePipe.transform(date, 'yyyy-MM-dd')}
        За недотримання правил, Ви отримали блокування на забронювання місця. `, 'Error');
      return false;
    }
    return true;
  }
}
