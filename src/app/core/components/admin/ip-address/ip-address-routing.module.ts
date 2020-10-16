import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {IpComponent} from './ips/ip.component';


const routes: Routes = [
  {path: '', component: IpComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IpAddressRoutingModule { }
