import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import {RoomsComponent} from './rooms/rooms.component';
import {AllRoomsResolverService, SingleRoomResolverService} from '../../resolvers';
import {RoomComponent} from './room/room.component';

const routes: Routes = [
  {path: '', resolve: {allRoomsResolverService: AllRoomsResolverService}, component: RoomsComponent},
  {path: ':id', resolve: {singleRoomResolverService: SingleRoomResolverService}, component: RoomComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
