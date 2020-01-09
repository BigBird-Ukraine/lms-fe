import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {CreateGroupComponent} from '../../../../shared/components/templates';


@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss']
})
export class GroupsPageComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  create() {
    this.dialog.open(CreateGroupComponent);
  }
}
