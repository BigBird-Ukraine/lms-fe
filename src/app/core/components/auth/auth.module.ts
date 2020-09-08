import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {RegistrationComponent} from './registration/registration.component';
import {AuthUserComponent} from './auth-user/auth-user.component';
import {MaterialModule, SharedModule} from '../../../shared/modules';
import { FormEmailComponent } from './form-email/form-email.component';

@NgModule({
  entryComponents: [FormEmailComponent],
  declarations: [RegistrationComponent, AuthUserComponent, FormEmailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ],
  exports: [RegistrationComponent, AuthUserComponent]
})
export class AuthModule { }
