import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegistrationComponent} from './registration/registration.component';
import {UserRoutingModule} from './user-routing.module';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    RegistrationComponent,
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
