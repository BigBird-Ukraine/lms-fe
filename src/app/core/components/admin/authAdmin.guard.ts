import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {AuthAdminService} from '../../services/auth/auth-admin.service';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthAdminGuard implements CanActivate, CanActivateChild {
  constructor(private auth: AuthAdminService,
              private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.auth.isAuthenticated()) {
      return of(true);
    } else {
      this.router.navigate(['/admin/login'], {
        queryParams: {
          accessDenied: true
        }
      });
      return of(false);
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }
}
