import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {AdminRoomService} from '../services';
import {IRoom} from '../interfaces';



@Injectable()
export class SingleRoomAdminResolverService implements Resolve<IRoom> {

  constructor(private roomsService: AdminRoomService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRoom> | Promise<IRoom> | IRoom {
    const id: string = route.paramMap.get('id');

    return this.roomsService.getSingleRoom(id);
  }
}
