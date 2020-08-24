import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UserCabinetComponent} from './user-cabinet/user-cabinet.component';
import {EditUserComponent} from './edit-user/edit-user.component';

const routes: Routes = [
  {path: ':id', component: UserCabinetComponent},
  {path: ':id/edit', component: EditUserComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule {
}
