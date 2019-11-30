import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegistrationComponent} from './registration/registration.component';
import {UserRoutingModule} from './user-routing.module';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import { AuthUserComponent } from './auth-user/auth-user.component';



@NgModule({
  declarations: [
    RegistrationComponent,
    AuthUserComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  exports: [
    UserRoutingModule,
    MatDialogModule,
  ]
})
export class UserModule { }
