import {Component, Inject, OnInit} from '@angular/core';
import {AdminModuleService} from '../../services';
import {MAT_DIALOG_DATA} from '@angular/material';
import {IModule} from '../../interfaces';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit {
  modules: Partial<IModule[]>;

  constructor(private moduleService: AdminModuleService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.moduleService.getModulesByCourse(this.data.id).subscribe(modules => {
      this.modules = modules;
    });
  }

}
