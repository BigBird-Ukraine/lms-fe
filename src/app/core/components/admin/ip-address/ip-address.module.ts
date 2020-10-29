import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IpAddressRoutingModule } from './ip-address-routing.module';
import { CreateIpComponent } from './create-ip/create-ip.component';
import { IpComponent } from './ips/ip.component';
import {AdminModule} from '../admin.module';
import {GoogleMapModule} from '../../../../shared/modules/google-map.module';


@NgModule({
  entryComponents: [CreateIpComponent],
  declarations: [CreateIpComponent, IpComponent],
  imports: [
    CommonModule,
    IpAddressRoutingModule,

    AdminModule,
    GoogleMapModule
  ]
})
export class IpAddressModule { }
