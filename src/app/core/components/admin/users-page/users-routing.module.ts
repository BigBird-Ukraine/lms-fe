import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UsersPageComponent} from './user-page/users-page.component';
import {UserOutComponent} from './user-out/user-out.component';

const routes: Routes = [
  {
    path: '', component: UsersPageComponent, children: [
      {path: '', component: UserOutComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
