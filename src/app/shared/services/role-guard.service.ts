import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {UserService} from '../../core/services/user';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private userService: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const {role_id} = this.userService.userInfo.value;

    return !(role_id !== 1 && role_id !== 2);
  }
}

