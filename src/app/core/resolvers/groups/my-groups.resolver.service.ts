import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {GroupsService} from '../../services/groups';
import {IGroup} from '../../interface';

@Injectable()
export class MyGroupsResolverService implements Resolve<Partial<IGroup>[]> {

  constructor(private groupsService: GroupsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Partial<IGroup>[]> | Promise<Partial<IGroup>[]> | Partial<IGroup>[] {
    return this.groupsService.getMyGroups();
  }
}
