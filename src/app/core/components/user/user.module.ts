import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule, MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule
} from '@angular/material';

import {RegistrationComponent} from './registration/registration.component';
import {UserRoutingModule} from './user-routing.module';
import {AuthUserComponent} from './auth-user/auth-user.component';
import {UserCabinetComponent} from './user-cabinet/user-cabinet.component';
import { EditUserComponent } from './edit-user/edit-user.component';


@NgModule({
  declarations: [
    RegistrationComponent,
    AuthUserComponent,
    UserCabinetComponent,
    EditUserComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
  ],
  exports: [
    UserRoutingModule,
    MatDialogModule,
    RegistrationComponent,
  ]
})
export class UserModule {
}
