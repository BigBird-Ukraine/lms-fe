import {Component, OnInit} from '@angular/core';
import {AdminModuleService} from '../../services';

@Component({
  selector: 'app-all-modules',
  templateUrl: './all-modules.component.html',
  styleUrls: ['./all-modules.component.scss']
})
export class AllModulesComponent implements OnInit {

  constructor(public moduleService: AdminModuleService) {
  }

  ngOnInit() {
    this.moduleService.getAllCropped().subscribe(res => this.moduleService.modules = res.data);
  }

}
