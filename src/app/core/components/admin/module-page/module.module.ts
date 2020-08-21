import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ModuleRoutingModule} from './module-routing.module';
import {ModulePageComponent} from './module-page/module-page.component';
import {AllModulesComponent} from './all-modules/all-modules.component';
import {SingleModuleComponent} from './single-module/single-module.component';
import {EditModuleComponent} from './edit-module/edit-module.component';
import {AdminModule} from '../admin.module';
import {ModuleLayoutComponent} from '../../../../shared/components/templates';
import {AddLessonComponent} from './add-lesson/add-lesson.component';



@NgModule({
  entryComponents: [
    EditModuleComponent,
    ModuleLayoutComponent,
    AddLessonComponent
  ],
  declarations: [
    ModulePageComponent,
    AllModulesComponent,
    SingleModuleComponent,
    EditModuleComponent,
    ModuleLayoutComponent,
    AddLessonComponent
  ],
  imports: [
    CommonModule,
    ModuleRoutingModule,

    AdminModule
  ]
})
export class ModuleModule { }
