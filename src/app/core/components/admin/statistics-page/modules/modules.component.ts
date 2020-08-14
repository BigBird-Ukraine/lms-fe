import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { IModuleStatistics} from '../../interfaces';
import {AdminModuleService, AdminStatisticsService} from '../../services';
import {ModuleComponent} from '../module/module.component';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {
  modulesStatistic: IModuleStatistics[];

  constructor(private moduleService: AdminModuleService,
              private statisticService: AdminStatisticsService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.moduleService.getModulesStatics().subscribe(modulesStatistic => {
      this.modulesStatistic = modulesStatistic;
      this.statisticService.setDisplayPage();
    });
  }

  openForm(id: string, count: number) {
    if (count > 0) {
      this.dialog.open(ModuleComponent, {
        width: '90%',
        data: {
          id
        }
      });
    }
  }
}
