import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {RoomsService} from '../../services';
import {ICutRoom} from '../../interface';

@Injectable()
export class SingleRoomResolverService implements Resolve<ICutRoom> {

  constructor(private roomsService: RoomsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICutRoom> | Promise<ICutRoom> | ICutRoom {
    const id: string = route.paramMap.get('id');

    return this.roomsService.getSingleRoom(id);
  }
}
