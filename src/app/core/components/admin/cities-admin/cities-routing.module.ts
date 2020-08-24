import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CitiesAdminComponent} from './cities-admin/cities-admin.component';

const routes: Routes = [
  {path: '', component: CitiesAdminComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitiesRoutingModule { }
