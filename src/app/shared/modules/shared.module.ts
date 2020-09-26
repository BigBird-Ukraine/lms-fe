import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material';
import {NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';

import {MainLoaderComponent} from '../components/main-loader/main-loader.component';
import {DatePickerComponent} from '../components/date-picker/date-picker.component';

@NgModule({
  declarations: [MainLoaderComponent, DatePickerComponent],
  imports: [
    MatProgressSpinnerModule,
    NgbTimepickerModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [MainLoaderComponent, MatProgressSpinnerModule, DatePickerComponent],
})

export class SharedModule {
}
