import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RegistrationComponent} from './registration/registration.component';
import {AuthUserComponent} from './auth-user/auth-user.component';

const routes: Routes = [
  {path: 'registration', component: RegistrationComponent},
  {path: 'auth', component: AuthUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule {
}
