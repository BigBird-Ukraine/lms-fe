import {NgModule} from '@angular/core';
import {MainLoaderComponent} from '../components/main-loader/main-loader.component';
import {MatProgressSpinnerModule} from '@angular/material';

@NgModule({
  declarations: [MainLoaderComponent],
  imports: [MatProgressSpinnerModule],
  exports: [MainLoaderComponent, MatProgressSpinnerModule],
})

export class SharedModule {
}
