import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RegistrationComponent} from './registration/registration.component';
import {AuthUserComponent} from './auth-user/auth-user.component';
import {UserCabinetComponent} from './user-cabinet/user-cabinet.component';
import {EditUserComponent} from './edit-user/edit-user.component';

const routes: Routes = [
  {path: 'registration', component: RegistrationComponent},
  {path: 'auth', component: AuthUserComponent},
  // {path: 'user/:id', component: UserCabinetComponent},
  // {path: 'user/:id/edit', component: EditUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule {
}
