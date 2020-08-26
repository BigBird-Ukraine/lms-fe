import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {UsersPageComponent} from './user-page/users-page.component';
import {UserOutComponent} from './user-out/user-out.component';
import {AdminModule} from '../admin.module';
import {CreateUserComponent} from './create-user/create-user.component';
import {MainModule} from '../main-admin/main.module';
import {ChangeRoleUserComponent} from './change-role-user/change-role-user.component';



@NgModule({
  entryComponents: [
    CreateUserComponent,
    ChangeRoleUserComponent
  ],
  declarations: [
    UsersPageComponent,
    UserOutComponent,
    CreateUserComponent,
    ChangeRoleUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,

    AdminModule,
    MainModule
  ]
})
export class UsersModule { }
