import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {CreateGroupComponent} from './create-group/create-group.component';
import {AdminGroupsService} from "../services";
import {IGroupData} from "../interfaces";


@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss']
})
export class GroupsPageComponent implements OnInit {
  getGroups: IGroupData;
  length: number;
  pageSize: number = 50;
  pageIndex: number = 0;

  constructor(private dialog: MatDialog,
              private adminGroupsService: AdminGroupsService) {
  }

  ngOnInit() {
    this.adminGroupsService.getAll().subscribe(value => {
      this.getGroups = value.data
    });
  }

  create() {
    this.dialog.open(CreateGroupComponent);
  }
}
