import {Component, OnInit} from '@angular/core';
import {AdminModuleService} from '../../services';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material';
import {IModule} from '../../interfaces';
import {EditModuleComponent} from '../edit-module/edit-module.component';

@Component({
  selector: 'app-single-module',
  templateUrl: './single-module.component.html',
  styleUrls: ['./single-module.component.scss']
})
export class SingleModuleComponent implements OnInit {
  module: any;

  constructor(private moduleService: AdminModuleService,
              private route: ActivatedRoute,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.data
      .subscribe(
        res => (this.module = res.singleModuleResolverService.data));
  }

  deleteModule(id: string) {
    this.moduleService.delete(id);
  }

  editModule() {
    this.dialog.open(EditModuleComponent, {
      width: '95%',
      data: this.module,
      disableClose: true
    }).afterClosed().subscribe((moduleInfo: IModule) => {
      if (moduleInfo) {
        this.moduleService.editModule(moduleInfo).subscribe( updatedModule => {
          this.module = updatedModule;
        });
      }
    });
  }
}
