import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule, NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';

import {RoomRoutingModule} from './room-routing.module';
import {CreateSettingsRoomComponent} from './create-settings-room/create-settings-room.component';
import {RoomsPageComponent} from './rooms-page/rooms-page.component';
import {AdminModule} from '../admin.module';
import {CreateRoomComponent} from './create-room/create-room.component';
import {SharedModule} from '../../../../shared/modules';
import {EditRoomComponent} from './edit-room/edit-room.component';
import {RoomComponent} from './room/room.component';
import {SingleRoomAdminResolverService} from '../resolvers';
import {TableComponent} from './table/table.component';


@NgModule({
  entryComponents: [CreateSettingsRoomComponent, CreateRoomComponent, EditRoomComponent, TableComponent],
  declarations: [CreateSettingsRoomComponent, RoomsPageComponent, CreateRoomComponent, EditRoomComponent, RoomComponent, TableComponent],
  imports: [
    CommonModule,
    RoomRoutingModule,

    AdminModule,
    NgbModule,
    NgbTimepickerModule,
    SharedModule
  ],
  providers: [SingleRoomAdminResolverService]
})
export class RoomModule {
}
