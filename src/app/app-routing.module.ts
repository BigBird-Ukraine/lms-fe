import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {HomePageComponent} from './core/components/home-page/home-page.component';
import {AdminLayoutComponent} from './shared/components/admin-layout/admin-layout.component';
import {AuthAdminComponent} from './core/components/admin/auth-admin/auth-admin.component';
import {UserCabinetComponent} from './core/components/user/user-cabinet/user-cabinet.component';
import {EditUserComponent} from './core/components/user/edit-user/edit-user.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: HomePageComponent},
    ]
  },
  {
    path: 'admin', component: AdminLayoutComponent, children: [
      {path: '', redirectTo: '/admin/login',  pathMatch: 'full'},
      {path: 'login' , component: AuthAdminComponent}
    ]
  },
  {path: 'user/:id', component: UserCabinetComponent},
  {path: 'user/:id/edit', component: EditUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
