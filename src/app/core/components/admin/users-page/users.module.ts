import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {UsersPageComponent} from './user-page/users-page.component';
import {UserOutComponent} from './user-out/user-out.component';
import {AdminModule} from '../admin.module';
import {UpdateProfileComponent} from './update-profile/update-profile.component';
import {CreateUserComponent} from './create-user/create-user.component';



@NgModule({
  entryComponents: [
    UpdateProfileComponent,
    CreateUserComponent
  ],
  declarations: [
    UsersPageComponent,
    UpdateProfileComponent,
    UserOutComponent,
    CreateUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,

    AdminModule
  ]
})
export class UsersModule { }
