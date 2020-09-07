import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UserCabinetComponent} from './user-cabinet/user-cabinet.component';
import {EditUserComponent} from './edit-user/edit-user.component';
import {ConfirmMailComponent} from './confirm-mail/confirm-mail.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';

const routes: Routes = [
  {path: ':id', component: UserCabinetComponent},
  {path: ':id/edit', component: EditUserComponent},
  {path: 'confirm/:token', component: ConfirmMailComponent},
  {path: 'reset/:token', component: ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule {
}
