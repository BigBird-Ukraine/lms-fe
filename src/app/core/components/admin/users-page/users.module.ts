import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {UsersPageComponent} from './user-page/users-page.component';
import {UserOutComponent} from './user-out/user-out.component';
import {AdminModule} from '../admin.module';
import {CreateUserComponent} from './create-user/create-user.component';
import {MainModule} from '../main-admin/main.module';
import {ChangeRoleUserComponent} from './change-role-user/change-role-user.component';
import {AdminMyPassedTestComponent} from '../passed-tests/admin-my-passed-test/admin-my-passed-test.component';
import {AdminPassedQuestionComponent} from '../passed-tests/admin-passed-question/admin-passed-question.component';



@NgModule({
  entryComponents: [
    CreateUserComponent,
    ChangeRoleUserComponent,
    AdminMyPassedTestComponent,
  ],
  declarations: [
    UsersPageComponent,
    UserOutComponent,
    CreateUserComponent,
    ChangeRoleUserComponent,
    AdminMyPassedTestComponent,
    AdminPassedQuestionComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,

    AdminModule,
    MainModule
  ]
})
export class UsersModule { }
