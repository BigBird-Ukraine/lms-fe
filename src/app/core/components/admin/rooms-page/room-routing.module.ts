import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {RoomsPageComponent} from './rooms-page/rooms-page.component';
import {SingleRoomAdminResolverService} from '../resolvers';
import {RoomComponent} from './room/room.component';


const routes: Routes = [
  {path: '', component: RoomsPageComponent},
  {
    path: ':id',
    resolve: {singleRoomAdminResolverService: SingleRoomAdminResolverService},
    component: RoomComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule { }
