import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';

import {ModuleLayoutComponent} from '../../../../../shared/components/templates';


@Component({
  selector: 'app-module-page',
  templateUrl: './module-page.component.html',
  styleUrls: ['./module-page.component.scss']
})
export class ModulePageComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openForm() {
    this.dialog.open(ModuleLayoutComponent);
  }
}
