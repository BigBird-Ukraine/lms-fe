import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule, NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';

import {RoomRoutingModule} from './room-routing.module';
import {CreateSettingsRoomComponent} from './create-settings-room/create-settings-room.component';
import {RoomsPageComponent} from './rooms-page/rooms-page.component';
import {AdminModule} from '../admin.module';
import { CreateRoomComponent } from './create-room/create-room.component';
import {AppModule} from '../../../../app.module';
import {SharedModule} from '../../../../shared/modules';



@NgModule({
  entryComponents: [CreateSettingsRoomComponent, CreateRoomComponent],
  declarations: [CreateSettingsRoomComponent, RoomsPageComponent, CreateRoomComponent],
  imports: [
    CommonModule,
    RoomRoutingModule,

    AdminModule,
    NgbModule,
    NgbTimepickerModule,
    SharedModule
  ]
})
export class RoomModule {
}
