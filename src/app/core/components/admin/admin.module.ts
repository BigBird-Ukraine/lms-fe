import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatAutocompleteModule, MatListModule} from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import {FlexModule} from '@angular/flex-layout';
import {MatPaginatorModule} from '@angular/material/paginator';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {FilterPipe} from './filter.pipe';

import {AuthAdminComponent} from './auth-admin/auth-admin.component';
import {AdminRoutingModule} from './admin-routing.module';
import {FormModule, MaterialModule} from '../../../shared/modules';
import {LoaderComponent} from '../../../shared/components/loader/loader.component';
import {AdminLayoutComponent} from '../../../shared/components/admin-layout/admin-layout.component';
import {SingleModuleResolverService} from './resolvers';

const mat = [
  FlexModule,
  MatListModule,
  MatAutocompleteModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  DragDropModule,
  ScrollingModule,
  MaterialModule,

  FormModule,
  ReactiveFormsModule
];

@NgModule({
  declarations: [
    AuthAdminComponent,
    AdminLayoutComponent,

    FilterPipe,
    LoaderComponent
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    ...mat
  ],
  providers: [
    {provide: MatDialogRef, useValue: {}},
    {provide: MAT_DIALOG_DATA, useValue: []},
    SingleModuleResolverService
  ],
  exports: [...mat, LoaderComponent, FilterPipe]
})
export class AdminModule {
}
