import {Component, OnInit} from '@angular/core';
import {IGroupStatistics} from '../../interfaces';
import {AdminGroupsService, AdminStatisticsService} from '../../services';
import {MatDialog} from '@angular/material';
import {GroupComponent} from '../group/group.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  groupsStatistic: IGroupStatistics[];

  constructor(private groupsService: AdminGroupsService,
              private statisticService: AdminStatisticsService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.groupsService.getGroupsStatics().subscribe(groupsStatistic => {
      this.groupsStatistic = groupsStatistic;
      this.statisticService.setDisplayPage();
    });
  }

  openForm(id: string, count: number) {
    if (count > 0) {
      this.dialog.open(GroupComponent, {
        width: '90%',
        data: {
          id
        }
      });
    }
  }
}
