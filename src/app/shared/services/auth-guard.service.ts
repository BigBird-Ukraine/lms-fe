import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';

import {AuthService} from '../../core/services/auth';
import {CustomSnackbarService} from './custom-snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router,
              private snackbar: CustomSnackbarService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    if (this.authService.isAuthenticated()) {
      return of(true);
    } else {
      this.router.navigate(['/'], {
        queryParams: {
          accessDenied: true
        }
      });
      this.snackbar.open('Спершу увійдіть в систему або зареєстуйтесь');
    }
  }
}

