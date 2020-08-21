import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {RegistrationComponent} from './registration/registration.component';
import {AuthUserComponent} from './auth-user/auth-user.component';
import {MaterialModule} from '../../../shared/modules';

@NgModule({
  declarations: [RegistrationComponent, AuthUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [RegistrationComponent, AuthUserComponent]
})
export class AuthModule { }
