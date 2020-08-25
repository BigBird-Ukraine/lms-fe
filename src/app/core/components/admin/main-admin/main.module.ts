import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule, MatToolbarModule} from '@angular/material';

import {MainRoutingModule} from './main-routing.module';
import {MainAdminComponent} from './main-admin/main-admin.component';
import {AdminModule} from '../admin.module';
import {UpdateProfileComponent} from '../users-page/update-profile/update-profile.component';

@NgModule({
  entryComponents: [UpdateProfileComponent],
  declarations: [MainAdminComponent, UpdateProfileComponent],
  imports: [
    CommonModule,
    MainRoutingModule,

    AdminModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  exports: [UpdateProfileComponent]
})
export class MainModule { }
