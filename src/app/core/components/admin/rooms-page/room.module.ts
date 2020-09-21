import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule, NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';

import {RoomRoutingModule} from './room-routing.module';
import {CreateSettingsRoomComponent} from './create-settings-room/create-settings-room.component';
import {RoomsPageComponent} from './rooms-page/rooms-page.component';
import {AdminModule} from '../admin.module';



@NgModule({
  entryComponents: [CreateSettingsRoomComponent],
  declarations: [CreateSettingsRoomComponent, RoomsPageComponent],
  imports: [
    CommonModule,
    RoomRoutingModule,

    AdminModule,
    NgbModule,
    NgbTimepickerModule
  ]
})
export class RoomModule {
}
