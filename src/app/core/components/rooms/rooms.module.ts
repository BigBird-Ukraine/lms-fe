import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatDialogModule, MatExpansionModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatPaginatorModule, MatSidenavModule,
} from '@angular/material';
import {DayPilotModule} from 'daypilot-pro-angular';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';

import {RoomsComponent} from './rooms/rooms.component';
import {RoomsRoutingModule} from './rooms-routing.module';
import {AllRoomsResolverService, SingleRoomResolverService} from '../../resolvers';
import {RoomComponent} from './room/room.component';
import {MaterialModule, SharedModule} from '../../../shared/modules';
import {CreateRoomComponent} from './create-room/create-room.component';
import {EditRoomComponent} from './edit-room/edit-room.component';
import {CalendarComponent} from './calendar/calendar.component';
import { MyBookingComponent } from './my-booking/my-booking.component';
import {GoogleMapComponent} from '../../../shared/components/google-map/google-map.component';
import {GoogleMapModule} from '../../../shared/modules/google-map.module';

@NgModule({
  entryComponents: [CreateRoomComponent, EditRoomComponent, CalendarComponent, MyBookingComponent],
  declarations: [RoomsComponent, RoomComponent, CreateRoomComponent,
    EditRoomComponent, CalendarComponent, MyBookingComponent],
  imports: [
    RoomsRoutingModule,
    CommonModule,
    SharedModule,
    ScrollingModule,
    DragDropModule,
    ReactiveFormsModule,
    FormsModule,
    DayPilotModule,
    GoogleMapModule,


    MatFormFieldModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatInputModule,
    MatExpansionModule,
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MaterialModule,
    NgbTimepickerModule
  ],
  providers: [AllRoomsResolverService, SingleRoomResolverService, DatePipe]
})
export class RoomsModule {
}
