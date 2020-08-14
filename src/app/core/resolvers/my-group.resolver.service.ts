import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {GroupsService} from '../services/groups';
import {ISingleGroup} from '../interface';

@Injectable()
export class MyGroupResolverService implements Resolve<ISingleGroup> {

  constructor(private groupsService: GroupsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISingleGroup> | Promise<ISingleGroup> | ISingleGroup {
    return this.groupsService.getOneGroup(route.params.id);
  }
}
