import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {RoomsService} from '../../services';
import {IRoom} from '../../interface';

@Injectable()
export class SingleRoomResolverService implements Resolve<IRoom> {

  constructor(private roomsService: RoomsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRoom> | Promise<IRoom> | IRoom {
    const id: string = route.paramMap.get('id');

    return this.roomsService.getSingleRoom(id);
  }
}
