import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AdminLayoutComponent} from '../../../shared/components/admin-layout/admin-layout.component';
import {AuthAdminComponent} from './auth-admin/auth-admin.component';


const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent, children: [
      {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
      {path: 'login', component: AuthAdminComponent},
    ]
  },
  {
    path: 'adminPanel',
    loadChildren: () => import('src/app/core/components/admin/main-admin/main.module').then(m => m.MainModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
