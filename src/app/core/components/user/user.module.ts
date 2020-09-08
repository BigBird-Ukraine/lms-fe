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

import {UserCabinetComponent} from './user-cabinet/user-cabinet.component';
import {EditUserComponent} from './edit-user/edit-user.component';
import {UserRoutingModule} from './user-routing.module';
import {SharedModule} from '../../../shared/modules';
import { ConfirmMailComponent } from './confirm-mail/confirm-mail.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  declarations: [
    UserCabinetComponent,
    EditUserComponent,
    ConfirmMailComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    SharedModule,

    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  exports: [
    MatDialogModule
  ]
})
export class UserModule {
}
