import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatDialogModule, MatExpansionModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatNativeDateModule, MatPaginatorModule, MatSidenavModule,

} from '@angular/material';

import {RoomsComponent} from './rooms/rooms.component';
import {RoomsRoutingModule} from './rooms-routing.module';
import {AllRoomsResolverService, SingleRoomResolverService} from '../../resolvers';
import {RoomComponent} from './room/room.component';
import {MaterialModule, SharedModule} from '../../../shared/modules';
import {CreateRoomComponent} from './create-room/create-room.component';
import {EditRoomComponent} from './edit-room/edit-room.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularDateTimePickerModule} from 'angular2-datetimepicker';

@NgModule({
  entryComponents: [CreateRoomComponent, EditRoomComponent],
  declarations: [RoomsComponent, RoomComponent, CreateRoomComponent, EditRoomComponent],
  imports: [
    RoomsRoutingModule,
    CommonModule,
    SharedModule,


    ScrollingModule,
    DragDropModule,
    ReactiveFormsModule,
    FormsModule,

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
    MaterialModule
  ],
  providers: [AllRoomsResolverService, SingleRoomResolverService]
})
export class RoomsModule {
}
