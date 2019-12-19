import {NgModule} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {
  MatButtonToggleModule,
  MatCardModule,
  MatDialogModule,
  MatExpansionModule,
  MatIconModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatToolbarModule
} from '@angular/material';

const Materials = [
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule,
  MatRadioModule,
  MatDialogModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatExpansionModule,
  MatCardModule,
  MatSlideToggleModule,
  MatButtonToggleModule,
];

@NgModule({
  imports: [
    Materials
  ],
  exports: [
    Materials
  ]
})

export class MaterialModule {
}
