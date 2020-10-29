import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RoomsComponent} from './rooms/rooms.component';
import {AllRoomsResolverService, SingleRoomResolverService} from '../../resolvers';
import {RoomComponent} from './room/room.component';
import {BookedUserStatusGuardService} from '../../guards';

const routes: Routes = [
  {
    path: '',
    canActivate: [BookedUserStatusGuardService],
    resolve: {allRoomsResolverService: AllRoomsResolverService},
    component: RoomsComponent
  },
  {
    path: ':id',
    canActivate: [BookedUserStatusGuardService],
    resolve: {singleRoomResolverService: SingleRoomResolverService},
    component: RoomComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule {
}
