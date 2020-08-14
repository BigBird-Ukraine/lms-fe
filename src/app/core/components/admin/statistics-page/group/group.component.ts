import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

import {IGroup} from '../../../../interface';
import {AdminGroupsService} from '../../services';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  groups: Partial<IGroup[]>;

  constructor(private groupsService: AdminGroupsService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.groupsService.getGroupsByCourse(this.data.id).subscribe(groups => {
      this.groups = groups;
    });
  }

}
