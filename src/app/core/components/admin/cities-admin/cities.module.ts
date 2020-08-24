import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CitiesRoutingModule} from './cities-routing.module';
import {CitiesAdminComponent} from './cities-admin/cities-admin.component';
import {AddCityAdminComponent} from './add-city-admin/add-city-admin.component';
import {AdminModule} from '../admin.module';


@NgModule({
  entryComponents: [
    AddCityAdminComponent
  ],
  declarations: [
    CitiesAdminComponent,
    AddCityAdminComponent,
  ],
  imports: [
    CommonModule,
    CitiesRoutingModule,

    AdminModule
  ]
})
export class CitiesModule {
}
