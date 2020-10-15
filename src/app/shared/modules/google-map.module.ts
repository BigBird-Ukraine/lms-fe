import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AgmCoreModule} from '@agm/core';

import {GoogleMapComponent} from '../components/google-map/google-map.component';

@NgModule({
  declarations: [GoogleMapComponent],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBrvdAhX4QuxguG8164aC3VOyxwI89GzPA',
      libraries: ['places']
    }),
  ],
  exports: [GoogleMapComponent]
})
export class GoogleMapModule { }
