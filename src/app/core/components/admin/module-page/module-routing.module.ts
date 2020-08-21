import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ModulePageComponent} from './module-page/module-page.component';
import {AllModulesComponent} from './all-modules/all-modules.component';
import {SingleModuleResolverService} from '../resolvers/single-module.resolver.service';
import {SingleModuleComponent} from './single-module/single-module.component';

const routes: Routes = [
  {
    path: '', component: ModulePageComponent, children: [
      {path: '', component: AllModulesComponent}
    ]
  },
  {path: 'single/:id', resolve: {singleModuleResolverService: SingleModuleResolverService}, component: SingleModuleComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleRoutingModule { }
